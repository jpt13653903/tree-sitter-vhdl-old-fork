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
    register_directives                   (token_tree);

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

static bool bounded_token(TSLexer* lexer)
{
    int32_t bound = lexer->lookahead;
    lexer->advance(lexer, false);

    while(!lexer->eof(lexer)){
        if(lexer->lookahead == bound){
            lexer->advance(lexer, false);
            lexer->mark_end(lexer);
            if(lexer->lookahead != bound) return true;
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

static bool binary_string_literal(TSLexer* lexer)
{
    while(!lexer->eof(lexer)){
        if(lexer->lookahead == '_') lexer->advance(lexer, false);
        if(lexer->lookahead < '0' || lexer->lookahead > '1') break;
        lexer->advance(lexer, false);
    }
    if(lexer->lookahead != '"') return false;
    lexer->advance(lexer, false);
    lexer->mark_end(lexer);
    return true;
}
//------------------------------------------------------------------------------

static bool octal_string_literal(TSLexer* lexer)
{
    while(!lexer->eof(lexer)){
        if(lexer->lookahead == '_') lexer->advance(lexer, false);
        if(lexer->lookahead < '0' || lexer->lookahead > '7') break;
        lexer->advance(lexer, false);
    }
    if(lexer->lookahead != '"') return false;
    lexer->advance(lexer, false);
    lexer->mark_end(lexer);
    return true;
}
//------------------------------------------------------------------------------

static bool decimal_string_literal(TSLexer* lexer)
{
    while(!lexer->eof(lexer)){
        if(lexer->lookahead == '_') lexer->advance(lexer, false);
        if(lexer->lookahead < '0' || lexer->lookahead > '9') break;
        lexer->advance(lexer, false);
    }
    if(lexer->lookahead != '"') return false;
    lexer->advance(lexer, false);
    lexer->mark_end(lexer);
    return true;
}
//------------------------------------------------------------------------------

static bool is_hex_digit(int32_t character)
{
    return (character >= '0' && character <= '9') ||
           (character >= 'a' && character <= 'f') ||
           (character >= 'A' && character <= 'F');
}
//------------------------------------------------------------------------------

static bool hex_string_literal(TSLexer* lexer)
{
    while(!lexer->eof(lexer)){
        if(lexer->lookahead == '_') lexer->advance(lexer, false);
        if(!is_hex_digit(lexer->lookahead)) break;
        lexer->advance(lexer, false);
    }
    if(lexer->lookahead != '"') return false;
    lexer->advance(lexer, false);
    lexer->mark_end(lexer);
    return true;
}
//------------------------------------------------------------------------------

static bool finish_string_literal(TSLexer* lexer, TokenType type)
{
    switch(type){
        case BASE_SPECIFIER_BINARY:
        case BASE_SPECIFIER_UNSIGNED_BINARY:
        case BASE_SPECIFIER_SIGNED_BINARY:
            return binary_string_literal(lexer);

        case BASE_SPECIFIER_OCTAL:
        case BASE_SPECIFIER_UNSIGNED_OCTAL:
        case BASE_SPECIFIER_SIGNED_OCTAL:
            return octal_string_literal(lexer);

        case BASE_SPECIFIER_HEX:
        case BASE_SPECIFIER_UNSIGNED_HEX:
        case BASE_SPECIFIER_SIGNED_HEX:
            return hex_string_literal(lexer);

        case BASE_SPECIFIER_DECIMAL:
            return decimal_string_literal(lexer);

        default:
            error("Unrecognised type %s", token_type_to_string(type));
            return false;
    }
}
//------------------------------------------------------------------------------

static void finish_line_comment(TSLexer* lexer)
{
    while(!lexer->eof(lexer)){
        if(lexer->lookahead == '\r' || lexer->lookahead == '\n'){
            lexer->advance(lexer, false);
            lexer->mark_end(lexer);
            return;
        }
        lexer->advance(lexer, false);
    }
}
//------------------------------------------------------------------------------

static bool finish_block_comment(TSLexer* lexer)
{
    while(!lexer->eof(lexer)){
        if(lexer->lookahead == '*'){
            lexer->advance(lexer, false);
            if(lexer->lookahead == '/'){
                lexer->advance(lexer, false);
                lexer->mark_end(lexer);
                return true;
            }
        }else{
            lexer->advance(lexer, false);
        }
    }
}
//------------------------------------------------------------------------------

static bool finish_tool_directive(TSLexer* lexer, bool known)
{
    bool result = true;
    if(known){
        if((lexer->lookahead == '_') ||
           (lexer->lookahead >= 'a' && lexer->lookahead <= 'z') ||
           (lexer->lookahead >= 'A' && lexer->lookahead <= 'Z')) result = false;

    }else{
        if((lexer->lookahead < 'a' || lexer->lookahead > 'z') &&
           (lexer->lookahead < 'A' || lexer->lookahead > 'Z')) result = false;
    }
    finish_line_comment(lexer);
    return result;
}
//------------------------------------------------------------------------------

bool may_start_with_digit(const bool* valid_symbols)
{
    return valid_symbols[TOKEN_DECIMAL_LITERAL] ||
           valid_symbols[TOKEN_BASED_LITERAL]   ||
           valid_symbols[TOKEN_BIT_STRING_LITERAL];
}
//------------------------------------------------------------------------------

bool tree_sitter_vhdl_external_scanner_scan(void* token_tree, TSLexer* lexer, const bool* valid_symbols)
{
    skipWhitespace(lexer);

    if(valid_symbols[ERROR_SENTINEL]){
        debug("Error correction mode");
        return false;

    }else if(valid_symbols[IDENTIFIER] && lexer->lookahead == '\\'){
        if(!bounded_token(lexer)) return false;
        lexer->result_symbol = IDENTIFIER;
        debug("Returning type IDENTIFIER");
        return true;

    }else if(valid_symbols[TOKEN_STRING_LITERAL] && lexer->lookahead == '"'){
        if(!bounded_token(lexer)) return false;
        lexer->result_symbol = TOKEN_STRING_LITERAL;
        debug("Returning type TOKEN_STRING_LITERAL");
        return true;

    }else if(valid_symbols[TOKEN_CHARACTER_LITERAL] && lexer->lookahead == '\''){
        lexer->advance(lexer, false);
        if(lexer->eof(lexer)) return false;
        lexer->advance(lexer, false);
        if(lexer->lookahead != '\'') return false;
        lexer->advance(lexer, false);
        lexer->result_symbol = TOKEN_CHARACTER_LITERAL;
        debug("Returning type TOKEN_CHARACTER_LITERAL");
        return true;

    }else if(lexer->lookahead >= '0' && lexer->lookahead <= '9'){
        if(!may_start_with_digit(valid_symbols)) return false;
        // TODO: Handle all things that start with digits
    }

    bool first_char_is_letter = (lexer->lookahead >= 'a' && lexer->lookahead <= 'z') ||
                                (lexer->lookahead >= 'A' && lexer->lookahead <= 'Z');

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
        if(type->type == COMMENT_LINE_START){
            finish_line_comment(lexer);
            lexer->result_symbol = TOKEN_COMMENT;
            debug("Returning type TOKEN_COMMENT");
            return true;

        }else if(type->type == COMMENT_BLOCK_START){
            if(finish_block_comment(lexer)){
                lexer->result_symbol = TOKEN_COMMENT;
                debug("Returning type TOKEN_COMMENT");
                return true;
            }

        }else if(type->type == DELIMITER_GRAVE_ACCENT){
            if(finish_tool_directive(lexer, false)){
                lexer->result_symbol = TOKEN_TOOL_DIRECTIVE;
                debug("Returning type TOKEN_TOOL_DIRECTIVE");
                return true;
            }

        }else if(type->type == TOKEN_STANDARD_TOOL_DIRECTIVE ||
                 type->type == TOKEN_COMMON_TOOL_DIRECTIVE){
            if(finish_tool_directive(lexer, true)){
                lexer->result_symbol = type->type;
            }else{
                lexer->result_symbol = TOKEN_TOOL_DIRECTIVE;
            }
            debug("Returning type %s", token_type_to_string(lexer->result_symbol));
            return true;

        }else if(can_start_identifier(type->type) &&
            finish_identifier(lexer, type->type == IDENTIFIER_EXPECTING_LETTER)){
            lexer->result_symbol = IDENTIFIER;
            debug("Returning type IDENTIFIER");
            return true;

        }else if(is_base_specifier(type->type)){
            if(finish_string_literal(lexer, type->type)){
                lexer->result_symbol = TOKEN_BIT_STRING_LITERAL;
                debug("Returning type TOKEN_BIT_STRING_LITERAL");
                return true;
            }

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

