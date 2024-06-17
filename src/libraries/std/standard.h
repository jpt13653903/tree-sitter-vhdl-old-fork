#ifndef std_standard_h
#define std_standard_h
//------------------------------------------------------------------------------

#include "../../TokenType.h"
//------------------------------------------------------------------------------

static void register_std_standard_types(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "boolean",          LIBRARY_TYPE);
    token_tree_insert(token_tree, "bit",              LIBRARY_TYPE);
    token_tree_insert(token_tree, "character",        LIBRARY_TYPE);
    token_tree_insert(token_tree, "severity_level",   LIBRARY_TYPE);
    token_tree_insert(token_tree, "file_open_kind",   LIBRARY_TYPE);
    token_tree_insert(token_tree, "file_open_status", LIBRARY_TYPE);
    token_tree_insert(token_tree, "integer",          LIBRARY_TYPE);
    token_tree_insert(token_tree, "real",             LIBRARY_TYPE);
    token_tree_insert(token_tree, "time",             LIBRARY_TYPE);
    token_tree_insert(token_tree, "delay_length",     LIBRARY_TYPE);
    token_tree_insert(token_tree, "natural",          LIBRARY_TYPE);
    token_tree_insert(token_tree, "positive",         LIBRARY_TYPE);
    token_tree_insert(token_tree, "string",           LIBRARY_TYPE);
    token_tree_insert(token_tree, "bit_vector",       LIBRARY_TYPE);
    token_tree_insert(token_tree, "boolean_vector",   LIBRARY_TYPE);
    token_tree_insert(token_tree, "integer_vector",   LIBRARY_TYPE);
    token_tree_insert(token_tree, "real_vector",      LIBRARY_TYPE);
    token_tree_insert(token_tree, "time_vector",      LIBRARY_TYPE);
}
//------------------------------------------------------------------------------

static void register_std_standard_constants(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "true",         LIBRARY_CONSTANT_BOOLEAN);
    token_tree_insert(token_tree, "false",        LIBRARY_CONSTANT_BOOLEAN);

    token_tree_insert(token_tree, "nul",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "soh",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "stx",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "etx",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "eot",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "enq",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "ack",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "bel",          LIBRARY_CONSTANT_CHARACTER);

    token_tree_insert(token_tree, "bs",           LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "ht",           LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "lf",           LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "vt",           LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "ff",           LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "cr",           LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "so",           LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "si",           LIBRARY_CONSTANT_CHARACTER);

    token_tree_insert(token_tree, "dle",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "dc1",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "dc2",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "dc3",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "dc4",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "nak",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "syn",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "etb",          LIBRARY_CONSTANT_CHARACTER);

    token_tree_insert(token_tree, "can",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "em",           LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "sub",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "esc",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "fsp",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "gsp",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "rsp",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "usp",          LIBRARY_CONSTANT_CHARACTER);
    token_tree_insert(token_tree, "del",          LIBRARY_CONSTANT_CHARACTER);

    token_tree_insert(token_tree, "note",         LIBRARY_CONSTANT_DEBUG);
    token_tree_insert(token_tree, "warning",      LIBRARY_CONSTANT_DEBUG);
    token_tree_insert(token_tree, "error",        LIBRARY_CONSTANT_DEBUG);
    token_tree_insert(token_tree, "failure",      LIBRARY_CONSTANT_DEBUG);

    token_tree_insert(token_tree, "read_mode",    LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "write_mode",   LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "append_mode",  LIBRARY_CONSTANT);

    token_tree_insert(token_tree, "open_ok",      LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "status_error", LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "name_error",   LIBRARY_CONSTANT);
    token_tree_insert(token_tree, "mode_error",   LIBRARY_CONSTANT);

    token_tree_insert(token_tree, "fs",           LIBRARY_CONSTANT_UNIT);
    token_tree_insert(token_tree, "ps",           LIBRARY_CONSTANT_UNIT);
    token_tree_insert(token_tree, "ns",           LIBRARY_CONSTANT_UNIT);
    token_tree_insert(token_tree, "us",           LIBRARY_CONSTANT_UNIT);
    token_tree_insert(token_tree, "ms",           LIBRARY_CONSTANT_UNIT);
    token_tree_insert(token_tree, "sec",          LIBRARY_CONSTANT_UNIT);
    token_tree_insert(token_tree, "min",          LIBRARY_CONSTANT_UNIT);
    token_tree_insert(token_tree, "hr",           LIBRARY_CONSTANT_UNIT);
}
//------------------------------------------------------------------------------

static void register_std_standard_functions(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "now",     LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "foreign", LIBRARY_ATTRIBUTE);
}
//------------------------------------------------------------------------------

void register_std_standard(TokenTree* token_tree)
{
    register_std_standard_types    (token_tree);
    register_std_standard_constants(token_tree);
    register_std_standard_functions(token_tree);
}
//------------------------------------------------------------------------------

#endif
//------------------------------------------------------------------------------

