#define DEBUG
//------------------------------------------------------------------------------

#include <stdio.h>
#include "tree_sitter/parser.h"
#include "debug_macros.h"
#include "TokenType.h"
#include "TokenTree.h"
//------------------------------------------------------------------------------

/* TODO:
 *
 *  I cannot figure out how to get the tree-sitter compiler to include the
 *  TokenTree.c file in the compile chain, so I'm including it here
 *  manually.
 */
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
    token_tree_insert(token_tree, "after",         KEYWORD_AFTER);
    token_tree_insert(token_tree, "alias",         KEYWORD_ALIAS);
    token_tree_insert(token_tree, "all",           KEYWORD_ALL);
    token_tree_insert(token_tree, "architecture",  KEYWORD_ARCHITECTURE);
    token_tree_insert(token_tree, "array",         KEYWORD_ARRAY);
    token_tree_insert(token_tree, "assert",        KEYWORD_ASSERT);
    token_tree_insert(token_tree, "attribute",     KEYWORD_ATTRIBUTE);
    token_tree_insert(token_tree, "begin",         KEYWORD_BEGIN);
    token_tree_insert(token_tree, "block",         KEYWORD_BLOCK);
    token_tree_insert(token_tree, "buffer",        KEYWORD_BUFFER);
    token_tree_insert(token_tree, "bus",           KEYWORD_BUS);
    token_tree_insert(token_tree, "case",          KEYWORD_CASE);
    token_tree_insert(token_tree, "component",     KEYWORD_COMPONENT);
    token_tree_insert(token_tree, "configuration", KEYWORD_CONFIGURATION);
    token_tree_insert(token_tree, "constant",      KEYWORD_CONSTANT);
    token_tree_insert(token_tree, "context",       KEYWORD_CONTEXT);
    token_tree_insert(token_tree, "default",       KEYWORD_DEFAULT);
    token_tree_insert(token_tree, "disconnect",    KEYWORD_DISCONNECT);
    token_tree_insert(token_tree, "downto",        KEYWORD_DOWNTO);
    token_tree_insert(token_tree, "else",          KEYWORD_ELSE);
    token_tree_insert(token_tree, "elsif",         KEYWORD_ELSIF);
    token_tree_insert(token_tree, "end",           KEYWORD_END);
    token_tree_insert(token_tree, "entity",        KEYWORD_ENTITY);
    token_tree_insert(token_tree, "exit",          KEYWORD_EXIT);
    token_tree_insert(token_tree, "file",          KEYWORD_FILE);
    token_tree_insert(token_tree, "for",           KEYWORD_FOR);
    token_tree_insert(token_tree, "force",         KEYWORD_FORCE);
    token_tree_insert(token_tree, "function",      KEYWORD_FUNCTION);
    token_tree_insert(token_tree, "generate",      KEYWORD_GENERATE);
    token_tree_insert(token_tree, "generic",       KEYWORD_GENERIC);
    token_tree_insert(token_tree, "group",         KEYWORD_GROUP);
    token_tree_insert(token_tree, "guarded",       KEYWORD_GUARDED);
    token_tree_insert(token_tree, "if",            KEYWORD_IF);
    token_tree_insert(token_tree, "impure",        KEYWORD_IMPURE);
    token_tree_insert(token_tree, "in",            KEYWORD_IN);
    token_tree_insert(token_tree, "inertial",      KEYWORD_INERTIAL);
    token_tree_insert(token_tree, "inout",         KEYWORD_INOUT);
    token_tree_insert(token_tree, "is",            KEYWORD_IS);
    token_tree_insert(token_tree, "label",         KEYWORD_LABEL);
    token_tree_insert(token_tree, "library",       KEYWORD_LIBRARY);
    token_tree_insert(token_tree, "linkage",       KEYWORD_LINKAGE);
    token_tree_insert(token_tree, "literal",       KEYWORD_LITERAL);
    token_tree_insert(token_tree, "loop",          KEYWORD_LOOP);
    token_tree_insert(token_tree, "map",           KEYWORD_MAP);
    token_tree_insert(token_tree, "new",           KEYWORD_NEW);
    token_tree_insert(token_tree, "next",          KEYWORD_NEXT);
    token_tree_insert(token_tree, "null",          KEYWORD_NULL);
    token_tree_insert(token_tree, "of",            KEYWORD_OF);
    token_tree_insert(token_tree, "on",            KEYWORD_ON);
    token_tree_insert(token_tree, "open",          KEYWORD_OPEN);
    token_tree_insert(token_tree, "others",        KEYWORD_OTHERS);
    token_tree_insert(token_tree, "out",           KEYWORD_OUT);
    token_tree_insert(token_tree, "package",       KEYWORD_PACKAGE);
    token_tree_insert(token_tree, "parameter",     KEYWORD_PARAMETER);
    token_tree_insert(token_tree, "port",          KEYWORD_PORT);
    token_tree_insert(token_tree, "postponed",     KEYWORD_POSTPONED);
    token_tree_insert(token_tree, "procedure",     KEYWORD_PROCEDURE);
    token_tree_insert(token_tree, "process",       KEYWORD_PROCESS);
    token_tree_insert(token_tree, "property",      KEYWORD_PROPERTY);
    token_tree_insert(token_tree, "protected",     KEYWORD_PROTECTED);
    token_tree_insert(token_tree, "pure",          KEYWORD_PURE);
    token_tree_insert(token_tree, "range",         KEYWORD_RANGE);
    token_tree_insert(token_tree, "record",        KEYWORD_RECORD);
    token_tree_insert(token_tree, "register",      KEYWORD_REGISTER);
    token_tree_insert(token_tree, "reject",        KEYWORD_REJECT);
    token_tree_insert(token_tree, "release",       KEYWORD_RELEASE);
    token_tree_insert(token_tree, "report",        KEYWORD_REPORT);
    token_tree_insert(token_tree, "return",        KEYWORD_RETURN);
    token_tree_insert(token_tree, "select",        KEYWORD_SELECT);
    token_tree_insert(token_tree, "sequence",      KEYWORD_SEQUENCE);
    token_tree_insert(token_tree, "severity",      KEYWORD_SEVERITY);
    token_tree_insert(token_tree, "shared",        KEYWORD_SHARED);
    token_tree_insert(token_tree, "signal",        KEYWORD_SIGNAL);
    token_tree_insert(token_tree, "subtype",       KEYWORD_SUBTYPE);
    token_tree_insert(token_tree, "then",          KEYWORD_THEN);
    token_tree_insert(token_tree, "transport",     KEYWORD_TRANSPORT);
    token_tree_insert(token_tree, "type",          KEYWORD_TYPE);
    token_tree_insert(token_tree, "unaffected",    KEYWORD_UNAFFECTED);
    token_tree_insert(token_tree, "units",         KEYWORD_UNITS);
    token_tree_insert(token_tree, "until",         KEYWORD_UNTIL);
    token_tree_insert(token_tree, "use",           KEYWORD_USE);
    token_tree_insert(token_tree, "variable",      KEYWORD_VARIABLE);
    token_tree_insert(token_tree, "vunit",         KEYWORD_VUNIT);
    token_tree_insert(token_tree, "wait",          KEYWORD_WAIT);
    token_tree_insert(token_tree, "when",          KEYWORD_WHEN);
    token_tree_insert(token_tree, "while",         KEYWORD_WHILE);
    token_tree_insert(token_tree, "with",          KEYWORD_WITH);

    // VHDL-2008 section 16.2.2
    token_tree_insert(token_tree, "base",          ATTRIBUTE_TYPE);
    token_tree_insert(token_tree, "left",          ATTRIBUTE_VALUE);
    token_tree_insert(token_tree, "right",         ATTRIBUTE_VALUE);
    token_tree_insert(token_tree, "high",          ATTRIBUTE_VALUE);
    token_tree_insert(token_tree, "low",           ATTRIBUTE_VALUE);
    token_tree_insert(token_tree, "ascending",     ATTRIBUTE_VALUE);
    token_tree_insert(token_tree, "image",         ATTRIBUTE_PURE_FUNCTION);
    token_tree_insert(token_tree, "value",         ATTRIBUTE_PURE_FUNCTION);
    token_tree_insert(token_tree, "pos",           ATTRIBUTE_PURE_FUNCTION);
    token_tree_insert(token_tree, "val",           ATTRIBUTE_PURE_FUNCTION);
    token_tree_insert(token_tree, "succ",          ATTRIBUTE_PURE_FUNCTION);
    token_tree_insert(token_tree, "pred",          ATTRIBUTE_PURE_FUNCTION);
    token_tree_insert(token_tree, "leftof",        ATTRIBUTE_PURE_FUNCTION);
    token_tree_insert(token_tree, "rightof",       ATTRIBUTE_PURE_FUNCTION);
    // token_tree_insert(token_tree, "subtype",       ATTRIBUTE_SUBTYPE);

    // VHDL-2008 section 16.2.3
    // token_tree_insert(token_tree, "left",          ATTRIBUTE_FUNCTION);
    // token_tree_insert(token_tree, "right",         ATTRIBUTE_FUNCTION);
    // token_tree_insert(token_tree, "high",          ATTRIBUTE_FUNCTION);
    // token_tree_insert(token_tree, "low",           ATTRIBUTE_FUNCTION);
    // token_tree_insert(token_tree, "range",         ATTRIBUTE_RANGE);
    token_tree_insert(token_tree, "reverse_range", ATTRIBUTE_RANGE);
    token_tree_insert(token_tree, "length",        ATTRIBUTE_FUNCTION);
    // token_tree_insert(token_tree, "ascending",     ATTRIBUTE_FUNCTION);
    token_tree_insert(token_tree, "element",       ATTRIBUTE_SUBTYPE);

    // VHDL-2008 section 16.2.4
    token_tree_insert(token_tree, "delayed",       ATTRIBUTE_SIGNAL);
    token_tree_insert(token_tree, "stable",        ATTRIBUTE_SIGNAL);
    token_tree_insert(token_tree, "quiet",         ATTRIBUTE_SIGNAL);
    token_tree_insert(token_tree, "transaction",   ATTRIBUTE_SIGNAL);
    token_tree_insert(token_tree, "event",         ATTRIBUTE_FUNCTION);
    token_tree_insert(token_tree, "active",        ATTRIBUTE_FUNCTION);
    token_tree_insert(token_tree, "last_event",    ATTRIBUTE_FUNCTION);
    token_tree_insert(token_tree, "last_active",   ATTRIBUTE_FUNCTION);
    token_tree_insert(token_tree, "last_value",    ATTRIBUTE_FUNCTION);
    token_tree_insert(token_tree, "driving",       ATTRIBUTE_FUNCTION);
    token_tree_insert(token_tree, "driving_value", ATTRIBUTE_FUNCTION);

    // VHDL-2008 section 16.2.5
    token_tree_insert(token_tree, "simple_name",   ATTRIBUTE_VALUE);
    token_tree_insert(token_tree, "instance_name", ATTRIBUTE_VALUE);
    token_tree_insert(token_tree, "path_name",     ATTRIBUTE_VALUE);

    // VHDL-2008 appendix G.1
    token_tree_insert(token_tree, "std_logic",         BUILTIN_TYPE);
    token_tree_insert(token_tree, "std_logic_vector",  BUILTIN_TYPE);
    token_tree_insert(token_tree, "std_ulogic",        BUILTIN_TYPE);
    token_tree_insert(token_tree, "std_ulogic_vector", BUILTIN_TYPE);

    token_tree_insert(token_tree, "signed",            BUILTIN_TYPE);
    token_tree_insert(token_tree, "unsigned",          BUILTIN_TYPE);

    token_tree_insert(token_tree, "unresolved_ufixed", BUILTIN_TYPE);
    token_tree_insert(token_tree, "unresolved_sfixed", BUILTIN_TYPE);
    token_tree_insert(token_tree, "u_ufixed",          BUILTIN_TYPE);
    token_tree_insert(token_tree, "u_sfixed",          BUILTIN_TYPE);
    token_tree_insert(token_tree, "ufixed",            BUILTIN_TYPE);
    token_tree_insert(token_tree, "sfixed",            BUILTIN_TYPE);

    token_tree_insert(token_tree, "boolean",           BUILTIN_TYPE);
    token_tree_insert(token_tree, "integer",           BUILTIN_TYPE);
    token_tree_insert(token_tree, "natural",           BUILTIN_TYPE);

    token_tree_insert(token_tree, "real",              BUILTIN_TYPE);
    token_tree_insert(token_tree, "complex",           BUILTIN_TYPE);
    token_tree_insert(token_tree, "complex_polar",     BUILTIN_TYPE);
    token_tree_insert(token_tree, "string",            BUILTIN_TYPE);

    token_tree_insert(token_tree, "shift_left",        BUILTIN_FUNCTION);
    token_tree_insert(token_tree, "shift_right",       BUILTIN_FUNCTION);

    token_tree_insert(token_tree, "to_integer",        BUILTIN_FUNCTION);
    token_tree_insert(token_tree, "to_signed",         BUILTIN_FUNCTION);
    token_tree_insert(token_tree, "to_unsigned",       BUILTIN_FUNCTION);
    token_tree_insert(token_tree, "to_sfixed",         BUILTIN_FUNCTION);
    token_tree_insert(token_tree, "to_ufixed",         BUILTIN_FUNCTION);
    token_tree_insert(token_tree, "reciprocal",        BUILTIN_FUNCTION);

    token_tree_insert(token_tree, "sin",               BUILTIN_FUNCTION);
    token_tree_insert(token_tree, "cos",               BUILTIN_FUNCTION);
    token_tree_insert(token_tree, "tan",               BUILTIN_FUNCTION);

    // TODO: The above is a small subset of built-in stuff...
    // Expand for the following libraries:
    //
    // - math_real
    // - math_complex
    // - std_logic_1164
    // - numeric_std
    // - fixed_point
    // - floating_point

    // VHDL-2008 section 9.2.1
    token_tree_insert(token_tree, "+",             OPERATOR_ADDING);
    token_tree_insert(token_tree, "-",             OPERATOR_ADDING);
    token_tree_insert(token_tree, "&",             OPERATOR_ADDING);
    token_tree_insert(token_tree, "??",            OPERATOR_CONDITION);
    token_tree_insert(token_tree, "and",           OPERATOR_LOGICAL);
    token_tree_insert(token_tree, "or",            OPERATOR_LOGICAL);
    token_tree_insert(token_tree, "nand",          OPERATOR_LOGICAL);
    token_tree_insert(token_tree, "nor",           OPERATOR_LOGICAL);
    token_tree_insert(token_tree, "xor",           OPERATOR_LOGICAL);
    token_tree_insert(token_tree, "xnor",          OPERATOR_LOGICAL);
    token_tree_insert(token_tree, "**",            OPERATOR_MISCELLANEOUS);
    token_tree_insert(token_tree, "abs",           OPERATOR_MISCELLANEOUS);
    token_tree_insert(token_tree, "not",           OPERATOR_MISCELLANEOUS);
    token_tree_insert(token_tree, "*",             OPERATOR_MULTIPLYING);
    token_tree_insert(token_tree, "/",             OPERATOR_MULTIPLYING);
    token_tree_insert(token_tree, "mod",           OPERATOR_MULTIPLYING);
    token_tree_insert(token_tree, "rem",           OPERATOR_MULTIPLYING);
    token_tree_insert(token_tree, "=",             OPERATOR_RELATIONAL);
    token_tree_insert(token_tree, "/=",            OPERATOR_RELATIONAL);
    token_tree_insert(token_tree, "<",             OPERATOR_RELATIONAL);
    token_tree_insert(token_tree, "<=",            OPERATOR_RELATIONAL);
    token_tree_insert(token_tree, ">",             OPERATOR_RELATIONAL);
    token_tree_insert(token_tree, ">=",            OPERATOR_RELATIONAL);
    token_tree_insert(token_tree, "?=",            OPERATOR_RELATIONAL);
    token_tree_insert(token_tree, "?/=",           OPERATOR_RELATIONAL);
    token_tree_insert(token_tree, "?<",            OPERATOR_RELATIONAL);
    token_tree_insert(token_tree, "?<=",           OPERATOR_RELATIONAL);
    token_tree_insert(token_tree, "?>",            OPERATOR_RELATIONAL);
    token_tree_insert(token_tree, "?>=",           OPERATOR_RELATIONAL);
    token_tree_insert(token_tree, "sll",           OPERATOR_SHIFT);
    token_tree_insert(token_tree, "srl",           OPERATOR_SHIFT);
    token_tree_insert(token_tree, "sla",           OPERATOR_SHIFT);
    token_tree_insert(token_tree, "sra",           OPERATOR_SHIFT);
    token_tree_insert(token_tree, "rol",           OPERATOR_SHIFT);
    token_tree_insert(token_tree, "ror",           OPERATOR_SHIFT);
    // token_tree_insert(token_tree, "+",             OPERATOR_SIGN);
    // token_tree_insert(token_tree, "-",             OPERATOR_SIGN);

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

// Ignores whitespace and returns the lower-case conversion
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

bool tree_sitter_vhdl_external_scanner_scan(void* token_tree, TSLexer* lexer, const bool* valid_symbols)
{
    skipWhitespace(lexer);

    if(valid_symbols[ERROR_SENTINEL]){
        debug("Error correction mode");
        return false;
    }

    if(valid_symbols[IDENTIFIER] && extended_identifier(lexer)){
        debug("Returning true");
        return true;
    }

    TokenType type = token_tree_match(token_tree, lexer, valid_symbols[IDENTIFIER]);

    if(type == UNKNOWN){
        debug("Returning false...");
        return false;
    }

    if(valid_symbols[type]){
        lexer->result_symbol = type;
        debug("Returning true");
        return true;
    }

    debug("Returning false...");
    return false;
}
//------------------------------------------------------------------------------

