#define DEBUG
//------------------------------------------------------------------------------

#include <stdio.h>
#include "tree_sitter/parser.h"
#include "debug_macros.h"
#include "TokenType.h"
#include "TokenTree.h"
//------------------------------------------------------------------------------

// These headers contain the "register_*" functions
#include "core.h"

#include "libraries/std/env.h"
#include "libraries/std/standard.h"
#include "libraries/std/textio.h"

#include "libraries/ieee/std_logic_1164.h"
#include "libraries/ieee/numeric_std.h"
#include "libraries/ieee/fixed_pkg.h"
#include "libraries/ieee/float_pkg.h"
#include "libraries/ieee/math_real.h"
#include "libraries/ieee/math_complex.h"
//------------------------------------------------------------------------------

/* I cannot figure out how to get the tree-sitter compiler to include more
 * source files into the compile chain, so I'm including them here manually.
 *
 * I've started a discussion on the topic in:
 * https://github.com/tree-sitter/tree-sitter/discussions/3398
 */
#include "TokenType.c"
#include "TokenTree.c"
//------------------------------------------------------------------------------

void* tree_sitter_vhdl_external_scanner_create()
{
    TokenTree* token_tree = token_tree_new();
    if(!token_tree){
        error("Cannot allocate memory for the token tree");
        return 0;
    }

    debug("Building the token tree...");

    register_reserved                     (token_tree);
    register_delimiters                   (token_tree);
    register_attributes                   (token_tree);
    register_base_specifiers              (token_tree);

    register_std_env_functions            (token_tree);

    register_std_standard_types           (token_tree);
    register_std_standard_constants       (token_tree);
    register_std_standard_functions       (token_tree);

    register_std_textio_types             (token_tree);
    register_std_textio_constants         (token_tree);
    register_std_textio_functions         (token_tree);

    register_ieee_std_logic_1164_types    (token_tree);
    register_ieee_std_logic_1164_functions(token_tree);

    register_ieee_numeric_std_types       (token_tree);
    register_ieee_numeric_std_functions   (token_tree);

    register_ieee_fixed_pkg_types         (token_tree);
    register_ieee_fixed_pkg_constants     (token_tree);
    register_ieee_fixed_pkg_functions     (token_tree);

    register_ieee_float_pkg_types         (token_tree);
    register_ieee_float_pkg_constants     (token_tree);
    register_ieee_float_pkg_functions     (token_tree);

    register_ieee_math_real_constants     (token_tree);
    register_ieee_math_real_functions     (token_tree);

    register_ieee_math_complex_types      (token_tree);
    register_ieee_math_complex_constants  (token_tree);
    register_ieee_math_complex_functions  (token_tree);

    debug("Balancing the token tree");
    token_tree_balance(token_tree);

    return token_tree;
}
//------------------------------------------------------------------------------

void tree_sitter_vhdl_external_scanner_destroy(void* token_tree)
{
    if(token_tree) token_tree_free(token_tree);
}
//------------------------------------------------------------------------------

unsigned tree_sitter_vhdl_external_scanner_serialize(void* token_tree, char* buffer)
{
    return 0;
}
//------------------------------------------------------------------------------

void tree_sitter_vhdl_external_scanner_deserialize(void* token_tree, const char* buffer, unsigned length)
{
    /* NOOP */
}
//------------------------------------------------------------------------------

static void skipWhitespace(TSLexer* lexer)
{
    while(lexer->lookahead == ' '  ||
          lexer->lookahead == '\t' ||
          lexer->lookahead == '\n' ||
          lexer->lookahead == '\r' ){
        debug("Skipping whitespace");
        lexer->advance(lexer, true);
    }
}
//------------------------------------------------------------------------------

static bool extended_identifier(TSLexer* lexer)
{
    if(lexer->lookahead != '\\') return false;
    lexer->advance(lexer, false);

    while(!lexer->eof(lexer)){
        if(lexer->lookahead == '\\'){
            lexer->advance(lexer, false);
            lexer->mark_end(lexer);
            if(lexer->lookahead != '\\') return true;
        }
        lexer->advance(lexer, false);
    }
    return false;
}
//------------------------------------------------------------------------------

static bool is_letter_or_digit(int32_t lookahead)
{
    return (lookahead >= 'a' && lookahead <= 'z') ||
           (lookahead >= '0' && lookahead <= '9');
}
//------------------------------------------------------------------------------

static bool finish_identifier(TSLexer* lexer, bool expect_letter)
{
    int32_t lookahead = lowercase(lexer->lookahead);
    bool    result = false;

    if(expect_letter){
        if(!is_letter_or_digit(lookahead)) return false;
    }

    while(!lexer->eof(lexer)){
        lexer->mark_end(lexer);
        if(lookahead == '_') lookahead = advance(lexer);
        if(!is_letter_or_digit(lookahead)) return result;
        lookahead = advance(lexer);
        result = true;
    }
    return result;
}
//------------------------------------------------------------------------------

bool tree_sitter_vhdl_external_scanner_scan(void* token_tree, TSLexer* lexer, const bool* valid_symbols)
{
    skipWhitespace(lexer);

    if(valid_symbols[ERROR_SENTINEL]){
        debug("Error correction mode");
        return false;
    }

    if(valid_symbols[IDENTIFIER] && extended_identifier(lexer)){
        lexer->result_symbol = IDENTIFIER;
        debug("Returning type IDENTIFIER");
        return true;
    }

    bool first_char_is_letter = (lexer->lookahead >= 'a' && lexer->lookahead <= 'z') ||
                                (lexer->lookahead >= 'A' && lexer->lookahead <= 'Z');

    if(lexer->lookahead >= '0' && lexer->lookahead <= '9'){
        // TODO: Handle all things that start with numbers
    }

    TypeNode* type = token_tree_match(token_tree, lexer);

    if(!type && first_char_is_letter){
        /* This works because all registered tokens in the search tree that
         * start with a letter are also valid identifiers.  If the tree search
         * exits early, whatever came before is a valid identifier
         *
         * The underscore corner cases are handled by IDENTIFIER_EXPECTING_LETTER
         */
        finish_identifier(lexer, false);
        lexer->result_symbol = IDENTIFIER;
        debug("Returning type IDENTIFIER");
        return true;
    }

    while(type){
        if(can_start_identifier(type->type) &&
           finish_identifier(lexer, type->type == IDENTIFIER_EXPECTING_LETTER)){
            lexer->result_symbol = IDENTIFIER;
            debug("Returning type IDENTIFIER");
            return true;

        }else if(is_base_specifier(type->type)){
            // if(finish_string_literal(type->type)){
            //     lexer->result_symbol = STRING_LITERAL;
            //     return true;
            // }

        }else if(valid_symbols[type->type]){
            lexer->result_symbol = type->type;
            debug("Returning type %s", token_type_to_string(type->type));
            return true;

        }else if(can_be_identifier(type->type)){
            lexer->result_symbol = IDENTIFIER;
            debug("Returning type IDENTIFIER");
            return true;
        }
        type = type->next;
    }

    debug("Returning false...");
    return false;
}
//------------------------------------------------------------------------------

