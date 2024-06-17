#ifndef fixed_pkg_h
#define fixed_pkg_h
//------------------------------------------------------------------------------

#include "../../TokenType.h"
//------------------------------------------------------------------------------

static void register_ieee_fixed_pkg_types(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "unresolved_ufixed",         LIBRARY_TYPE);
    token_tree_insert(token_tree, "unresolved_sfixed",         LIBRARY_TYPE);
    token_tree_insert(token_tree, "u_ufixed",                  LIBRARY_TYPE);
    token_tree_insert(token_tree, "u_sfixed",                  LIBRARY_TYPE);
    token_tree_insert(token_tree, "ufixed",                    LIBRARY_TYPE);
    token_tree_insert(token_tree, "sfixed",                    LIBRARY_TYPE);
    token_tree_insert(token_tree, "fixed_overflow_style_type", LIBRARY_TYPE);
    token_tree_insert(token_tree, "fixed_round_style_type",    LIBRARY_TYPE);
}
//------------------------------------------------------------------------------

static void register_ieee_fixed_pkg_constants(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "fixed_round",    LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "fixed_truncate", LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "fixed_saturate", LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "fixed_wrap",     LIBRARY_CONSTANT);
}
//------------------------------------------------------------------------------

static void register_ieee_fixed_pkg_functions(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "add_carry",   LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "ufixed_high", LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "ufixed_low",  LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "sfixed_high", LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "sfixed_low",  LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "saturate",    LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_ufix",     LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_sfix",     LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "ufix_high",   LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "ufix_low",    LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "sfix_high",   LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "sfix_low",    LIBRARY_FUNCTION);
}
//------------------------------------------------------------------------------

void register_ieee_fixed_pkg(TokenTree* token_tree)
{
    register_ieee_fixed_pkg_types    (token_tree);
    register_ieee_fixed_pkg_constants(token_tree);
    register_ieee_fixed_pkg_functions(token_tree);
}
//------------------------------------------------------------------------------

#endif
//------------------------------------------------------------------------------

