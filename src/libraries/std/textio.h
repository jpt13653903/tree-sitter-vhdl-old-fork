#ifndef textio_h
#define textio_h
//------------------------------------------------------------------------------

#include "../../TokenType.h"
//------------------------------------------------------------------------------

static void register_std_textio_types(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "line",  LIBRARY_TYPE);
    token_tree_insert(token_tree, "text",  LIBRARY_TYPE);
    token_tree_insert(token_tree, "side",  LIBRARY_TYPE);
    token_tree_insert(token_tree, "width", LIBRARY_TYPE);
}
//------------------------------------------------------------------------------

static void register_std_textio_constants(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "right",  LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "left",   LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "input",  LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "output", LIBRARY_CONSTANT);
}
//------------------------------------------------------------------------------

static void register_std_textio_functions(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "justify",          LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "readline",         LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "read",             LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "sread",            LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "string_read",      LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "bread",            LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "binary_read",      LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "oread",            LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "octal_read",       LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "hread",            LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "hex_read",         LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "writeline",        LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "write",            LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "swrite",           LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "string_write",     LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "bwrite",           LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "binary_write",     LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "owrite",           LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "octal_write",      LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "hwrite",           LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "hex_write",        LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "synthesis_return", LIBRARY_FUNCTION);
}
//------------------------------------------------------------------------------

#endif
//------------------------------------------------------------------------------

