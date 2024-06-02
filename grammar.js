module.exports = grammar({
  name: 'vhdl',

  /* The external scanner tokenises all lexical elements (i.e. section 15 of
   * the VHDL-2008 standard), which makes handling case insensitivity and
   * multiple look-ahead easier.
   *
   * In addition to the lexical elements, it also tokenises often-used
   * library identifiers and built-in attributes.
   *
   * It also makes all searches binary, in contrast to parser.c that mostly
   * use linear searches (probably because it has to preserve priority).
   */
  externals: $ => [
    $.identifier,

    $.reserved_abs,
    $.reserved_access,
    $.reserved_after,
    $.reserved_alias,
    $.reserved_all,
    $.reserved_and,
    $.reserved_architecture,
    $.reserved_array,
    $.reserved_assert,
    $.reserved_assume,
    $.reserved_assume_guarantee,
    $.reserved_attribute,
    $.reserved_begin,
    $.reserved_block,
    $.reserved_body,
    $.reserved_buffer,
    $.reserved_bus,
    $.reserved_case,
    $.reserved_component,
    $.reserved_configuration,
    $.reserved_constant,
    $.reserved_context,
    $.reserved_cover,
    $.reserved_default,
    $.reserved_disconnect,
    $.reserved_downto,
    $.reserved_else,
    $.reserved_elsif,
    $.reserved_end,
    $.reserved_entity,
    $.reserved_exit,
    $.reserved_fairness,
    $.reserved_file,
    $.reserved_for,
    $.reserved_force,
    $.reserved_function,
    $.reserved_generate,
    $.reserved_generic,
    $.reserved_group,
    $.reserved_guarded,
    $.reserved_if,
    $.reserved_impure,
    $.reserved_in,
    $.reserved_inertial,
    $.reserved_inout,
    $.reserved_is,
    $.reserved_label,
    $.reserved_library,
    $.reserved_linkage,
    $.reserved_literal,
    $.reserved_loop,
    $.reserved_map,
    $.reserved_mod,
    $.reserved_nand,
    $.reserved_new,
    $.reserved_next,
    $.reserved_nor,
    $.reserved_not,
    $.reserved_null,
    $.reserved_of,
    $.reserved_on,
    $.reserved_open,
    $.reserved_or,
    $.reserved_others,
    $.reserved_out,
    $.reserved_package,
    $.reserved_parameter,
    $.reserved_port,
    $.reserved_postponed,
    $.reserved_procedure,
    $.reserved_process,
    $.reserved_property,
    $.reserved_protected,
    $.reserved_pure,
    $.reserved_range,
    $.reserved_record,
    $.reserved_register,
    $.reserved_reject,
    $.reserved_release,
    $.reserved_rem,
    $.reserved_report,
    $.reserved_restrict,
    $.reserved_restrict_guarantee,
    $.reserved_return,
    $.reserved_rol,
    $.reserved_ror,
    $.reserved_select,
    $.reserved_sequence,
    $.reserved_severity,
    $.reserved_signal,
    $.reserved_shared,
    $.reserved_sla,
    $.reserved_sll,
    $.reserved_sra,
    $.reserved_srl,
    $.reserved_strong,
    $.reserved_subtype,
    $.reserved_then,
    $.reserved_to,
    $.reserved_transport,
    $.reserved_type,
    $.reserved_unaffected,
    $.reserved_units,
    $.reserved_until,
    $.reserved_use,
    $.reserved_variable,
    $.reserved_vmode,
    $.reserved_vprop,
    $.reserved_vunit,
    $.reserved_wait,
    $.reserved_when,
    $.reserved_while,
    $.reserved_with,
    $.reserved_xnor,
    $.reserved_xor,

    $.reserved_end_marker, // Scanner internal use only

    $.delimiter_ampersand,
    $.delimiter_tick,
    $.delimiter_left_parenthesis,
    $.delimiter_right_parenthesis,
    $.delimiter_multiply,
    $.delimiter_plus_sign,
    $.delimiter_comma,
    $.delimiter_minus_sign,
    $.delimiter_dot,
    $.delimiter_divide,
    $.delimiter_colon,
    $.delimiter_semicolon,
    $.delimiter_less_than_sign,
    $.delimiter_equals_sign,
    $.delimiter_greater_than_sign,
    $.delimiter_grave_accent,
    $.delimiter_vertical_bar,
    $.delimiter_left_square_bracket,
    $.delimiter_right_square_bracket,
    $.delimiter_question_mark,
    $.delimiter_commercial_at,

    $.delimiter_arrow,
    $.delimiter_exponentiate,
    $.delimiter_variable_assignment,
    $.delimiter_inequality,
    $.delimiter_greater_than_or_equal,
    $.delimiter_less_than_or_equal,
    $.delimiter_signal_assignment,
    $.delimiter_box,
    $.delimiter_condition_conversion,
    $.delimiter_matching_equality,
    $.delimiter_matching_inequality,
    $.delimiter_matching_less_than,
    $.delimiter_matching_less_than_or_equal,
    $.delimiter_matching_greater_than,
    $.delimiter_matching_greater_than_or_equal,
    $.delimiter_double_less_than,
    $.delimiter_double_greater_than,

    $.delimiter_end_marker, // Scanner internal use only

    $.token_decimal_literal,
    $.token_decimal_literal_float,
    $.token_based_literal,
    $.token_based_literal_float,
    $.token_character_literal,
    $.token_string_literal,
    $.token_bit_string_literal,
    $.token_comment,
    $.token_tool_directive,
    $.token_standard_tool_directive,
    $.token_common_tool_directive,

    $.token_end_marker, // Scanner internal use only

    $.attribute_function,
    $.attribute_pure_function,
    $.attribute_range,
    $.attribute_signal,
    $.attribute_subtype,
    $.attribute_type,
    $.attribute_value,

    $.library_attribute,
    $.library_constant,
    $.library_constant_boolean,
    $.library_function,
    $.library_type,

    $.error_sentinel
  ],

  extras: $ => [
    $.token_comment,
    $.token_tool_directive,
    $.token_standard_tool_directive,
    $.token_common_tool_directive,
    /\s/,
  ],

  rules: {
    source_file: $ => $.entity_declaration,

    // VHDL-2008 section 3.2.1
    entity_declaration: $ => seq(
      $.reserved_entity, $.identifier, $.reserved_is,
      // optional($.generic_clause),
      optional($.port_clause),
      // $.entity_declarative_part,
      optional(seq(
        $.reserved_begin,
        $.entity_statement_part
      )),
      $.reserved_end, optional($.reserved_entity), optional($.simple_name), $.delimiter_semicolon
    ),

    // generic_clause: $ => seq(
    //   $.generic, $.delimiter_left_parenthesis, $.generic_list,
    //   $.delimiter_right_parenthesis, $.delimiter_semicolon),

    port_clause: $ => seq(
      $.reserved_port, $.delimiter_left_parenthesis, $.interface_list,
      $.delimiter_right_parenthesis, $.delimiter_semicolon),

    interface_list: $ => seq(
      $.interface_declaration,
      repeat(seq($.delimiter_semicolon, $.interface_declaration))
    ),

    interface_declaration: $ => choice(
      $.interface_object_declaration,
      // $.interface_type_declaration,
      // $.interface_subprogram_declaration,
      // $.interface_package_declaration
    ),

    interface_object_declaration: $ => seq(
      // $.interface_constant_declaration,
      $.interface_signal_declaration,
      // $.interface_variable_declaration,
      // $.interface_file_declaration
    ),

    interface_signal_declaration: $ => seq(
      optional($.reserved_signal), $.identifier_list, $.delimiter_colon, optional($.mode),
      $.subtype_indication, optional($.reserved_bus),
      optional(seq($.delimiter_variable_assignment, $.expression))
    ),

    identifier_list: $ => repeat1($.identifier),

    mode: $ => choice(
      $.reserved_in,
      $.reserved_out,
      $.reserved_inout,
      $.reserved_buffer,
      $.reserved_linkage
    ),

    subtype_indication: $ => seq(
      optional($.resolution_indication),
      $.type_mark,
      // optional($.constraint)
    ),

    resolution_indication: $ => $.identifier,

    type_mark: $ => choice($.identifier, $.library_type),

    // constraint: $ => choice(
    //   $.range_constraint,
    //   $.array_constraint,
    //   $.record_constraint
    // ),

    expression: $ => choice( // TODO: Fix
      $.identifier,
      $.token_decimal_literal,
      $.token_decimal_literal_float,
      $.token_based_literal,
      $.token_based_literal_float,
      $.token_character_literal,
      $.token_string_literal,
      $.token_bit_string_literal
    ),

    // entity_declarative_part: $ => repeat($.entity_declarative_item),

    // entity_declarative_item: $ => choice(
    //   $.subprogram_declaration,
    //   $.subprogram_body,
    //   $.subprogram_instantiation_declaration,
    //   $.package_declaration,
    //   $.package_body,
    //   $.package_instantiation_declaration,
    //   $.type_declaration,
    //   $.subtype_declaration,
    //   $.constant_declaration,
    //   $.signal_declaration,
    //   $.shared_variable_declaration,
    //   $.file_declaration,
    //   $.alias_declaration,
    //   $.attribute_declaration,
    //   $.attribute_specification,
    //   $.disconnection_specification,
    //   $.use_clause,
    //   $.group_template_declaration,
    //   $.group_declaration,
    //   $.PSL_Property_Declaration,
    //   $.PSL_Sequence_Declaration,
    //   $.PSL_Clock_Declaration
    // ),

    entity_statement_part: $ => $.identifier, // TODO: Fix
    entity_statement: $ => $.identifier, // TODO: Fix

    simple_name: $ => $.identifier,
  }
});


