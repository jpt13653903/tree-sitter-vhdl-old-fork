#ifndef std_env_h
#define std_env_h
//------------------------------------------------------------------------------

#include "../../TokenType.h"
//------------------------------------------------------------------------------

static void register_std_env_functions(TokenTree* token_tree)
{
    // Sourced from "https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml"
    token_tree_insert(token_tree, "stop",             LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "finish",           LIBRARY_FUNCTION);
    token_tree_insert(token_tree, "resolution_limit", LIBRARY_FUNCTION);
}
//------------------------------------------------------------------------------

#endif
//------------------------------------------------------------------------------
