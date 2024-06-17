#ifndef float_pkg_h
#define float_pkg_h
//------------------------------------------------------------------------------

#include "../../TokenType.h"
//------------------------------------------------------------------------------

static void register_ieee_float_pkg_types(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "unresolved_float",    LIBRARY_TYPE);
    token_tree_insert(token_tree, "u_float",             LIBRARY_TYPE);
    token_tree_insert(token_tree, "float",               LIBRARY_TYPE);
    token_tree_insert(token_tree, "unresolved_float32",  LIBRARY_TYPE);
    token_tree_insert(token_tree, "u_float32",           LIBRARY_TYPE);
    token_tree_insert(token_tree, "float32",             LIBRARY_TYPE);
    token_tree_insert(token_tree, "unresolved_float64",  LIBRARY_TYPE);
    token_tree_insert(token_tree, "u_float64",           LIBRARY_TYPE);
    token_tree_insert(token_tree, "float64",             LIBRARY_TYPE);
    token_tree_insert(token_tree, "unresolved_float128", LIBRARY_TYPE);
    token_tree_insert(token_tree, "u_float128",          LIBRARY_TYPE);
    token_tree_insert(token_tree, "float128",            LIBRARY_TYPE);
    token_tree_insert(token_tree, "valid_fpstate",       LIBRARY_TYPE);
    token_tree_insert(token_tree, "fphdlsynth_or_real",  LIBRARY_TYPE);
    token_tree_insert(token_tree, "round_type",          LIBRARY_TYPE);
}
//------------------------------------------------------------------------------

static void register_ieee_float_pkg_constants(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "nan",           LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "quiet_nan",     LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "neg_inf",       LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "neg_normal",    LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "neg_denormal",  LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "neg_zero",      LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "pos_zero",      LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "pos_denormal",  LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "pos_normal",    LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "pos_inf",       LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "isx",           LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "round_nearest", LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "round_inf",     LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "round_neginf",  LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "round_zero",    LIBRARY_CONSTANT);
}
//------------------------------------------------------------------------------

static void register_ieee_float_pkg_functions(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "add",                LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "subtract",           LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "multiply",           LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "divide",             LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "remainder",          LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "modulo",             LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "reciprocal",         LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "dividebyp2",         LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "mac",                LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "eq",                 LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "ne",                 LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "lt",                 LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "gt",                 LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "le",                 LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "ge",                 LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_float",           LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_float32",         LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_float64",         LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_float128",        LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_ufixed",          LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_sfixed",          LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "to_real",            LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "realtobits",         LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "bitstoreal",         LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "break_number",       LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "normalize",          LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "copysign",           LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "scalb",              LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "logb",               LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "nextafter",          LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "unordered",          LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "finite",             LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "isnan",              LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "zerofp",             LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "nanfp",              LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "qnanfp",             LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "pos_inffp",          LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "neg_inffp",          LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "neg_zerofp",         LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "from_string",        LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "from_bstring",       LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "from_binary_string", LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "from_ostring",       LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "from_octal_string",  LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "from_hstring",       LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "from_hex_string",    LIBRARY_FUNCTION);
}
//------------------------------------------------------------------------------

void register_ieee_float_pkg(TokenTree* token_tree)
{
    register_ieee_float_pkg_types    (token_tree);
    register_ieee_float_pkg_constants(token_tree);
    register_ieee_float_pkg_functions(token_tree);
}
//------------------------------------------------------------------------------

#endif
//------------------------------------------------------------------------------

