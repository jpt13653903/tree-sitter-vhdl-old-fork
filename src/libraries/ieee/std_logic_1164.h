#ifndef std_logic_1164_h
#define std_logic_1164_h
//------------------------------------------------------------------------------

#include "../../TokenType.h"
//------------------------------------------------------------------------------

static void register_ieee_std_logic_1164_types(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "std_ulogic",        LIBRARY_TYPE);
    token_tree_insert(token_tree, "std_ulogic_vector", LIBRARY_TYPE);
    token_tree_insert(token_tree, "std_logic",         LIBRARY_TYPE);
    token_tree_insert(token_tree, "std_logic_vector",  LIBRARY_TYPE);
    token_tree_insert(token_tree, "x01",               LIBRARY_TYPE);
    token_tree_insert(token_tree, "x01z",              LIBRARY_TYPE);
    token_tree_insert(token_tree, "ux01",              LIBRARY_TYPE);
    token_tree_insert(token_tree, "ux01Z",             LIBRARY_TYPE);
}
//------------------------------------------------------------------------------

static void register_ieee_std_logic_1164_functions(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "resolved",             LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "logic_type_encoding",  LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "is_signed",            LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_bit",               LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_bitvector",         LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_stdulogic",         LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_stdlogicvector",    LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_stdulogicvector",   LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_bit_vector",        LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_bv",                LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_std_logic_vector",  LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_slv",               LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_std_ulogic_vector", LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_sulv",              LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_01",                LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_x01",               LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_x01z",              LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_ux01",              LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "rising_edge",          LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "falling_edge",         LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "is_x",                 LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_bstring",           LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_string",            LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_binary_string",     LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_ostring",           LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_octal_string",      LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_hstring",           LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_hex_string",        LIBRARY_FUNCTION);
}
//------------------------------------------------------------------------------

#endif
//------------------------------------------------------------------------------

