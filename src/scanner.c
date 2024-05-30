#include "tree_sitter/parser.h"

void *tree_sitter_vhdl_external_scanner_create() {
  return NULL;
}

bool tree_sitter_xml_external_scanner_scan(void *payload, TSLexer *lexer, const bool *valid_symbols) {
  return false;
}

void tree_sitter_vhdl_external_scanner_destroy(void *payload) {
  /* NOOP */
}

unsigned tree_sitter_vhdl_external_scanner_serialize(void *payload, char *buffer) {
  return 0;
}

void tree_sitter_vhdl_external_scanner_deserialize(void *payload, const char *buffer, unsigned length) {
  /* NOOP */
}
