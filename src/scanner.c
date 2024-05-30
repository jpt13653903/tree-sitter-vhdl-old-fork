#include <stdio.h>
#include "tree_sitter/parser.h"
//------------------------------------------------------------------------------

enum TokenType {
    KEYWORD,
    BUILTINFUNC
};
//------------------------------------------------------------------------------

void *tree_sitter_vhdl_external_scanner_create() {
    return NULL;
}
//------------------------------------------------------------------------------

void tree_sitter_vhdl_external_scanner_destroy(void *payload) {
    /* NOOP */
}
//------------------------------------------------------------------------------

unsigned tree_sitter_vhdl_external_scanner_serialize(void *payload, char *buffer) {
    return 0;
}
//------------------------------------------------------------------------------

void tree_sitter_vhdl_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
    /* NOOP */
}
//------------------------------------------------------------------------------

/* https://tree-sitter.github.io/tree-sitter/creating-parsers#external-scanners

This function is responsible for recognizing external tokens. It should return
true if a token was recognized, and false otherwise. It is called with a
“lexer” struct with the following fields:

- int32_t lookahead - The current next character in the input stream,
  represented as a 32-bit unicode code point.

- TSSymbol result_symbol - The symbol that was recognized. Your scan function
  should assign to this field one of the values from the TokenType enum,
  described above.

- void (*advance)(TSLexer *, bool skip) - A function for advancing to the next
  character. If you pass true for the second argument, the current character
  will be treated as whitespace; whitespace won’t be included in the text
  range associated with tokens emitted by the external scanner.

- void (*mark_end)(TSLexer *) - A function for marking the end of the
  recognized token. This allows matching tokens that require multiple
  characters of lookahead. By default (if you don’t call mark_end), any
  character that you moved past using the advance function will be included in
  the size of the token. But once you call mark_end, then any later calls to
  advance will not increase the size of the returned token. You can call
  mark_end multiple times to increase the size of the token.

- uint32_t (*get_column)(TSLexer *) - A function for querying the current
  column position of the lexer. It returns the number of codepoints since the
  start of the current line. The codepoint position is recalculated on every
  call to this function by reading from the start of the line.

- bool (*is_at_included_range_start)(const TSLexer *) - A function for
  checking whether the parser has just skipped some characters in the
  document. When parsing an embedded document using the
  ts_parser_set_included_ranges function (described in the multi-language
  document section), the scanner may want to apply some special behavior when
  moving to a disjoint part of the document. For example, in EJS documents,
  the JavaScript parser uses this function to enable inserting automatic
  semicolon tokens in between the code directives, delimited by <% and %>.

- bool (*eof)(const TSLexer *) - A function for determining whether the lexer
  is at the end of the file. The value of lookahead will be 0 at the end of a
  file, but this function should be used instead of checking for that value
  because the 0 or “NUL” value is also a valid character that could be present
  in the file being parsed.                                                   */

bool tree_sitter_vhdl_external_scanner_scan(void *payload, TSLexer *lexer, const bool *valid_symbols) {
    printf("Skipping over whitespace...\n");
    while(lexer->lookahead == ' '  ||
          lexer->lookahead == '\t' ||
          lexer->lookahead == '\n' ||
          lexer->lookahead == '\r' ){
        lexer->advance(lexer, true);
    }

    printf("Converting to lower-case...\n");
    int32_t lookahead = lexer->lookahead;
    if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';

    printf("lookahead = %c\n", (char)lookahead);

    if(valid_symbols[KEYWORD] && lookahead == 'h'){
        printf("Checking for 'hello'...\n");
        if(lookahead == 'h') lexer->advance(lexer, false);
        else                 return false;
        lookahead = lexer->lookahead;
        if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';
        if(lookahead == 'e') lexer->advance(lexer, false);
        else                 return false;
        lookahead = lexer->lookahead;
        if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';
        if(lookahead == 'l') lexer->advance(lexer, false);
        else                 return false;
        lookahead = lexer->lookahead;
        if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';
        if(lookahead == 'l') lexer->advance(lexer, false);
        else                 return false;
        lookahead = lexer->lookahead;
        if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';
        if(lookahead == 'o') lexer->advance(lexer, false);
        else                 return false;
        lookahead = lexer->lookahead;
        if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';
        if(lookahead < 'a' || lookahead > 'z'){
            lexer->result_symbol = KEYWORD;
            return true;
        }
    }else if(valid_symbols[BUILTINFUNC] && lookahead == 'f'){
        printf("Checking for 'func'...\n");
        if(lookahead == 'f') lexer->advance(lexer, false);
        else                 return false;
        lookahead = lexer->lookahead;
        if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';
        if(lookahead == 'u') lexer->advance(lexer, false);
        else                 return false;
        lookahead = lexer->lookahead;
        if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';
        if(lookahead == 'n') lexer->advance(lexer, false);
        else                 return false;
        lookahead = lexer->lookahead;
        if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';
        if(lookahead == 'c') lexer->advance(lexer, false);
        else                 return false;
        lookahead = lexer->lookahead;
        if(lookahead >= 'A' && lookahead <= 'Z') lookahead += 'a' - 'A';
        if(lookahead < 'a' || lookahead > 'z'){
            lexer->result_symbol = BUILTINFUNC;
            return true;
        }
    }else{
        printf("Returning false 1...\n");
        return false;
    }

    printf("Returning false 2...\n");
    return false;
}
//------------------------------------------------------------------------------

