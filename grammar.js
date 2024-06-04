module.exports = grammar({
  name: 'vhdl',

  /* The external scanner tokenises ALL lexical elements (i.e. section 15 OF
   * the VHDL-2008 standard), which makes handling CASE insensitivity AND
   * multiple look-ahead easier.
   *
   * In addition TO the lexical elements, it also tokenises often-used
   * LIBRARY identifiers AND built-IN attributes.
   *
   * It also makes ALL searches binary, IN contrast TO parser.c that mostly
   * USE linear searches (probably because it has TO preserve priority).
   */
  externals: $ => [
    $.identifier,

    $.ABS,
    $.ACCESS,
    $.AFTER,
    $.ALIAS,
    $.ALL,
    $.AND,
    $.ARCHITECTURE,
    $.ARRAY,
    $.ASSERT,
    $.ASSUME,
    $.ATTRIBUTE,
    $.BEGIN,
    $.BLOCK,
    $.BODY,
    $.BUFFER,
    $.BUS,
    $.CASE,
    $.COMPONENT,
    $.CONFIGURATION,
    $.CONSTANT,
    $.CONTEXT,
    $.COVER,
    $.DEFAULT,
    $.DISCONNECT,
    $.DOWNTO,
    $.ELSE,
    $.ELSIF,
    $.END,
    $.ENTITY,
    $.EXIT,
    $.FAIRNESS,
    $.FILE,
    $.FOR,
    $.FORCE,
    $.FUNCTION,
    $.GENERATE,
    $.GENERIC,
    $.GROUP,
    $.GUARDED,
    $.IF,
    $.IMPURE,
    $.IN,
    $.INERTIAL,
    $.INOUT,
    $.IS,
    $.LABEL,
    $.LIBRARY,
    $.LINKAGE,
    $.LITERAL,
    $.LOOP,
    $.MAP,
    $.MOD,
    $.NAND,
    $.NEW,
    $.NEXT,
    $.NOR,
    $.NOT,
    $.NULL,
    $.OF,
    $.ON,
    $.OPEN,
    $.OR,
    $.OTHERS,
    $.OUT,
    $.PACKAGE,
    $.PARAMETER,
    $.PORT,
    $.POSTPONED,
    $.PROCEDURE,
    $.PROCESS,
    $.PROPERTY,
    $.PROTECTED,
    $.PRIVATE,
    $.PURE,
    $.RANGE,
    $.RECORD,
    $.REGISTER,
    $.REJECT,
    $.RELEASE,
    $.REM,
    $.REPORT,
    $.RESTRICT,
    $.RETURN,
    $.ROL,
    $.ROR,
    $.SELECT,
    $.SEQUENCE,
    $.SEVERITY,
    $.SIGNAL,
    $.SHARED,
    $.SLA,
    $.SLL,
    $.SRA,
    $.SRL,
    $.STRONG,
    $.SUBTYPE,
    $.THEN,
    $.TO,
    $.TRANSPORT,
    $.TYPE,
    $.UNAFFECTED,
    $.UNITS,
    $.UNTIL,
    $.USE,
    $.VARIABLE,
    $.VIEW,
    $.VPKG,
    $.VMODE,
    $.VPROP,
    $.VUNIT,
    $.WAIT,
    $.WHEN,
    $.WHILE,
    $.WITH,
    $.XNOR,
    $.XOR,

    $.reserved_end_marker, // Scanner internal USE only

    $.directive_body,
    $.directive_constant_builtin,
    $.directive_error,
    $.directive_newline,
    $.directive_protect,
    $.directive_warning,

    $.directive_end_marker, // Scanner internal USE only

    $.ampersand,
    $.tick,
    $.left_parenthesis,
    $.right_parenthesis,
    $.multiply,
    $.plus_sign,
    $.comma,
    $.minus_sign,
    $.dot,
    $.divide,
    $.colon,
    $.semicolon,
    $.less_than_sign,
    $.equals_sign,
    $.greater_than_sign,
    $.grave_accent,
    $.vertical_bar,
    $.left_square_bracket,
    $.right_square_bracket,
    $.question_mark,
    $.commercial_at,

    $.arrow,
    $.circumflex,
    $.exponentiate,
    $.variable_assignment,
    $.inequality,
    $.greater_than_or_equal,
    $.less_than_or_equal,
    $.signal_assignment,
    $.box,
    $.condition_conversion,
    $.matching_equality,
    $.matching_inequality,
    $.matching_less_than,
    $.matching_less_than_or_equal,
    $.matching_greater_than,
    $.matching_greater_than_or_equal,
    $.double_less_than,
    $.double_greater_than,

    $.delimiter_end_marker, // Scanner internal USE only

    $.decimal_literal,
    $.decimal_literal_float,
    $.based_literal,
    $.based_literal_float,
    $.character_literal,
    $.string_literal,
    $.bit_string_literal,
    $.comment,

    $.token_end_marker, // Scanner internal USE only

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

    $.error_sentinel,
  ],

  extras: $ => [
    $.comment,
    $.tool_directive
  ],

  rules: {
    design_file: $ => repeat1($.design_unit),

    entity_declaration: $ => seq(
      $.ENTITY, $.identifier, $.IS,
      // optional($.generic_clause),
      optional($.port_clause),
    //   $.entity_declarative_part,
    //   optional(seq(
    //     $.BEGIN,
    //     $.entity_statement_part
    //   )),
      $.END, optional($.ENTITY), optional($.simple_name), $.semicolon
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
    //   $.variable_declaration,
    //   $.file_declaration,
    //   $.alias_declaration,
    //   $.attribute_declaration,
    //   $.attribute_specification,
    //   $.disconnection_specification,
    //   $.use_clause,
    //   $.group_template_declaration,
    //   $.group_declaration,
    //   $.Property_Declaration,
    //   $.Sequence_Declaration,
    //   $.Clock_Declaration
    // ),

    // entity_statement_part: $ => repeat(entity_statement),

    // entity_statement: $ => choice(
    //   $.concurrent_assertion_statement,
    //   $.concurrent_procedure_call_statement,
    //   $.process_statement,
    //   $.PSL_Directive
    // ),

    // architecture_body: $ => seq(
    //   $.ARCHITECTURE, $.identifier, $.OF, $.name, $.IS,
    //     $.architecture_declarative_part,
    //   $.BEGIN,
    //     $.architecture_statement_part,
    //   $.END, optional($.ARCHITECTURE), optional($.simple_name)
    // ),

    // architecture_declarative_part: $ => repeat(
    //   $.block_declarative_item
    // ),

    // block_declarative_item: $ => choice(
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
    //   $.variable_declaration,
    //   $.file_declaration,
    //   $.alias_declaration,
    //   $.component_declaration,
    //   $.attribute_declaration,
    //   $.attribute_specification,
    //   $.configuration_specification,
    //   $.disconnection_specification,
    //   $.use_clause,
    //   $.group_template_declaration,
    //   $.group_declaration,
    //   $.Property_Declaration,
    //   $.Sequence_Declaration,
    //   $.Clock_Declaration
    // ),

    // architecture_statement_part: $ => repeat(
    //   $.concurrent_statement
    // ),

    // configuration_declaration: $ => seq(
    //   $.CONFIGURATION, $.identifier, $.OF, $.name, $.IS,
    //     $.configuration_declarative_part,
    //     repeat($.verification_unit_binding_indication, $.semicolon),
    //     $.block_configuration,
    //   $.END, optional($.CONFIGURATION), optional($.simple_name),
    //   $.semicolon
    // ),

    // configuration_declarative_part: $ => repeat(
    //   $.configuration_declarative_item
    // ),

    // configuration_declarative_item: $ => choice(
    //   $.use_clause,
    //   $.attribute_specification,
    //   $.group_declaration
    // ),

    // block_configuration: $ => seq(
    //   $.FOR, $.block_specification,
    //     repeat($.use_clause),
    //     repeat($.configuration_item),
    //   $.END, $.FOR, $.semicolon
    // ),

    // block_specification: $ => seq(
    //   $.name,
    //   optional(seq($.left_parenthesis, $.generate_specification, $.right_parenthesis))
    // ),

    // generate_specification: $ => choice(
    //   $.discrete_range
    //   $.expression
    //   $.identifier
    // ),

    // configuration_item: $ => choice(
    //   $.block_configuration,
    //   $.component_configuration
    // ),

    // component_configuration: $ => seq(
    //   $.FOR, $.component_specification,
    //     optional(seq($.binding_indication, $.semicolon)),
    //     repeat($.verification_unit_binding_indication, $.semicolon),
    //     optional($.block_configuration),
    //   $.END, $.FOR, $.semicolon
    // ),

    // subprogram_declaration: $ => seq(
    //   $.subprogram_specification, $.semicolon
    // ),

    // subprogram_specification: $ => choice(
    //   $.procedure_specification,
    //   $.function_specification
    // ),

    // procedure_specification: $ => seq(
    //   $.PROCEDURE, $.designator,
    //   optional(seq(
    //     $.GENERIC, $.left_parenthesis, $.generic_list, $.right_parenthesis,
    //     optional($.generic_map_aspect)
    //   )),
    //   optional(seq(
    //     optional($.PARAMETER),
    //     $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis
    //   ))
    // ),

    // function_specification: $ => seq(
    //   optional(choice($.PURE, $.IMPURE)), $.FUNCTION, $.designator,
    //   optional(
    //     $.GENERIC, $.left_parenthesis, $.generic_list, $.right_parenthesis,
    //     optional($.generic_map_aspect)
    //   ),
    //   optional(seq(
    //     optional($.PARAMETER),
    //     $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis
    //   )),
    //   $.RETURN, $.type_mark
    // ),

    // designator: $ => choice($.identifier, $.operator_symbol),

    // operator_symbol: $ => $.string_literal,

    // formal_parameter_list: $ => $.interface_list,

    // subprogram_body: $ => seq(
    //   $.subprogram_specification, $.IS,
    //     $.subprogram_declarative_part,
    //   $.BEGIN,
    //     $.subprogram_statement_part,
    //   $.END, optional(subprogram_kind), optional(designator), $.semicolon
    // ),

    // subprogram_declarative_part: $ => repeat(
    //   $.subprogram_declarative_item
    // ),

    // subprogram_declarative_item: $ => choice(
    //   $.subprogram_declaration,
    //   $.subprogram_body,
    //   $.subprogram_instantiation_declaration,
    //   $.package_declaration,
    //   $.package_body,
    //   $.package_instantiation_declaration,
    //   $.type_declaration,
    //   $.subtype_declaration,
    //   $.constant_declaration,
    //   $.variable_declaration,
    //   $.file_declaration,
    //   $.alias_declaration,
    //   $.attribute_declaration,
    //   $.attribute_specification,
    //   $.use_clause,
    //   $.group_template_declaration,
    //   $.group_declaration
    // ),

    // subprogram_statement_part: $ => repeat(
    //   $.sequential_statement
    // ),

    // subprogram_kind: $ => choice($.PROCEDURE, $.FUNCTION),

    // subprogram_instantiation_declaration: $ => seq(
    //   $.subprogram_kind, $.designator, $.IS, $.NEW, $.name,
    //   optional($.signature),
    //   optional($.generic_map_aspect), $.semicolon
    // ),

    // package_declaration: $ => seq(
    //   $.PACKAGE, $.identifier, $.IS,
    //   optional(seq(
    //     $.generic_clause,
    //     optional($.generic_map_aspect, $.semicolon)
    //   )),
    //   $.package_declarative_part,
    //   $.END, optional(PACKAGE), optional(simple_name), $.semicolon
    // ),

    // package_declarative_part: $ => repeat(
    //   $.package_declarative_item
    // ),

    // package_declarative_item: $ => choice(
    //   $.subprogram_declaration,
    //   $.subprogram_instantiation_declaration,
    //   $.package_declaration,
    //   $.package_instantiation_declaration,
    //   $.type_declaration,
    //   $.subtype_declaration,
    //   $.constant_declaration,
    //   $.signal_declaration,
    //   $.variable_declaration,
    //   $.file_declaration,
    //   $.alias_declaration,
    //   $.component_declaration,
    //   $.attribute_declaration,
    //   $.attribute_specification,
    //   $.disconnection_specification,
    //   $.use_clause,
    //   $.group_template_declaration,
    //   $.group_declaration,
    //   $.Property_Declaration,
    //   $.Sequence_Declaration
    // ),

    // package_body: $ => seq(
    //   $.PACKAGE, $.BODY, $.simple_name, $.IS,
    //     $.package_body_declarative_part,
    //   $.END, optional($.PACKAGE, $.BODY), optional($.simple_name, $.semicolon)
    // ),

    // package_body_declarative_part: $ => repeat(
    //   $.package_body_declarative_item
    // ),

    // package_body_declarative_item: $ => choice(
    //   $.subprogram_declaration,
    //   $.subprogram_body,
    //   $.subprogram_instantiation_declaration,
    //   $.package_declaration,
    //   $.package_body,
    //   $.package_instantiation_declaration,
    //   $.type_declaration,
    //   $.subtype_declaration,
    //   $.constant_declaration,
    //   $.variable_declaration,
    //   $.file_declaration,
    //   $.alias_declaration,
    //   $.attribute_declaration,
    //   $.attribute_specification,
    //   $.use_clause,
    //   $.group_template_declaration,
    //   $.group_declaration
    // ),

    // package_instantiation_declaration: $ => seq(
    //   $.PACKAGE, $.identifier, $.IS, $.NEW, $.name,
    //   optional($.generic_map_aspect), $.semicolon
    // ),

    // scalar_type_definition: $ => choice(
    //   $.enumeration_type_definition,
    //   $.integer_type_definition,
    //   $.floating_type_definition,
    //   $.physical_type_definition
    // ),

    // range_constraint: $ => $.RANGE $.range,

    // range: $ => choice(
    //   $.attribute_name,
    //   seq($.simple_expression, $.direction, $.simple_expression)
    // ),

    // direction: $ => choice($.TO, $.DOWNTO),

    // enumeration_type_definition: $ => seq(
    //   $.left_parenthesis, $.enumeration_literal,
    //   repeat($.comma, $.enumeration_literal) $.right_parenthesis,
    // ),

    enumeration_literal: $ => choice(
      $.identifier,
      $.character_literal
    ),

    // integer_type_definition: $ => $.range_constraint,

    // physical_type_definition: $ => seq(
    //   $.range_constraint,
    //   $.UNITS,
    //     $.primary_unit_declaration,
    //     repeat($.secondary_unit_declaration),
    //   $.END, $.UNITS, optional($.simple_name)
    // ),

    // primary_unit_declaration: $ => seq($.identifier, $.semicolon),

    // secondary_unit_declaration: $ => seq(
    //   $.identifier, $.equals_sign, $.physical_literal, $.semicolon
    // ),

    physical_literal: $ => prec(1, seq(
      optional($.abstract_literal), $.name
    )),

    // composite_type_definition: $ => choice(
    //   $.array_type_definition,
    //   $.record_type_definition
    // ),

    // array_type_definition: $ => choice(
    //   $.unbounded_array_definition,
    //   $.constrained_array_definition
    // ),

    // unbounded_array_definition: $ => seq(
    //   $.ARRAY, $.left_parenthesis, $.index_subtype_definition,
    //   repeat($.comma, $.index_subtype_definition), $.right_parenthesis,
    //   $.OF, $.subtype_indication
    // ),

    // constrained_array_definition: $ => seq(
    //   $.ARRAY, $.index_constraint, $.OF, $.subtype_indication
    // ),

    // index_subtype_definition: $ => seq($.type_mark, $.RANGE, $.box),

    // array_constraint: $ => choice(
    //   seq($.index_constraint, optional($.array_element_constraint)),
    //   seq($.left_parenthesis $.OPEN $.right_parenthesis,
    //       optional(array_element_constraint))
    // ),

    // array_element_constraint: $ => $.element_constraint,

    // index_constraint: $ => seq(
    //   $.left_parenthesis, $.discrete_range,
    //   repeat($.comma, $.discrete_range), $.right_parenthesis
    // ),

    // discrete_range: $ => choice(
    //   $.discrete_subtype_indication,
    //   $.range
    // ),

    // record_type_definition: $ => seq(
    //   $.RECORD,
    //   $.element_declaration,
    //   repeat($.element_declaration),
    //   $.END, $.RECORD, optional($.simple_name)
    // ),

    // element_declaration: $ => seq(
    //   $.identifier_list, $.colon, $.element_subtype_definition, $.semicolon
    // ),

    identifier_list: $ => seq(
      $.identifier, repeat(seq($.comma, $.identifier))
    ),

    // element_subtype_definition: $ => $.subtype_indication,

    // record_constraint: $ => seq(
    //   $.left_parenthesis, $.record_element_constraint,
    //   repeat($.comma, $.record_element_constraint), $.right_parenthesis
    // ),

    // record_element_constraint: $ => seq(
    //   $.simple_name, $.element_constraint
    // ),

    // access_type_definition: $ => seq($.ACCESS, $.subtype_indication),

    // incomplete_type_declaration: $ => seq($.TYPE, $.identifier, $.semicolon),

    // file_type_definition: $ => seq($.FILE, $.OF, $.type_mark),

    // protected_type_definition: $ => choice(
    //   $.protected_type_declaration,
    //   $.protected_type_body
    // ),

    // protected_type_declaration: $ => seq(
    //   $.PROTECTED,
    //   $.protected_type_declarative_part,
    //   $.END, $.PROTECTED, optional($.simple_name)
    // ),

    // protected_type_declarative_part: $ => repeat(
    //   $.protected_type_declarative_item
    // ),

    // protected_type_declarative_item: $ => choice(
    //   $.subprogram_declaration,
    //   $.subprogram_instantiation_declaration,
    //   $.attribute_specification,
    //   $.use_clause
    // ),

    // protected_type_body: $ => seq(
    //   $.PROTECTED, $.BODY,
    //   $.protected_type_body_declarative_part
    //   $.END, $.PROTECTED, $.BODY, optional($.simple_name)
    // ),

    // protected_type_body_declarative_part: $ => repeat(
    //   $.protected_type_body_declarative_item
    // ),

    // protected_type_body_declarative_item: $ => choice(
    //   $.subprogram_declaration,
    //   $.subprogram_body,
    //   $.subprogram_instantiation_declaration,
    //   $.package_declaration,
    //   $.package_body,
    //   $.package_instantiation_declaration,
    //   $.type_declaration,
    //   $.subtype_declaration,
    //   $.constant_declaration,
    //   $.variable_declaration,
    //   $.file_declaration,
    //   $.alias_declaration,
    //   $.attribute_declaration,
    //   $.attribute_specification,
    //   $.use_clause,
    //   $.group_template_declaration,
    //   $.group_declaration
    // ),

    // type_declaration: $ => choice(
    //   $.full_type_declaration,
    //   $.incomplete_type_declaration
    // ),

    // full_type_declaration: $ => seq(
    //   $.TYPE, $.identifier, $.IS, $.type_definition, $.semicolon
    // ),

    // type_definition: $ => choice(
    //   $.scalar_type_definition,
    //   $.composite_type_definition,
    //   $.access_type_definition,
    //   $.file_type_definition,
    //   $.protected_type_definition
    // ),

    // subtype_declaration: $ => seq(
    //   $.SUBTYPE, $.identifier, $.IS, $.subtype_indication, $.semicolon
    // ),

    subtype_indication: $ => seq(
      // optional($.resolution_indication),
      $.type_mark,
      // optional($.constraint)
    ),

    // resolution_indication: $ => choice(
    //   $.name,
    //   seq($.left_parenthesis, $.element_resolution, $.right_parenthesis)
    // ),

    // element_resolution: $ => choice(
    //   $.array_element_resolution,
    //   $.record_resolution
    // ),

    // array_element_resolution: $ => $.resolution_indication,

    // record_resolution: $ => seq(
    //   $.record_element_resolution,
    //   repeat($.comma, $.record_element_resolution)
    // ),

    // record_element_resolution: $ => seq(
    //   $.simple_name, $.resolution_indication
    // ),

    type_mark: $ => $.name,

    // constraint: $ => choice(
    //   $.range_constraint,
    //   $.array_constraint,
    //   $.record_constraint
    // ),

    // element_constraint: $ => choice(
    //   $.array_constraint,
    //   $.record_constraint
    // ),

    // object_declaration: $ => choice(
    //   $.constant_declaration,
    //   $.signal_declaration,
    //   $.variable_declaration,
    //   $.file_declaration
    // ),

    // constant_declaration: $ => seq(
    //   $.CONSTANT, $.identifier_list, $.colon, $.subtype_indication,
    //   optional($.variable_assignment, $.expression) $.semicolon
    // ),

    // signal_declaration: $ => seq(
    //   $.SIGNAL, $.identifier_list, $.colon, $.subtype_indication,
    //   optional(signal_kind),
    //   optional($.variable_assignment, $.expression) $.semicolon
    // ),

    // signal_kind: $ => choice($.REGISTER | $.BUS),

    // variable_declaration: $ => seq(
    //   optional($.SHARED),
    //   $.VARIABLE, $.identifier_list, $.colon, $.subtype_indication,
    //   optional($.variable_assignment, $.expression) $.semicolon
    // ),

    // file_declaration: $ => seq(
    //   $.FILE, $.identifier_list, $.colon, $.subtype_indication,
    //   optional($.file_open_information), $.semicolon
    // ),

    // file_open_information: $ => seq(
    //   optional($.OPEN, $.file_open_kind_expression), $.IS, $.file_logical_name
    // ),

    // file_logical_name: $ => $.expression,

    interface_declaration: $ => choice(
      $.interface_object_declaration,
      // $.interface_type_declaration,
      // $.interface_subprogram_declaration,
      // $.interface_package_declaration
    ),

    interface_object_declaration: $ => choice(
    //   $.interface_constant_declaration,
      $.interface_signal_declaration,
    //   $.interface_variable_declaration,
    //   $.interface_file_declaration
    ),

    // interface_constant_declaration: $ => seq(
    //   optional($.CONSTANT), $.identifier_list, $.colon,
    //   optional($.IN), $.subtype_indication,
    //   optional($.variable_assignment, $.expression)
    // ),

    interface_signal_declaration: $ => seq(
      optional($.SIGNAL), $.identifier_list, $.colon,
      optional($.mode), $.subtype_indication, optional($.BUS),
      optional(seq($.variable_assignment, $.expression))
    ),

    // interface_variable_declaration: $ => seq(
    //   optional($.VARIABLE), $.identifier_list, $.colon,
    //   optional(mode), $.subtype_indication,
    //   optional($.variable_assignment, $.expression)
    // ),

    // interface_file_declaration: $ => seq(
    //   $.FILE, $.identifier_list, $.colon, $.subtype_indication
    // ),

    mode: $ => choice(
      $.IN, $.OUT, $.INOUT, $.BUFFER, $.LINKAGE
    ),

    // interface_type_declaration: $ => $.interface_incomplete_type_declaration,

    // interface_incomplete_type_declaration: $ => seq($.TYPE, $.identifier),

    // interface_subprogram_declaration: $ => seq(
    //   $.interface_subprogram_specification,
    //   optional($.IS, $.interface_subprogram_default)
    // ),

    // interface_subprogram_specification: $ => choice(
    //   $.interface_procedure_specification,
    //   $.interface_function_specification
    // ),

    // interface_procedure_specification: $ => seq(
    //   $.PROCEDURE, $.designator,
    //   optional(seq(optional($.PARAMETER),
    //     $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis
    //   ))
    // ),

    // interface_function_specification: $ => seq(
    //   optional(choice($.PURE, $.IMPURE)), $.FUNCTION, $.designator,
    //   optional(seq(optional($.PARAMETER),
    //     $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis
    //   )), $.RETURN, $.type_mark
    // ),

    // interface_subprogram_default: $ => choice($.name, $.box),

    // interface_package_declaration: $ => seq(
    //   $.PACKAGE, $.identifier, $.IS, $.NEW, $.name,
    //   $.interface_package_generic_map_aspect
    // ),

    // interface_package_generic_map_aspect: $ => choice(
    //   $.generic_map_aspect,
    //   seq($.GENERIC, $.MAP, $.left_parenthesis $.box $.right_parenthesis),
    //   seq($.GENERIC, $.MAP, $.left_parenthesis $.DEFAULT $.right_parenthesis)
    // ),

    interface_list: $ => seq(
      $.interface_element, repeat(seq($.semicolon, $.interface_element))
    ),

    interface_element: $ => $.interface_declaration,

    // generic_clause: $ => seq(
    //   $.GENERIC, $.left_parenthesis, $.generic_list, $.right_parenthesis, $.semicolon
    // ),

    // generic_list: $ => $.interface_list,

    port_clause: $ => seq(
      $.PORT, $.left_parenthesis, $.port_list, $.right_parenthesis, $.semicolon
    ),

    port_list: $ => $.interface_list,

    // association_list: $ => seq(
    //   $.association_element, repeat($.comma, $.association_element)
    // ),

    // association_element: $ => seq(
    //   optional($.formal_part, $.arrow), $.actual_part
    // ),

    // formal_part: $ => choice(
    //   $.formal_designator,
    //   seq($.name,       $.left_parenthesis, $.formal_designator, $.right_parenthesis),
    //   seq($.type_mark,  $.left_parenthesis, $.formal_designator, $.right_parenthesis)
    // ),

    // formal_designator: $ => $.name,

    // actual_part: $ => choice(
    //   $.actual_designator,
    //   seq($.name,       $.left_parenthesis, $.actual_designator, $.right_parenthesis),
    //   seq($.type_mark,  $.left_parenthesis, $.actual_designator, $.right_parenthesis)
    // ),

    // actual_designator: $ => choice(
    //   seq(optional($.INERTIAL), $.expression),
    //   $.identifier,
    //   $.subtype_indication,
    //   $.OPEN
    // ),

    // generic_map_aspect: $ => seq(
    //   $.GENERIC, $.MAP,
    //   $.left_parenthesis, $.generic_association_list, $.right_parenthesis
    // ),

    // port_map_aspect: $ => seq(
    //   $.PORT, $.MAP,
    //   $.left_parenthesis, $.port_association_list, $.right_parenthesis
    // ),

    // alias_declaration: $ => seq(
    //   $.ALIAS, $.alias_designator,
    //   optional($.colon, $.subtype_indication), $.IS, $.name
    //   optional($.signature) $.semicolon
    // ),

    // alias_designator: $ => choice(
    //   $.identifier, $.character_literal, $.operator_symbol
    // ),

    // attribute_declaration: $ => seq(
    //   $.ATTRIBUTE, $.identifier, $.colon, $.type_mark, $.semicolon
    // ),

    // component_declaration: $ => seq(
    //   $.COMPONENT, $.identifier, optional($.IS),
    //   optional($.local_generic_clause),
    //   optional($.local_port_clause),
    //   $.END. $.COMPONENT, optional($.simple_name) $.semicolon
    // ),

    // group_template_declaration: $ => seq(
    //   $.GROUP, $.identifier, $.IS,
    //   $.left_parenthesis, $.entity_class_entry_list, $.right_parenthesis, $.semicolon
    // ),

    // entity_class_entry_list: $ => seq(
    //   $.entity_class_entry, repeat($.comma, $.entity_class_entry)
    // ),

    // entity_class_entry: $ => seq(
    //   $.entity_class, optional($.box)
    // ),

    // group_declaration: $ => seq(
    //   $.GROUP, $.identifier, $.colon, $.name,
    //   $.left_parenthesis, $.group_constituent_list, $.right_parenthesis, $.semicolon
    // ),

    // group_constituent_list: $ => seq(
    //   $.group_constituent, repeat($.comma, $.group_constituent)
    // ),

    // group_constituent: $ => choice($.name, $.character_literal),

    // attribute_specification: $ => seq(
    //   $.ATTRIBUTE, $.attribute_designator, $.OF, $.entity_specification, $.IS,
    //   $.expression, $.semicolon
    // ),

    // entity_specification: $ => seq(
    //   $.entity_name_list, $.colon, $.entity_class
    // ),

    // entity_class: $ => choice(
    //   $.ENTITY,
    //   $.ARCHITECTURE,
    //   $.CONFIGURATION,
    //   $.PROCEDURE,
    //   $.FUNCTION,
    //   $.PACKAGE,
    //   $.TYPE,
    //   $.SUBTYPE,
    //   $.CONSTANT,
    //   $.SIGNAL,
    //   $.VARIABLE,
    //   $.COMPONENT,
    //   $.LABEL,
    //   $.LITERAL,
    //   $.UNITS,
    //   $.GROUP,
    //   $.FILE,
    //   $.PROPERTY,
    //   $.SEQUENCE
    // ),

    // entity_name_list: $ => choice(
    //   seq($.entity_designator, repeat($.comma, $.entity_designator)),
    //   $.OTHERS,
    //   $.ALL
    // ),

    // entity_designator: $ => seq(
    //   $.entity_tag, optional($.signature)
    // ),

    // entity_tag: $ => choice(
    //   $.simple_name,
    //   $.character_literal,
    //   $.operator_symbol
    // ),

    // configuration_specification: $ => choice(
    //   $.simple_configuration_specification,
    //   $.compound_configuration_specification
    // ),

    // simple_configuration_specification: $ => seq(
    //   $.FOR, $.component_specification, $.binding_indication, $.semicolon,
    //   optional($.END, $.FOR, $.semicolon),
    // ),

    // compound_configuration_specification: $ => seq(
    //   $.FOR, $.component_specification, $.binding_indication, $.semicolon,
    //   $.verification_unit_binding_indication, $.semicolon,
    //   repeat($.verification_unit_binding_indication, $.semicolon),
    //   $.END, $.FOR, $.semicolon
    // ),

    // component_specification: $ => seq(
    //   $.instantiation_list, $.colon, $.name
    // ),

    // instantiation_list: $ => choice(
    //   seq($.identifier, repeat($.comma, $.identifier)),
    //   $.OTHERS,
    //   $.ALL
    // ),

    // binding_indication: $ => seq(
    //   optional($.USE, $.entity_aspect),
    //   optional($.generic_map_aspect),
    //   optional($.port_map_aspect)
    // ),

    // entity_aspect: $ => choice(
    //   seq($.ENTITY, $.name, optional(seq(
    //     $.left_parenthesis, $.identifier $.right_parenthesis))),
    //   seq($.CONFIGURATION, $.name),
    //   $.OPEN
    // ),

    // verification_unit_binding_indication: $ => seq(
    //   $.USE, $.VUNIT, $.verification_unit_list,
    // ),

    // verification_unit_list: $ => seq(
    //   $.name, repeat($.comma, $.name)
    // ),

    // disconnection_specification: $ => seq(
    //   $.DISCONNECT, $.guarded_signal_specification,
    //   $.AFTER, $.time_expression, $.semicolon
    // ),

    // guarded_signal_specification: $ => seq(
    //   $.guarded_signal_list, $.colon, $.type_mark
    // ),

    // signal_list: $ => seq(
    //   seq($.name, repeat($.comma, $.name)),
    //   $.OTHERS,
    //   $.ALL
    // ),

    name: $ => choice(
      $.simple_name,
      // $.operator_symbol,
      // $.character_literal,
      // $.selected_name,
      // $.indexed_name,
      // $.slice_name,
      // $.attribute_name,
      // $.external_name
    ),

    // prefix: $ => choice($.name, $.function_call),

    simple_name: $ => prec(1, $.identifier),

    // selected_name: $ => seq($.prefix, $.dot, $.suffix),

    // suffix: $ => choice(
    //   $.simple_name,
    //   $.character_literal,
    //   $.operator_symbol,
    //   $.ALL
    // ),

    // indexed_name: $ => seq(
    //   $.prefix, $.left_parenthesis, $.expression,
    //   repeat($.comma, $.expression), $.right_parenthesis
    // ),

    // slice_name: $ => seq(
    //   $.prefix, $.left_parenthesis, $.discrete_range, $.right_parenthesis
    // ),

    // attribute_name: $ => seq(
    //   $.prefix, optional($.signature), $.tick, $.attribute_designator,
    //   optional($.left_parenthesis, $.expression, $.right_parenthesis),
    // ),

    // $.attribute_designator: $ => $.simple_name,

    // external_name: $ => choice(
    //   $.external_constant_name,
    //   $.external_signal_name,
    //   $.external_variable_name
    // ),

    // external_constant_name: $ => seq(
    //   $.double_less_than, $.CONSTANT, $.external_pathname, $.colon,
    //   $.subtype_indication, $.double_greater_than
    // ),

    // external_signal_name: $ => seq(
    //   $.double_less_than, $.SIGNAL, $.external_pathname, $.colon,
    //   $.subtype_indication, $.double_greater_than
    // ),

    // external_variable_name: $ => seq(
    //   $.double_less_than, $.VARIABLE, $.external_pathname, $.colon,
    //   $.subtype_indication, $.double_greater_than
    // ),

    // external_pathname: $ => choice(
    //   $.package_pathname,
    //   $.absolute_pathname,
    //   $.relative_pathname
    // ),

    // package_pathname: $ => seq(
    //   $.commercial_at, $.logical_name, $.dot, $.simple_name,
    //   repeat1($.dot, $.simple_name)
    // ),

    // absolute_pathname: $ => seq(
    //   $.dot, $.partial_pathname
    // ),

    // relative_pathname: $ => seq(
    //   repeat($.circumflex, $.dot), $.partial_pathname
    // ),

    // partial_pathname: $ => seq(
    //   repeat($.pathname_element, $.dot), $.simple_name
    // ),

    // pathname_element: $ => seq(
    //   $.identifier,
    //   optional(seq($.left_parenthesis, $.expression, $.right_parenthesis))
    // ),

    expression: $ => choice(
      seq($.condition_operator, $.primary),
      $.logical_expression
    ),

    logical_expression: $ => choice(
      seq($.relation, repeat(  seq($.AND,  $.relation))),
      seq($.relation, repeat(  seq($.OR,   $.relation))),
      seq($.relation, repeat(  seq($.XOR,  $.relation))),
      seq($.relation, optional(seq($.NAND, $.relation))),
      seq($.relation, optional(seq($.NOR,  $.relation))),
      seq($.relation, repeat(  seq($.XNOR, $.relation)))
    ),

    relation: $ => seq(
      $.shift_expression, optional(seq($.relational_operator, $.shift_expression))
    ),

    shift_expression: $ => seq(
      $.simple_expression, optional(seq($.shift_operator, $.simple_expression))
    ),

    simple_expression: $ => seq(
      optional($.sign), $.term, repeat(seq($.adding_operator, $.term))
    ),

    term: $ => seq(
      $.factor, repeat(seq($.multiplying_operator, $.factor))
    ),

    factor: $ => choice(
      seq($.primary, optional(seq($.exponentiate, $.primary))),
      seq($.ABS, $.primary),
      seq($.NOT, $.primary),
      seq($.logical_operator, $.primary)
    ),

    primary: $ => choice(
      $.name,
      $.literal,
      // $.aggregate,
      // $.function_call,
      // $.qualified_expression,
      // $.type_conversion,
      // $.allocator,
      seq($.left_parenthesis, $.expression, $.right_parenthesis)
    ),

    condition_operator: $ => $.condition_conversion,

    relational_operator: $ => choice(
      $.equals_sign,
      $.inequality,
      $.less_than_sign,
      $.less_than_or_equal,
      $.greater_than_sign,
      $.greater_than_or_equal,
      $.matching_equality,
      $.matching_inequality,
      $.matching_less_than,
      $.matching_less_than_or_equal,
      $.matching_greater_than,
      $.matching_greater_than_or_equal
    ),

    shift_operator:         $ => choice($.SLL, $.SRL, $.SLA, $.SRA, $.ROL, $.ROR),
    adding_operator:        $ => choice($.plus_sign, $.minus_sign, $.ampersand),
    sign:                   $ => choice($.plus_sign, $.minus_sign),
    multiplying_operator:   $ => choice($.multiply, $.divide, $.MOD, $.REM),
    logical_operator:       $ => choice($.AND, $.OR, $.NAND, $.NOR, $.XOR, $.XNOR),
    // miscellaneous_operator: $ => choice($.exponentiate, $.ABS, $.NOT),

    literal: $ => choice(
      $.numeric_literal,
      $.enumeration_literal,
      $.string_literal,
      $.bit_string_literal,
      $.NULL
    ),

    numeric_literal: $ => choice(
      $.abstract_literal,
      $.physical_literal
    ),

    abstract_literal: $ => choice(
      $.decimal_literal,
      $.decimal_literal_float,
      $.based_literal,
      $.based_literal_float
    ),

    // aggregate: $ => seq(
    //   $.left_parenthesis, $.element_association,
    //   repeat($.comma, $.element_association), $.right_parenthesis
    // ),

    // element_association: $ => seq(
    //   optional($.choices, $.arrow), $.expression
    // ),

    // choices: $ => seq(
    //   $.choice, repeat($.vertical_bar, $.choice)
    // ),

    // choice: $ => choice(
    //   $.expression,
    //   $.discrete_range,
    //   $.simple_name,
    //   $.OTHERS
    // ),

    // function_call: $ => seq(
    //   $.function_name,
    //   optional($.left_parenthesis, $.actual_parameter_part, $.right_parenthesis)
    // ),

    // actual_parameter_part: $ => $.association_list,

    // qualified_expression: $ => choice(
    //   seq($.type_mark, $.tick, $.left_parenthesis, $.expression, $.right_parenthesis),
    //   seq($.type_mark, $.tick, $.aggregate)
    // ),

    // type_conversion: $ => seq(
    //   $.type_mark, $.left_parenthesis, $.expression, $.right_parenthesis
    // ),

    // allocator: $ => choice(
    //   seq($.NEW, $.subtype_indication),
    //   seq($.NEW, $.qualified_expression)
    // ),

    // sequence_of_statements: $ => repeat($.sequential_statement),

    // sequential_statement: $ => choice(
    //   $.wait_statement,
    //   $.assertion_statement,
    //   $.report_statement,
    //   $.signal_assignment_statement,
    //   $.variable_assignment_statement,
    //   $.procedure_call_statement,
    //   $.if_statement,
    //   $.case_statement,
    //   $.loop_statement,
    //   $.next_statement,
    //   $.exit_statement,
    //   $.return_statement,
    //   $.null_statement
    // ),

    // wait_statement: $ => seq(
    //   optional($.label_spec), $.WAIT,
    //   optional($.sensitivity_clause), optional($.condition_clause),
    //   optional($.timeout_clause), $.semicolon
    // ),

    // sensitivity_clause: $ => seq(
    //   $.ON, $.sensitivity_list
    // ),

    // sensitivity_list: $ => seq(
    //   $.name, repeat($.comma, $.name)
    // ),

    // condition_clause: $ => seq(
    //   $.UNTIL, $.condition
    // ),

    // condition: $ => $.expression,

    // timeout_clause: $ => seq(
    //   $.FOR, $.expression
    // ),

    // assertion_statement: $ => seq(
    //   optional($.label_spec), $.assertion, $.semicolon
    // ),

    // assertion: $ => seq(
    //   $.ASSERT, $.condition,
    //   optional($.REPORT, $.expression),
    //   optional($.SEVERITY, $.expression)
    // ),

    // report_statement: $ => seq(
    //   optional($.label_spec),
    //   $.REPORT, $.expression,
    //   optional($.SEVERITY, $.expression), $.semicolon
    // ),


    // signal_assignment_statement: $ => seq(
    //   optional($.label_spec),
    //   choice(
    //     $.simple_signal_assignment,
    //     $.conditional_signal_assignment,
    //     $.selected_signal_assignment
    //   )
    // ),

    // simple_signal_assignment: $ => choice(
    //   $.simple_waveform_assignment,
    //   $.simple_force_assignment,
    //   $.simple_release_assignment
    // ),

    // simple_waveform_assignment: $ => seq(
    //   $.target, $.signal_assignment,
    //   optional($.delay_mechanism), $.waveform, $.semicolon
    // ),

    // simple_force_assignment: $ => seq(
    //   $.target, $.signal_assignment, $.FORCE,
    //   optional($.force_mode), $.expression, $.semicolon
    // ),

    // simple_release_assignment: $ => seq(
    //   $.target, $.signal_assignment, $.RELEASE,
    //   optional($.force_mode), $.semicolon
    // ),

    // force_mode: $ => choice($.IN, $.OUT),

    // delay_mechanism: $ => choice(
    //   $.TRANSPORT,
    //   seq(optional($.REJECT, $.expression), $.INERTIAL)
    // ),

    // target: $ => choice($.name, $.aggregate),

    // waveform: $ => choice(
    //   seq($.waveform_element, repeat($.comma, $.waveform_element)),
    //   $.UNAFFECTED
    // ),

    // waveform_element: $ => choice(
    //   seq($.value_expression, optional($.AFTER, $.time_expression)),
    //   seq($.NULL, optional($.AFTER, $.time_expression))
    // ),

    // conditional_signal_assignment: $ => choice(
    //   $.conditional_waveform_assignment,
    //   $.conditional_force_assignment
    // ),

    // conditional_waveform_assignment: $ => seq(
    //   $.target, $.signal_assignment,
    //   optional($.delay_mechanism), $.conditional_waveforms, $.semicolon
    // ),

    // conditional_waveforms: $ => seq(
    //   $.waveform, $.WHEN, $.condition,
    //   repeat($.ELSE, $.waveform, $.WHEN, $.condition),
    //   optional($.ELSE, $.waveform)
    // ),

    // conditional_force_assignment: $ => seq(
    //   $.target, $.signal_assignment, $.FORCE,
    //   optional($.force_mode), $.conditional_expressions, $.semicolon
    // ),

    // conditional_expressions: $ => seq(
    //   $.expression, $.WHEN, $.condition,
    //   repeat($.ELSE, $.expression, $.WHEN, $.condition),
    //   optional($.ELSE, $.expression)
    // ),

    // selected_signal_assignment: $ => choice(
    //   $.selected_waveform_assignment,
    //   $.selected_force_assignment
    // ),

    // selected_waveform_assignment: $ => seq(
    //   $.WITH, $.expression, $.SELECT, optional($.question_mark),
    //   $.target, $.signal_assignment, optional($.delay_mechanism),
    //   $.selected_waveforms, $.semicolon
    // ),

    // selected_waveforms: $ => seq(
    //   repeat($.waveform, $.WHEN, $.choices, $.comma),
    //   $.waveform, $.WHEN, $.choices
    // ),

    // selected_force_assignment: $ => seq(
    //   $.WITH, $.expression, $.SELECT, optional($.question_mark),
    //   $.target, $.signal_assignment, $.FORCE,
    //   optional($.force_mode), $.selected_expressions, $.semicolon
    // ),

    // selected_expressions: $ => seq(
    //   repeat($.expression, $.WHEN, $.choices, $.comma),
    //   $.expression, $.WHEN, $.choices
    // ),

    // variable_assignment_statement: $ => seq(
    //   optional($.label_spec),
    //   choice(
    //     $.simple_variable_assignment,
    //     $.conditional_variable_assignment,
    //     $.selected_variable_assignment
    //   )
    // ),

    // simple_variable_assignment: $ => seq(
    //   $.target, $.variable_assignment, $.expression, $.semicolon
    // ),

    // conditional_variable_assignment: $ => seq(
    //   $.target, $.variable_assignment, $.conditional_expressions, $.semicolon
    // ),

    // selected_variable_assignment: $ => seq(
    //   $.WITH, $.expression, $.SELECT, optional($.question_mark),
    //   $.target, $.variable_assignment, $.selected_expressions, $.semicolon
    // ),

    // procedure_call_statement: $ => seq(
    //   optional($.label_spec), $.procedure_call, $.semicolon
    // ),

    // procedure_call: $ => seq(
    //   $.procedure_name,
    //   optional($.left_parenthesis, $.actual_parameter_part $.right_parenthesis)
    // ),

    // if_statement: $ => seq(
    //   optional($.label_spec),
    //   $.IF, $.condition, $.THEN,
    //     $.sequence_of_statements,
    //   repeat($.ELSIF, $.condition, $.THEN
    //     $.sequence_of_statements),
    //   optional($.ELSE,
    //     $.sequence_of_statements),
    //   $.END, $.IF, optional($.identifier), $.semicolon
    // ),

    // case_statement: $ => seq(
    //   optional($.label_spec),
    //   $.CASE, optional($.question_mark), $.expression, $.IS,
    //     repeat1($.case_statement_alternative),
    //   $.END, $.CASE, optional($.question_mark), optional($.identifier), $.semicolon
    // ),

    // case_statement_alternative: $ => seq(
    //   $.WHEN, $.choices, $.arrow,
    //   $.sequence_of_statements
    // ),

    // loop_statement: $ => seq(
    //   optional($.label_spec),
    //   optional($.iteration_scheme), $.LOOP,
    //   $.sequence_of_statements,
    //   $.END, $.LOOP, optional($.identifier), $.semicolon
    // ),

    // iteration_scheme: $ => choice(
    //   seq($.WHILE, $.condition),
    //   seq($.FOR, $.loop_parameter_specification)
    // ),

    // parameter_specification: $ => seq(
    //   $.identifier, $.IN, $.discrete_range
    // ),

    // next_statement: $ => seq(
    //   optional($.label_spec),
    //   $.NEXT, optional($.identifier), optional($.WHEN, $.condition), $.semicolon
    // ),

    // exit_statement: $ => seq(
    //   optional($.label_spec),
    //   $.EXIT, optional($.identifier), optional($.WHEN, $.condition), $.semicolon
    // ),

    // return_statement: $ => seq(
    //   optional($.label_spec),
    //   $.RETURN, optional($.expression), $.semicolon
    // ),

    // null_statement: $ => seq(
    //   optional($.label_spec),
    //   $.NULL, $.semicolon
    // ),

    // concurrent_statement: $ => choice(
    //   $.block_statement,
    //   $.process_statement,
    //   $.concurrent_procedure_call_statement,
    //   $.concurrent_assertion_statement,
    //   $.concurrent_signal_assignment_statement,
    //   $.component_instantiation_statement,
    //   $.generate_statement,
    //   $.PSL_Directive
    // ),

    // block_statement: $ => seq(
    //   $.label_spec,
    //   $.BLOCK,
    //   optional($.left_parenthesis, $.guard_condition, $.right_parenthesis),
    //   optional($.IS),
    //   $.block_header,
    //   $.block_declarative_part,
    //   $.BEGIN,
    //   $.block_statement_part,
    //   $.END, $.BLOCK, optional($.identifier), $.semicolon
    // ),

    // block_header: $ => seq(
    //   optional($.generic_clause, optional($.generic_map_aspect, $.semicolon)),
    //   optional($.port_clause,    optional($.port_map_aspect,    $.semicolon))
    // ),

    // block_declarative_part: $ => repeat($.block_declarative_item),

    // block_statement_part: $ => repeat($.concurrent_statement),

    // process_statement: $ => seq(
    //   optional($.label_spec),
    //   optional($.POSTPONED), $.PROCESS,
    //   optional($.left_parenthesis, $.process_sensitivity_list, $.right_parenthesis),
    //   optional($.IS),
    //   $.process_declarative_part,
    //   $.BEGIN,
    //   $.process_statement_part,
    //   $.END, optional($.POSTPONED), $.PROCESS, optional($.identifier), $.semicolon
    // ),

    // process_sensitivity_list: $ => choice($.ALL, $.sensitivity_list),

    // process_declarative_part: $ => repeat($.process_declarative_item),

    // process_declarative_item: $ => choice(
    //   $.subprogram_declaration,
    //   $.subprogram_body,
    //   $.subprogram_instantiation_declaration,
    //   $.package_declaration,
    //   $.package_body,
    //   seq($.PACKAGE, $.instantiation_declaration),
    //   $.type_declaration,
    //   $.subtype_declaration,
    //   $.constant_declaration,
    //   $.variable_declaration,
    //   $.file_declaration,
    //   $.alias_declaration,
    //   $.attribute_declaration,
    //   $.attribute_specification,
    //   $.use_clause,
    //   $.group_template_declaration,
    //   $.group_declaration
    // ),

    // process_statement_part: $ => repeat($.sequential_statement),

    // concurrent_procedure_call_statement: $ => seq(
    //   optional($.label_spec),
    //   optional($.POSTPONED), $.procedure_call, $.semicolon
    // ),

    // concurrent_assertion_statement: $ => seq(
    //   optional($.label_spec),
    //   optional($.POSTPONED), $.assertion, $.semicolon
    // ),

    // concurrent_signal_assignment_statement: $ => seq(
    //   optional($.label_spec), optional($.POSTPONED), choice(
    //     $.concurrent_simple_signal_assignment,
    //     $.concurrent_conditional_signal_assignment,
    //     $.concurrent_selected_signal_assignment
    //   )
    // ),

    // concurrent_simple_signal_assignment: $ => seq(
    //   $.target, $.signal_assignment, optional($.GUARDED),
    //   optional($.delay_mechanism), $.waveform, $.semicolon
    // ),

    // concurrent_conditional_signal_assignment: $ => seq(
    //   $.target, $.signal_assignment, optional($.GUARDED),
    //   optional($.delay_mechanism), $.conditional_waveforms, $.semicolon
    // ),

    // concurrent_selected_signal_assignment: $ => seq(
    //   $.WITH, $.expression, $.SELECT, optional($.question_mark),
    //   $.target, $.signal_assignment, optional($.GUARDED),
    //   optional($.delay_mechanism), $.selected_waveforms, $.semicolon
    // ),

    // component_instantiation_statement: $ => seq(
    //   $.label_spec, $.instantiated_unit,
    //   optional($.generic_map_aspect),
    //   optional($.port_map_aspect), $.semicolon
    // ),

    // instantiated_unit: $ => choice(
    //   seq(optional($.COMPONENT), $.name),
    //   seq($.ENTITY, $.name,
    //       optional($.left_parenthesis, $.identifier, $.right_parenthesis)),
    //   seq($.CONFIGURATION, $.name)
    // ),

    // generate_statement: $ => choice(
    //   $.for_generate_statement,
    //   $.if_generate_statement,
    //   $.case_generate_statement
    // ),

    // for_generate_statement: $ => seq(
    //   $.label_spec,
    //   $.FOR, $.generate_parameter_specification, $.GENERATE,
    //   $.generate_statement_body,
    //   $.END, $.GENERATE, optional($.identifier), $.semicolon
    // ),

    // if_generate_statement: $ => seq(
    //   $.label_spec,
    //   $.IF optional($.label_spec), $.condition, $.GENERATE,
    //     $.generate_statement_body,
    //   repeat($.ELSIF, optional($.label_spec), $.condition, $.GENERATE,
    //     $.generate_statement_body),
    //   optional($.ELSE, optional($.label_spec), $.GENERATE,
    //     $.generate_statement_body),
    //   $.END, $.GENERATE, optional($.identifier), $.semicolon
    // ),

    // case_generate_statement: $ => seq(
    //   $.label_spec,
    //   $.CASE, $.expression, $.GENERATE,
    //   repeat1($.case_generate_alternative),
    //   $.END, $.GENERATE, optional($.identifier), $.semicolon
    // ),

    // case_generate_alternative: $ => seq(
    //   $.WHEN, optional($.label_spec), $.choices, $.arrow,
    //   $.generate_statement_body
    // ),

    // generate_statement_body: $ => seq(
    //   optional($.block_declarative_part, $.BEGIN),
    //   repeat($.concurrent_statement),
    //   optional($.END, optional($.identifier), $.semicolon)
    // ),

    // label_spec: $ => seq($.identifier, $.colon),

    // use_clause: $ => seq(
    //   $.USE, $.selected_name, repeat($.comma, $.selected_name), $.semicolon
    // ),

    design_unit: $ => seq(
      // $.context_clause,
      $.library_unit
    ),

    library_unit: $ => choice(
      $.primary_unit,
      // $.secondary_unit
    ),

    primary_unit: $ => choice(
      $.entity_declaration,
    //   $.configuration_declaration,
    //   $.package_declaration,
    //   $.package_instantiation_declaration,
    //   $.context_declaration,
    //   $.Verification_Unit
    ),

    // secondary_unit: $ => choice(
    //   $.architecture_body,
    //   $.package_body
    // ),

    // library_clause: $ => seq(
    //   $.LIBRARY, $.logical_name_list, $.semicolon
    // ),

    // logical_name_list: $ => seq(
    //   $.logical_name, repeat($.comma, $.logical_name)
    // ),

    // logical_name: $ => $.identifier,

    // context_declaration: $ => seq(
    //   $.CONTEXT, $.identifier, $.IS,
    //   $.context_clause,
    //   $.END, optional($.CONTEXT), optional($.simple_name), $.semicolon
    // ),

    // context_clause: $ => repeat($.context_item),

    // context_item: $ => choice(
    //   $.library_clause,
    //   $.use_clause,
    //   $.context_reference
    // ),

    // context_reference: $ => seq(
    //   $.CONTEXT, $.selected_name, repeat($.comma, $.selected_name), $.semicolon
    // ),

    // tabular_registry_file: $ => repeat($.tabular_registry_entry),

    // tabular_registry_entry: $ => choice(
    //   $.foreign_architecture_registry,
    //   $.foreign_subprogram_registry,
    //   $.foreign_application_registry,
    //   $.library_registry
    // ),

    // foreign_architecture_registry: $ => seq(
    //   $.object_library_name, $.model_name $.vhpiArchF,
    //   $.elaboration_specifier, $.execution_function_name
    // ),

    // foreign_subprogram_registry: $ => seq(
    //   $.object_library_name, $.model_name, choice($.vhpiFuncF, $.vhpiProcF),
    //   $.NULL, $.execution_specifier
    // ),

    // foreign_application_registry: $ => seq(
    //   $.object_library_name, $.application_name, $.vhpiAppF
    //   $.registration_function_name $.NULL
    // ),

    // library_registry: $ => seq(
    //   $.object_library_name, $.NULL, $.vhpiLibF, $.registration_function_name, $.NULL
    // ),

    // object_library_name: $ => choice(
    //   $.C_identifier,
    //   $.extended_identifier
    // ),

    // model_name: $ => choice(
    //   $.C_identifier,
    //   $.extended_identifier
    // ),

    // application_name: $ => choice(
    //   $.C_identifier,
    //   $.extended_identifier
    // ),

    // elaboration_specifier: $ => choice(
    //   $.elaboration_function_name,
    //   $.NULL
    // ),

    // elaboration_function_name: $ => $.C_identifier,

    // execution_specifier: $ => choice(
    //   $.execution_function_name,
    //   $.NULL
    // ),

    // execution_function_name: $ => $.C_identifier,

    // registration_function_name: $ => $.C_identifier,

    // foreign_attribute_value: $ => choice(
    //   $.standard_indirect_binding,
    //   $.standard_direct_binding
    // ),

    // standard_direct_binding: $ => choice(
    //   $.standard_direct_architecture_binding,
    //   $.standard_direct_subprogram_binding
    // ),

    // standard_direct_architecture_binding: $ => seq(
    //   $.VHPIDIRECT, $.object_library_specifier,
    //   $.elaboration_specifier, $.execution_function_name
    // ),

    // standard_direct_subprogram_binding: $ => seq(
    //   $.VHPIDIRECT, $.object_library_specifier, $.execution_specifier
    // ),

    // object_library_specifier: $ => choice(
    //   $.object_library_path,
    //   $.NULL
    // ),

    // object_library_path: $ => /.+/,

    tool_directive: $ => seq(
      $.grave_accent,
      choice(
        seq($.IF,    $.conditional_analysis_expression, $.THEN),
        seq($.ELSIF, $.conditional_analysis_expression, $.THEN),
        seq($.ELSE),
        seq($.END, optional($.IF)),

        seq($.directive_protect, repeat($.directive_body)),
        seq($.directive_warning, $.string_literal),
        seq($.directive_error,   $.string_literal),
        seq($.identifier,        repeat($.directive_body))
      ),
      $.directive_newline
    ),

    conditional_analysis_expression: $ => seq(
      $.conditional_analysis_relation,
      repeat(seq(
        choice($.AND, $.OR, $.XOR, $.XNOR),
        $.conditional_analysis_relation
      ))
    ),

    conditional_analysis_relation: $ => choice(
      seq(optional($.NOT), $.left_parenthesis, $.conditional_analysis_expression, $.right_parenthesis),
      seq(
        $.conditional_analysis_identifier,
        choice(
          $.equals_sign,
          $.inequality,
          $.less_than_sign,
          $.less_than_or_equal,
          $.greater_than_sign,
          $.greater_than_or_equal
        ),
        $.string_literal
      )
    ),

    conditional_analysis_identifier: $ => choice(
      $.directive_constant_builtin,
      $.identifier
    ),
  }
});


