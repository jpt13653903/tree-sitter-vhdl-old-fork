module.exports = grammar({
  name: 'vhdl',

  externals: $ => [
    $.identifier,

    $.after,
    $.alias,
    $.all,
    $.architecture,
    $.array,
    $.assert,
    $.attribute,
    $.begin,
    $.block,
    $.buffer,
    $.bus,
    $.case,
    $.component,
    $.configuration,
    $.constant,
    $.context,
    $.default,
    $.disconnect,
    $.downto,
    $.else,
    $.elsif,
    $.end,
    $.entity,
    $.exit,
    $.file,
    $.for,
    $.force,
    $.function,
    $.generate,
    $.generic,
    $.group,
    $.guarded,
    $.if,
    $.impure,
    $.in,
    $.inertial,
    $.inout,
    $.is,
    $.label,
    $.library,
    $.linkage,
    $.literal,
    $.loop,
    $.map,
    $.new,
    $.next,
    $.null,
    $.of,
    $.on,
    $.open,
    $.others,
    $.out,
    $.package,
    $.parameter,
    $.port,
    $.postponed,
    $.procedure,
    $.process,
    $.property,
    $.protected,
    $.pure,
    $.range,
    $.record,
    $.register,
    $.reject,
    $.release,
    $.report,
    $.return,
    $.select,
    $.sequence,
    $.severity,
    $.shared,
    $.signal,
    $.subtype,
    $.then,
    $.transport,
    $.type,
    $.unaffected,
    $.units,
    $.until,
    $.use,
    $.variable,
    $.vunit,
    $.wait,
    $.when,
    $.while,
    $.with,

    $.attribute_function,
    $.attribute_pure_function,
    $.attribute_range,
    $.attribute_signal,
    $.attribute_subtype,
    $.attribute_type,
    $.attribute_value,

    $.builtin_function,
    $.builtin_type,

    $.operator_adding,
    $.operator_condition,
    $.operator_logical,
    $.operator_miscellaneous,
    $.operator_multiplying,
    $.operator_relational,
    $.operator_shift,
    $.operator_sign,

    $.error_sentinel
  ],

  extras: $ => [
    $.comment,
    $.tool_directive,
    /\s/,
  ],

  rules: {
    source_file: $ => $.entity_declaration,

    // VHDL-2008 section 3.2.1
    entity_declaration: $ => seq(
      $.entity, $.identifier, $.is,
      // optional($.formal_generic_clause),
      optional($.formal_port_clause),
      // $.entity_declarative_part,
      optional(seq(
        $.begin,
        $.entity_statement_part
      )),
      $.end, optional($.entity), optional($.entity_simple_name), ';'
    ),

    // formal_generic_clause: $ => seq($.generic, '(', $.generic_list ')' ';'),

    formal_port_clause: $ => seq($.port, '(', $.interface_list, ')', ';'),

    interface_list: $ => seq(
      $.interface_declaration,
      repeat(seq(';', $.interface_declaration))
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
      optional($.signal), $.identifier_list, ':', optional($.mode),
      $.subtype_indication, optional($.bus), optional(seq(':=', $.expression))
    ),

    identifier_list: $ => repeat1($.identifier),

    mode: $ => choice($.in, $.out, $.inout, $.buffer, $.linkage),

    subtype_indication: $ => seq(
      optional($.resolution_indication),
      $.type_mark,
      // optional($.constraint)
    ),

    resolution_indication: $ => $.identifier,

    type_mark: $ => choice($.identifier, $.builtin_type),

    // constraint: $ => choice(
    //   $.range_constraint,
    //   $.array_constraint,
    //   $.record_constraint
    // ),

    expression: $ => $.identifier, // TODO: Fix

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

    entity_simple_name: $ => $.identifier,

    comment: $ => token(choice(
      /--.*/,
      seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/')
    )),
    tool_directive: $ => token(/`.*/),
  }
});


