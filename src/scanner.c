// #define DEBUG

#ifdef DEBUG
    #define debug(...) printf(__VA_ARGS__)
#else
    #define debug(...)
#endif
//------------------------------------------------------------------------------

#include <stdio.h>
#include "tree_sitter/parser.h"
//------------------------------------------------------------------------------

enum TokenType{
    KEYWORD,
    BUILTINFUNC,
    ERROR_SENTINEL
};
//------------------------------------------------------------------------------

void *tree_sitter_vhdl_external_scanner_create()
{
    return NULL;
}
//------------------------------------------------------------------------------

void tree_sitter_vhdl_external_scanner_destroy(void *payload)
{
    /* NOOP */
}
//------------------------------------------------------------------------------

unsigned tree_sitter_vhdl_external_scanner_serialize(void *payload, char *buffer)
{
    return 0;
}
//------------------------------------------------------------------------------

void tree_sitter_vhdl_external_scanner_deserialize(void *payload, const char *buffer, unsigned length)
{
    /* NOOP */
}
//------------------------------------------------------------------------------

// Ignores whitespace and returns the lower-case conversion
int32_t skipWhitespace(TSLexer *lexer)
{
    while(lexer->lookahead == ' '  ||
          lexer->lookahead == '\t' ||
          lexer->lookahead == '\n' ||
          lexer->lookahead == '\r' ){
        debug("Skipping whitespace\n");
        lexer->advance(lexer, true);
    }
    int32_t lookahead = lexer->lookahead;
    if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';
    debug("lookahead = %c(0x%x)\n", (char)lookahead, lookahead);
    return lookahead;
}
//------------------------------------------------------------------------------

// Performs an advance, but returns the lower-case conversion
int32_t advance(TSLexer *lexer)
{
    lexer->advance(lexer, false);
    int32_t lookahead = lexer->lookahead;
    if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';
    debug("lookahead = %c(0x%x)\n", (char)lookahead, lookahead);
    return lookahead;
}
//------------------------------------------------------------------------------

bool tree_sitter_vhdl_external_scanner_scan(void *payload, TSLexer *lexer, const bool *valid_symbols)
{
    int32_t lookahead = skipWhitespace(lexer);

    if(valid_symbols[ERROR_SENTINEL]){
        debug("Error correction mode\n");
        return false;
    }

    if(valid_symbols[KEYWORD] && lookahead == 'h'){
        if(lookahead == 'h') lookahead = advance(lexer);
        else                 return false;
        if(lookahead == 'e') lookahead = advance(lexer);
        else                 return false;
        if(lookahead == 'l') lookahead = advance(lexer);
        else                 return false;
        if(lookahead == 'l') lookahead = advance(lexer);
        else                 return false;
        if(lookahead == 'o') lookahead = advance(lexer);
        else                 return false;
        if(lookahead < 'a' || lookahead > 'z'){
            debug("Returning true (keyword)...\n");
            lexer->result_symbol = KEYWORD;
            return true;
        }

    }else if(valid_symbols[BUILTINFUNC] && lookahead == 'f'){
        if(lookahead == 'f') lookahead = advance(lexer);
        else                 return false;
        if(lookahead == 'u') lookahead = advance(lexer);
        else                 return false;
        if(lookahead == 'n') lookahead = advance(lexer);
        else                 return false;
        if(lookahead == 'c') lookahead = advance(lexer);
        else                 return false;
        if(lookahead < 'a' || lookahead > 'z'){
            lexer->result_symbol = BUILTINFUNC;
            debug("Returning true (built-in function)...\n");
            return true;
        }
    }

    debug("Returning false...\n");
    return false;
}
//------------------------------------------------------------------------------

