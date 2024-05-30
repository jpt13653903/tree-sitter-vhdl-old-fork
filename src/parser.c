#include "tree_sitter/parser.h"

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 5
#define LARGE_STATE_COUNT 4
#define SYMBOL_COUNT 8
#define ALIAS_COUNT 0
#define TOKEN_COUNT 6
#define EXTERNAL_TOKEN_COUNT 3
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 2
#define PRODUCTION_ID_COUNT 1

enum ts_symbol_identifiers {
  sym_comment = 1,
  sym_tool_directive = 2,
  sym_keyword = 3,
  sym_builtinFunc = 4,
  sym_error_sentinel = 5,
  sym_source_file = 6,
  aux_sym_source_file_repeat1 = 7,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [sym_comment] = "comment",
  [sym_tool_directive] = "tool_directive",
  [sym_keyword] = "keyword",
  [sym_builtinFunc] = "builtinFunc",
  [sym_error_sentinel] = "error_sentinel",
  [sym_source_file] = "source_file",
  [aux_sym_source_file_repeat1] = "source_file_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [sym_comment] = sym_comment,
  [sym_tool_directive] = sym_tool_directive,
  [sym_keyword] = sym_keyword,
  [sym_builtinFunc] = sym_builtinFunc,
  [sym_error_sentinel] = sym_error_sentinel,
  [sym_source_file] = sym_source_file,
  [aux_sym_source_file_repeat1] = aux_sym_source_file_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [sym_comment] = {
    .visible = true,
    .named = true,
  },
  [sym_tool_directive] = {
    .visible = true,
    .named = true,
  },
  [sym_keyword] = {
    .visible = true,
    .named = true,
  },
  [sym_builtinFunc] = {
    .visible = true,
    .named = true,
  },
  [sym_error_sentinel] = {
    .visible = true,
    .named = true,
  },
  [sym_source_file] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_source_file_repeat1] = {
    .visible = false,
    .named = false,
  },
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 3,
  [4] = 4,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(5);
      if (lookahead == '-') ADVANCE(4);
      if (lookahead == '/') ADVANCE(1);
      if (lookahead == '`') ADVANCE(8);
      if (('\t' <= lookahead && lookahead <= '\r') ||
          lookahead == ' ') SKIP(0);
      END_STATE();
    case 1:
      if (lookahead == '*') ADVANCE(3);
      END_STATE();
    case 2:
      if (lookahead == '*') ADVANCE(2);
      if (lookahead == '/') ADVANCE(6);
      if (lookahead != 0) ADVANCE(3);
      END_STATE();
    case 3:
      if (lookahead == '*') ADVANCE(2);
      if (lookahead != 0) ADVANCE(3);
      END_STATE();
    case 4:
      if (lookahead == '-') ADVANCE(7);
      END_STATE();
    case 5:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 6:
      ACCEPT_TOKEN(sym_comment);
      END_STATE();
    case 7:
      ACCEPT_TOKEN(sym_comment);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(7);
      END_STATE();
    case 8:
      ACCEPT_TOKEN(sym_tool_directive);
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(8);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0, .external_lex_state = 1},
  [1] = {.lex_state = 0, .external_lex_state = 2},
  [2] = {.lex_state = 0, .external_lex_state = 2},
  [3] = {.lex_state = 0, .external_lex_state = 2},
  [4] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [sym_comment] = ACTIONS(3),
    [sym_tool_directive] = ACTIONS(3),
    [sym_keyword] = ACTIONS(1),
    [sym_builtinFunc] = ACTIONS(1),
    [sym_error_sentinel] = ACTIONS(1),
  },
  [1] = {
    [sym_source_file] = STATE(4),
    [aux_sym_source_file_repeat1] = STATE(2),
    [ts_builtin_sym_end] = ACTIONS(5),
    [sym_comment] = ACTIONS(3),
    [sym_tool_directive] = ACTIONS(3),
    [sym_keyword] = ACTIONS(7),
    [sym_builtinFunc] = ACTIONS(7),
  },
  [2] = {
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(9),
    [sym_comment] = ACTIONS(3),
    [sym_tool_directive] = ACTIONS(3),
    [sym_keyword] = ACTIONS(11),
    [sym_builtinFunc] = ACTIONS(11),
  },
  [3] = {
    [aux_sym_source_file_repeat1] = STATE(3),
    [ts_builtin_sym_end] = ACTIONS(13),
    [sym_comment] = ACTIONS(3),
    [sym_tool_directive] = ACTIONS(3),
    [sym_keyword] = ACTIONS(15),
    [sym_builtinFunc] = ACTIONS(15),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 2,
    ACTIONS(18), 1,
      ts_builtin_sym_end,
    ACTIONS(3), 2,
      sym_comment,
      sym_tool_directive,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(4)] = 0,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, SHIFT_EXTRA(),
  [5] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 0, 0, 0),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [9] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_source_file, 1, 0, 0),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [13] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2, 0, 0),
  [15] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_source_file_repeat1, 2, 0, 0), SHIFT_REPEAT(3),
  [18] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
};

enum ts_external_scanner_symbol_identifiers {
  ts_external_token_keyword = 0,
  ts_external_token_builtinFunc = 1,
  ts_external_token_error_sentinel = 2,
};

static const TSSymbol ts_external_scanner_symbol_map[EXTERNAL_TOKEN_COUNT] = {
  [ts_external_token_keyword] = sym_keyword,
  [ts_external_token_builtinFunc] = sym_builtinFunc,
  [ts_external_token_error_sentinel] = sym_error_sentinel,
};

static const bool ts_external_scanner_states[3][EXTERNAL_TOKEN_COUNT] = {
  [1] = {
    [ts_external_token_keyword] = true,
    [ts_external_token_builtinFunc] = true,
    [ts_external_token_error_sentinel] = true,
  },
  [2] = {
    [ts_external_token_keyword] = true,
    [ts_external_token_builtinFunc] = true,
  },
};

#ifdef __cplusplus
extern "C" {
#endif
void *tree_sitter_vhdl_external_scanner_create(void);
void tree_sitter_vhdl_external_scanner_destroy(void *);
bool tree_sitter_vhdl_external_scanner_scan(void *, TSLexer *, const bool *);
unsigned tree_sitter_vhdl_external_scanner_serialize(void *, char *);
void tree_sitter_vhdl_external_scanner_deserialize(void *, const char *, unsigned);

#ifdef TREE_SITTER_HIDE_SYMBOLS
#define TS_PUBLIC
#elif defined(_WIN32)
#define TS_PUBLIC __declspec(dllexport)
#else
#define TS_PUBLIC __attribute__((visibility("default")))
#endif

TS_PUBLIC const TSLanguage *tree_sitter_vhdl(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .external_scanner = {
      &ts_external_scanner_states[0][0],
      ts_external_scanner_symbol_map,
      tree_sitter_vhdl_external_scanner_create,
      tree_sitter_vhdl_external_scanner_destroy,
      tree_sitter_vhdl_external_scanner_scan,
      tree_sitter_vhdl_external_scanner_serialize,
      tree_sitter_vhdl_external_scanner_deserialize,
    },
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
