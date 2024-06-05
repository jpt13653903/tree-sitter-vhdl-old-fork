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
    $.attribute_impure_function,
    $.attribute_mode_view,
    $.attribute_pure_function,
    $.attribute_range,
    $.attribute_signal,
    $.attribute_subtype,
    $.attribute_type,
    $.attribute_value,

    $.library_attribute,
    $.library_constant,
    $.library_constant_boolean,
    $.library_constant_character,
    $.library_constant_debug,
    $.library_constant_unit,
    $.library_function,
    $.library_type,

    $.error_sentinel,
  ],

  extras: $ => [
    $.comment,
    $.tool_directive
  ],

  conflicts: $ => [
  ],

  rules: {
    design_file: $ => seq(
        $.design_unit, repeat($.design_unit)
    ),

    entity_declaration: $ => seq(
        $.ENTITY, $.identifier, $.IS, optional($.generic_clause), optional($.port_clause), repeat($.entity_declarative_item), optional(seq($.BEGIN, repeat($.entity_statement))), $.END, optional($.ENTITY), optional($.entity_simple_name), $.semicolon
    ),

    entity_declarative_item: $ => choice(
        $.subprogram_declaration,
        $.subprogram_body,
        $.subprogram_instantiation_declaration,
        $.package_declaration,
        $.package_body,
        $.package_instantiation_declaration,
        $.type_declaration,
        $.subtype_declaration,
        $.mode_view_declaration,
        $.constant_declaration,
        $.signal_declaration,
        $.variable_declaration,
        $.file_declaration,
        $.alias_declaration,
        $.attribute_declaration,
        $.attribute_specification,
        $.disconnection_specification,
        $.use_clause,
        $.group_template_declaration,
        $.group_declaration
    ),

    entity_statement: $ => choice(
        $.concurrent_procedure_call_statement,
        $.process_statement
    ),

    architecture_body: $ => seq(
        $.ARCHITECTURE, $.identifier, $.OF, $.entity_name, $.IS, repeat($.block_declarative_item), $.BEGIN, repeat($.concurrent_statement), $.END, optional($.ARCHITECTURE), optional($.architecture_simple_name), $.semicolon
    ),

    block_declarative_item: $ => choice(
        $.subprogram_declaration,
        $.subprogram_body,
        $.subprogram_instantiation_declaration,
        $.package_declaration,
        $.package_body,
        $.package_instantiation_declaration,
        $.type_declaration,
        $.subtype_declaration,
        $.mode_view_declaration,
        $.constant_declaration,
        $.signal_declaration,
        $.variable_declaration,
        $.file_declaration,
        $.alias_declaration,
        $.component_declaration,
        $.attribute_declaration,
        $.attribute_specification,
        $.configuration_specification,
        $.disconnection_specification,
        $.use_clause,
        $.group_template_declaration,
        $.group_declaration
    ),

    configuration_declaration: $ => seq(
        $.CONFIGURATION, $.identifier, $.OF, $.entity_name, $.IS, repeat($.configuration_declarative_item), repeat(seq($.verification_unit_binding_indication, $.semicolon)), $.block_configuration, $.END, optional($.CONFIGURATION), optional($.configuration_simple_name), $.semicolon
    ),

    configuration_declarative_item: $ => choice(
        $.use_clause,
        $.attribute_specification,
        $.group_declaration
    ),

    block_configuration: $ => seq(
        $.FOR, $.block_specification, repeat($.use_clause), repeat($.configuration_item), $.END, $.FOR, $.semicolon
    ),

    block_specification: $ => choice(
        $.architecture_name,
        seq($.label, optional(seq($.left_parenthesis, $.generate_specification, $.right_parenthesis)))
    ),

    generate_specification: $ => choice(
        $.discrete_range,
        $.expression,
        $.label
    ),

    configuration_item: $ => choice(
        $.block_configuration,
        $.component_configuration
    ),

    component_configuration: $ => seq(
        $.FOR, $.component_specification, optional($.binding_indication), repeat(seq($.verification_unit_binding_indication, $.semicolon)), optional($.block_configuration), $.END, $.FOR, $.semicolon
    ),

    subprogram_declaration: $ => seq(
        $.subprogram_specification, $.semicolon
    ),

    subprogram_specification: $ => choice(
        $.procedure_specification,
        $.function_specification
    ),

    procedure_specification: $ => seq(
        $.PROCEDURE, $.designator, optional($.subprogram_header), optional(seq(optional($.PARAMETER), $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis))
    ),

    function_specification: $ => seq(
        optional(choice($.PURE, $.IMPURE)), $.FUNCTION, $.designator, optional($.subprogram_header), optional(seq(optional($.PARAMETER), $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis)), $.RETURN, optional(seq($.return_identifier, $.OF)), $.type_mark
    ),

    subprogram_header: $ => seq(
        $.GENERIC, $.left_parenthesis, $.generic_list, $.right_parenthesis, optional($.generic_map_aspect)
    ),

    designator: $ => choice(
        $.identifier,
        $.operator_symbol
    ),

    operator_symbol: $ => seq(
        $.string_literal
    ),

    formal_parameter_list: $ => seq(
        $.interface_list
    ),

    subprogram_body: $ => seq(
        $.subprogram_specification, $.IS, repeat($.subprogram_declarative_item), $.BEGIN, repeat($.sequential_statement), $.END, optional($.subprogram_kind), optional($.designator), $.semicolon
    ),

    subprogram_declarative_item: $ => choice(
        $.subprogram_declaration,
        $.subprogram_body,
        $.subprogram_instantiation_declaration,
        $.package_declaration,
        $.package_body,
        $.package_instantiation_declaration,
        $.type_declaration,
        $.subtype_declaration,
        $.constant_declaration,
        $.variable_declaration,
        $.file_declaration,
        $.alias_declaration,
        $.attribute_declaration,
        $.attribute_specification,
        $.use_clause,
        $.group_template_declaration,
        $.group_declaration
    ),

    subprogram_kind: $ => choice(
        $.PROCEDURE,
        $.FUNCTION
    ),

    subprogram_instantiation_declaration: $ => seq(
        $.subprogram_kind, $.designator, $.IS, $.NEW, $.uninstantiated_subprogram_name, optional($.signature), optional($.generic_map_aspect), $.semicolon
    ),

    signature: $ => seq(
        $.left_square_bracket, optional(seq($.type_mark, repeat(seq($.comma, $.type_mark)))), optional(seq($.RETURN, $.type_mark)), $.right_square_bracket
    ),

    package_declaration: $ => seq(
        $.PACKAGE, $.identifier, $.IS, optional($.package_header), repeat($.package_declarative_item), $.END, optional($.PACKAGE), optional($.package_simple_name), $.semicolon
    ),

    package_header: $ => seq(
        $.generic_clause, optional(seq($.generic_map_aspect, $.semicolon))
    ),

    package_declarative_item: $ => choice(
        $.subprogram_declaration,
        $.subprogram_instantiation_declaration,
        $.package_declaration,
        $.package_instantiation_declaration,
        $.type_declaration,
        $.subtype_declaration,
        $.mode_view_declaration,
        $.constant_declaration,
        $.signal_declaration,
        $.variable_declaration,
        $.file_declaration,
        $.alias_declaration,
        $.component_declaration,
        $.attribute_declaration,
        $.attribute_specification,
        $.disconnection_specification,
        $.use_clause,
        $.group_template_declaration,
        $.group_declaration
    ),

    package_body: $ => seq(
        $.PACKAGE, $.BODY, $.package_simple_name, $.IS, repeat($.package_body_declarative_item), $.END, optional(seq($.PACKAGE, $.BODY)), optional($.package_simple_name), $.semicolon
    ),

    package_body_declarative_item: $ => choice(
        $.subprogram_declaration,
        $.subprogram_body,
        $.subprogram_instantiation_declaration,
        $.package_declaration,
        $.package_body,
        $.package_instantiation_declaration,
        $.type_declaration,
        $.subtype_declaration,
        $.constant_declaration,
        $.variable_declaration,
        $.file_declaration,
        $.alias_declaration,
        $.attribute_declaration,
        $.attribute_specification,
        $.use_clause,
        $.group_template_declaration,
        $.group_declaration
    ),

    package_instantiation_declaration: $ => seq(
        $.PACKAGE, $.identifier, $.IS, $.NEW, $.uninstantiated_package_name, optional($.generic_map_aspect), $.semicolon
    ),

    scalar_type_definition: $ => choice(
        $.enumeration_type_definition,
        $.integer_type_definition,
        $.floating_type_definition,
        $.physical_type_definition
    ),

    range_constraint: $ => seq(
        $.RANGE, $.range
    ),

    range: $ => choice(
        $.attribute_name,
        $.simple_range,
        $.expression
    ),

    simple_range: $ => seq(
        $.simple_expression, $.direction, $.simple_expression
    ),

    direction: $ => choice(
        $.TO,
        $.DOWNTO
    ),

    enumeration_type_definition: $ => seq(
        $.left_parenthesis, $.enumeration_literal, repeat(seq($.comma, $.enumeration_literal)), $.right_parenthesis
    ),

    enumeration_literal: $ => choice(
        $.identifier,
        $.character_literal
    ),

    integer_type_definition: $ => seq(
        $.range_constraint
    ),

    physical_type_definition: $ => seq(
        $.range_constraint, $.UNITS, $.primary_unit_declaration, repeat($.secondary_unit_declaration), $.END, $.UNITS, optional($.physical_type_simple_name)
    ),

    primary_unit_declaration: $ => seq(
        $.identifier, $.semicolon
    ),

    secondary_unit_declaration: $ => seq(
        $.identifier, $.equals_sign, $.physical_literal, $.semicolon
    ),

    physical_literal: $ => seq(
        optional($.abstract_literal), $.unit_name
    ),

    floating_type_definition: $ => seq(
        $.range_constraint
    ),

    composite_type_definition: $ => choice(
        $.array_type_definition,
        $.record_type_definition
    ),

    array_type_definition: $ => choice(
        $.unbounded_array_definition,
        $.constrained_array_definition
    ),

    unbounded_array_definition: $ => seq(
        $.ARRAY, $.left_parenthesis, $.index_subtype_definition, repeat(seq($.comma, $.index_subtype_definition)), $.right_parenthesis, $.OF, $.subtype_indication
    ),

    constrained_array_definition: $ => seq(
        $.ARRAY, $.index_constraint, $.OF, $.subtype_indication
    ),

    index_subtype_definition: $ => seq(
        $.type_mark, $.RANGE, $.box
    ),

    array_constraint: $ => choice(
        seq($.index_constraint, optional($.array_element_constraint)),
        seq($.left_parenthesis, $.OPEN, $.right_parenthesis, optional($.array_element_constraint))
    ),

    array_element_constraint: $ => seq(
        $.element_constraint
    ),

    index_constraint: $ => seq(
        $.left_parenthesis, $.discrete_range, repeat(seq($.comma, $.discrete_range)), $.right_parenthesis
    ),

    discrete_range: $ => choice(
        $.subtype_indication,
        $.range
    ),

    record_type_definition: $ => seq(
        $.RECORD, repeat($.element_declaration), $.END, $.RECORD, optional($.record_type_simple_name)
    ),

    element_declaration: $ => seq(
        $.identifier_list, $.colon, $.element_subtype_definition, $.semicolon
    ),

    identifier_list: $ => seq(
        $.identifier, repeat(seq($.comma, $.identifier))
    ),

    element_subtype_definition: $ => seq(
        $.subtype_indication
    ),

    record_constraint: $ => seq(
        $.left_parenthesis, $.record_element_constraint, repeat(seq($.comma, $.record_element_constraint)), $.right_parenthesis
    ),

    record_element_constraint: $ => seq(
        $.record_element_simple_name, $.element_constraint
    ),

    access_type_definition: $ => seq(
        $.ACCESS, $.subtype_indication, optional($.generic_map_aspect)
    ),

    incomplete_type_declaration: $ => seq(
        $.TYPE, $.identifier, $.semicolon
    ),

    file_type_definition: $ => seq(
        $.FILE, $.OF, $.type_mark
    ),

    protected_type_definition: $ => choice(
        $.protected_type_declaration,
        $.protected_type_body
    ),

    protected_type_declaration: $ => seq(
        $.PROTECTED, optional($.protected_type_header), repeat($.protected_type_declarative_item), $.END, $.PROTECTED, optional($.protected_type_simple_name)
    ),

    protected_type_header: $ => seq(
        $.generic_clause, optional(seq($.generic_map_aspect, $.semicolon))
    ),

    protected_type_declarative_item: $ => choice(
        $.subprogram_declaration,
        $.subprogram_instantiation_declaration,
        $.attribute_specification,
        $.use_clause,
        $.private_variable_declaration,
        $.alias_declaration
    ),

    private_variable_declaration: $ => seq(
        $.PRIVATE, $.variable_declaration
    ),

    protected_type_body: $ => seq(
        $.PROTECTED, $.BODY, repeat($.protected_type_body_declarative_item), $.END, $.PROTECTED, $.BODY, optional(seq($.protected_type_simple_name))
    ),

    protected_type_body_declarative_item: $ => choice(
        $.subprogram_declaration,
        $.subprogram_body,
        $.subprogram_instantiation_declaration,
        $.package_declaration,
        $.package_body,
        $.package_instantiation_declaration,
        $.type_declaration,
        $.subtype_declaration,
        $.constant_declaration,
        $.variable_declaration,
        $.file_declaration,
        $.alias_declaration,
        $.attribute_declaration,
        $.attribute_specification,
        $.use_clause,
        $.group_template_declaration,
        $.group_declaration
    ),

    protected_type_instantiation_definition: $ => seq(
        $.NEW, $.subtype_indication, optional($.generic_map_aspect)
    ),

    unspecified_type_indication: $ => seq(
        $.TYPE, $.IS, $.incomplete_type_definition
    ),

    incomplete_type_definition: $ => choice(
        $.private_incomplete_type_definition,
        $.scalar_incomplete_type_definition,
        $.discrete_incomplete_type_definition,
        $.integer_incomplete_type_definition,
        $.physical_incomplete_type_definition,
        $.floating_incomplete_type_definition,
        $.array_incomplete_type_definition,
        $.access_incomplete_type_definition,
        $.file_incomplete_type_definition
    ),

    incomplete_subtype_indication: $ => choice(
        $.subtype_indication,
        $.unspecified_type_indication
    ),

    incomplete_type_mark: $ => choice(
        $.type_mark,
        $.unspecified_type_indication
    ),

    private_incomplete_type_definition: $ => seq(
        $.PRIVATE
    ),

    scalar_incomplete_type_definition: $ => seq(
        $.box
    ),

    discrete_incomplete_type_definition: $ => seq(
        $.left_parenthesis, $.box, $.right_parenthesis
    ),

    integer_incomplete_type_definition: $ => seq(
        $.RANGE, $.box
    ),

    physical_incomplete_type_definition: $ => seq(
        $.UNITS, $.box
    ),

    floating_incomplete_type_definition: $ => seq(
        $.RANGE, $.box, $.dot, $.box
    ),

    array_incomplete_type_definition: $ => seq(
        $.ARRAY, $.left_parenthesis, $.array_index_incomplete_type_list, $.right_parenthesis, $.OF, $.incomplete_subtype_indication
    ),

    array_index_incomplete_type_list: $ => seq(
        $.array_index_incomplete_type, repeat(seq($.comma, $.array_index_incomplete_type))
    ),

    array_index_incomplete_type: $ => choice(
        $.index_subtype_definition,
        $.index_constraint,
        $.unspecified_type_indication
    ),

    access_incomplete_type_definition: $ => seq(
        $.ACCESS, $.incomplete_subtype_indication
    ),

    file_incomplete_type_definition: $ => seq(
        $.FILE, $.OF, $.incomplete_type_mark
    ),

    type_declaration: $ => choice(
        $.full_type_declaration,
        $.incomplete_type_declaration
    ),

    full_type_declaration: $ => seq(
        $.TYPE, $.identifier, $.IS, $.type_definition, $.semicolon
    ),

    type_definition: $ => choice(
        $.scalar_type_definition,
        $.composite_type_definition,
        $.access_type_definition,
        $.file_type_definition,
        $.protected_type_definition,
        $.protected_type_instantiation_definition
    ),

    subtype_declaration: $ => seq(
        $.SUBTYPE, $.identifier, $.IS, $.subtype_indication, $.semicolon
    ),

    subtype_indication: $ => seq(
        optional($.resolution_indication), $.type_mark, optional($.constraint)
    ),

    resolution_indication: $ => choice(
        $.resolution_function_name,
        seq($.left_parenthesis, $.element_resolution, $.right_parenthesis)
    ),

    element_resolution: $ => choice(
        $.array_element_resolution,
        $.record_resolution
    ),

    array_element_resolution: $ => seq(
        $.resolution_indication
    ),

    record_resolution: $ => seq(
        $.record_element_resolution, repeat(seq($.comma, $.record_element_resolution))
    ),

    record_element_resolution: $ => seq(
        $.record_element_simple_name, $.resolution_indication
    ),

    type_mark: $ => choice(
        $.type_name,
        $.subtype_name
    ),

    constraint: $ => choice(
        $.range_constraint,
        $.array_constraint,
        $.record_constraint
    ),

    element_constraint: $ => choice(
        $.array_constraint,
        $.record_constraint
    ),

    object_declaration: $ => choice(
        $.constant_declaration,
        $.signal_declaration,
        $.variable_declaration,
        $.file_declaration
    ),

    constant_declaration: $ => seq(
        $.CONSTANT, $.identifier_list, $.colon, $.subtype_indication, optional(seq($.variable_assignment, $.conditional_expression)), $.semicolon
    ),

    signal_declaration: $ => seq(
        $.SIGNAL, $.identifier_list, $.colon, $.subtype_indication, optional($.signal_kind), optional(seq($.variable_assignment, $.conditional_expression)), $.semicolon
    ),

    signal_kind: $ => choice(
        $.REGISTER,
        $.BUS
    ),

    variable_declaration: $ => seq(
        optional($.SHARED), $.VARIABLE, $.identifier_list, $.colon, $.subtype_indication, optional($.generic_map_aspect), optional(seq($.variable_assignment, $.conditional_expression)), $.semicolon
    ),

    file_declaration: $ => seq(
        $.FILE, $.identifier_list, $.colon, $.subtype_indication, optional($.file_open_information), $.semicolon
    ),

    file_open_information: $ => seq(
        optional(seq($.OPEN, $.expression)), $.IS, $.file_logical_name
    ),

    file_logical_name: $ => seq(
        $.string_expression
    ),

    interface_declaration: $ => choice(
        $.interface_object_declaration,
        $.interface_type_declaration,
        $.interface_subprogram_declaration,
        $.interface_package_declaration,
    ),

    interface_object_declaration: $ => choice(
        $.interface_constant_declaration,
        $.interface_signal_declaration,
        $.interface_variable_declaration,
        $.interface_file_declaration
    ),

    interface_constant_declaration: $ => seq(
        optional($.CONSTANT), $.identifier_list, $.colon, optional($.IN), $.interface_type_indication, optional(seq($.variable_assignment, $.conditional_expression))
    ),

    interface_signal_declaration: $ => seq(
        optional($.SIGNAL), $.identifier_list, $.colon, $.mode_indication
    ),

    interface_variable_declaration: $ => seq(
        optional($.VARIABLE), $.identifier_list, $.colon, optional($.mode), $.interface_type_indication, optional(seq($.variable_assignment, $.conditional_expression))
    ),

    interface_file_declaration: $ => seq(
        $.FILE, $.identifier_list, $.colon, $.subtype_indication
    ),

    interface_type_indication: $ => choice(
        $.subtype_indication,
        $.unspecified_type_indication
    ),

    mode_indication: $ => choice(
        $.simple_mode_indication,
        $.mode_view_indication
    ),

    simple_mode_indication: $ => seq(
        optional($.mode), $.interface_type_indication, optional($.BUS), optional(seq($.variable_assignment, $.conditional_expression))
    ),

    mode: $ => choice(
        $.IN,
        $.OUT,
        $.INOUT,
        $.BUFFER,
        $.LINKAGE
    ),

    mode_view_indication: $ => choice(
        $.record_mode_view_indication,
        $.array_mode_view_indication
    ),

    record_mode_view_indication: $ => seq(
        $.VIEW, $.mode_view_name, optional(seq($.OF, $.subtype_indication))
    ),

    array_mode_view_indication: $ => seq(
        $.VIEW, $.left_parenthesis, $.mode_view_name, $.right_parenthesis, optional(seq($.OF, $.subtype_indication))
    ),

    mode_view_declaration: $ => seq(
        $.VIEW, $.identifier, $.OF, $.subtype_indication, $.IS, repeat($.mode_view_element_definition), $.END, $.VIEW, optional($.mode_view_simple_name), $.semicolon
    ),

    mode_view_element_definition: $ => seq(
        $.record_element_list, $.colon, $.element_mode_indication, $.semicolon
    ),

    record_element_list: $ => seq(
        $.record_element_simple_name, repeat(seq($.comma, $.record_element_simple_name))
    ),

    element_mode_indication: $ => choice(
        $.mode,
        $.element_mode_view_indication
    ),

    element_mode_view_indication: $ => choice(
        $.element_record_mode_view_indication,
        $.element_array_mode_view_indication
    ),

    element_record_mode_view_indication: $ => seq(
        $.VIEW, $.mode_view_name
    ),

    element_array_mode_view_indication: $ => seq(
        $.VIEW, $.left_parenthesis, $.mode_view_name, $.right_parenthesis
    ),

    interface_type_declaration: $ => seq(
        $.TYPE, $.identifier, optional(seq($.IS, $.incomplete_type_definition))
    ),

    interface_subprogram_declaration: $ => seq(
        $.interface_subprogram_specification, optional(seq($.IS, $.interface_subprogram_default))
    ),

    interface_subprogram_specification: $ => choice(
        $.interface_procedure_specification,
        $.interface_function_specification
    ),

    interface_procedure_specification: $ => seq(
        $.PROCEDURE, $.designator, optional(seq(optional($.PARAMETER), $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis))
    ),

    interface_function_specification: $ => seq(
        optional(choice($.PURE, $.IMPURE)), $.FUNCTION, $.designator, optional(seq(optional($.PARAMETER), $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis)), $.RETURN, $.type_mark
    ),

    interface_subprogram_default: $ => choice(
        $.subprogram_name,
        $.box
    ),

    interface_package_declaration: $ => seq(
        $.PACKAGE, $.identifier, $.IS, $.NEW, $.uninstantiated_package_name, $.interface_package_generic_map_aspect
    ),

    interface_package_generic_map_aspect: $ => choice(
        $.generic_map_aspect,
        seq($.GENERIC, $.MAP, $.left_parenthesis, $.box, $.right_parenthesis),
        seq($.GENERIC, $.MAP, $.left_parenthesis, $.DEFAULT, $.right_parenthesis)
    ),

    interface_list: $ => seq(
        $.interface_element, repeat(seq($.semicolon, $.interface_element)), optional($.semicolon)
    ),

    interface_element: $ => seq(
        $.interface_declaration
    ),

    generic_clause: $ => seq(
        $.GENERIC, $.left_parenthesis, $.generic_list, $.right_parenthesis, $.semicolon
    ),

    generic_list: $ => seq(
        $.interface_list
    ),

    port_clause: $ => seq(
        $.PORT, $.left_parenthesis, $.port_list, $.right_parenthesis, $.semicolon
    ),

    port_list: $ => seq(
        $.interface_list
    ),

    association_list: $ => seq(
        $.association_element, repeat(seq($.comma, $.association_element))
    ),

    association_element: $ => seq(
        optional(seq($.formal_part, $.arrow)), $.actual_part
    ),

    formal_part: $ => choice(
        $.formal_designator,
        seq($.function_name, $.left_parenthesis, $.formal_designator, $.right_parenthesis),
        seq($.type_mark, $.left_parenthesis, $.formal_designator, $.right_parenthesis)
    ),

    formal_designator: $ => choice(
        seq($.generic_name, optional($.signature)),
        $.port_name,
        $.parameter_name
    ),

    actual_part: $ => choice(
        $.actual_designator,
        seq($.function_name, $.left_parenthesis, $.actual_designator, $.right_parenthesis),
        seq($.type_mark, $.left_parenthesis, $.actual_designator, $.right_parenthesis)
    ),

    actual_designator: $ => choice(
        seq(optional($.INERTIAL), $.conditional_expression),
        $.signal_name,
        $.variable_name,
        $.file_name,
        $.subtype_indication,
        $.subprogram_name,
        $.instantiated_package_name,
        $.OPEN
    ),

    generic_map_aspect: $ => seq(
        $.GENERIC, $.MAP, $.left_parenthesis, $.association_list, $.right_parenthesis
    ),

    port_map_aspect: $ => seq(
        $.PORT, $.MAP, $.left_parenthesis, $.association_list, $.right_parenthesis
    ),

    alias_declaration: $ => seq(
        $.ALIAS, $.alias_designator, optional(seq($.colon, $.subtype_indication)), $.IS, $.name, optional($.signature), $.semicolon
    ),

    alias_designator: $ => choice(
        $.identifier,
        $.character_literal,
        $.operator_symbol
    ),

    attribute_declaration: $ => seq(
        $.ATTRIBUTE, $.identifier, $.colon, $.type_mark, $.semicolon
    ),

    component_declaration: $ => seq(
        $.COMPONENT, $.identifier, optional($.IS), optional($.generic_clause), optional($.port_clause), $.END, optional($.COMPONENT), optional($.component_simple_name), $.semicolon
    ),

    group_template_declaration: $ => seq(
        $.GROUP, $.identifier, $.IS, $.left_parenthesis, $.entity_class_entry_list, $.right_parenthesis, $.semicolon
    ),

    entity_class_entry_list: $ => seq(
        $.entity_class_entry, repeat(seq($.comma, $.entity_class_entry))
    ),

    entity_class_entry: $ => seq(
        $.entity_class, optional($.box)
    ),

    group_declaration: $ => seq(
        $.GROUP, $.identifier, $.colon, $.group_template_name, $.left_parenthesis, $.group_constituent_list, $.right_parenthesis, $.semicolon
    ),

    group_constituent_list: $ => seq(
        $.group_constituent, repeat(seq($.comma, $.group_constituent))
    ),

    group_constituent: $ => choice(
        $.name,
        $.character_literal
    ),

    attribute_specification: $ => seq(
        $.ATTRIBUTE, $.attribute_designator, $.OF, $.entity_specification, $.IS, $.conditional_expression, $.semicolon
    ),

    entity_specification: $ => seq(
        $.entity_name_list, $.colon, $.entity_class
    ),

    entity_class: $ => choice(
        $.ENTITY,
        $.ARCHITECTURE,
        $.CONFIGURATION,
        $.PROCEDURE,
        $.FUNCTION,
        $.PACKAGE,
        $.TYPE,
        $.SUBTYPE,
        $.CONSTANT,
        $.SIGNAL,
        $.VARIABLE,
        $.COMPONENT,
        $.LABEL,
        $.LITERAL,
        $.UNITS,
        $.GROUP,
        $.FILE,
        $.PROPERTY,
        $.SEQUENCE,
        $.VIEW
    ),

    entity_name_list: $ => choice(
        seq($.entity_designator, repeat(seq($.comma, $.entity_designator))),
        $.OTHERS,
        $.ALL
    ),

    entity_designator: $ => seq(
        $.entity_tag, optional($.signature)
    ),

    entity_tag: $ => choice(
        $.simple_name,
        $.character_literal,
        $.operator_symbol
    ),

    configuration_specification: $ => choice(
        $.simple_configuration_specification,
        $.compound_configuration_specification
    ),

    simple_configuration_specification: $ => seq(
        $.FOR, $.component_specification, $.binding_indication, optional(seq($.END, $.FOR, $.semicolon))
    ),

    compound_configuration_specification: $ => seq(
        $.FOR, $.component_specification, $.binding_indication, $.verification_unit_binding_indication, $.semicolon, repeat(seq($.verification_unit_binding_indication, $.semicolon)), $.END, $.FOR, $.semicolon
    ),

    component_specification: $ => seq(
        $.instantiation_list, $.colon, $.component_name
    ),

    instantiation_list: $ => choice(
        seq($.label, repeat(seq($.comma, $.label))),
        $.OTHERS,
        $.ALL
    ),

    binding_indication: $ => seq(
        optional(seq($.USE, $.entity_aspect)), optional($.generic_map_aspect), optional($.port_map_aspect), $.semicolon
    ),

    entity_aspect: $ => choice(
        seq($.ENTITY, $.entity_name, optional(seq($.left_parenthesis, $.architecture_identifier, $.right_parenthesis))),
        seq($.CONFIGURATION, $.configuration_name),
        $.OPEN
    ),

    verification_unit_binding_indication: $ => seq(
        $.USE, $.VUNIT, $.verification_unit_list
    ),

    verification_unit_list: $ => seq(
        $.verification_unit_name, repeat(seq($.comma, $.verification_unit_name))
    ),

    disconnection_specification: $ => seq(
        $.DISCONNECT, $.guarded_signal_specification, $.AFTER, $.expression, $.semicolon
    ),

    guarded_signal_specification: $ => seq(
        $.signal_list, $.colon, $.type_mark
    ),

    signal_list: $ => choice(
        seq($.signal_name, repeat(seq($.comma, $.signal_name))),
        $.OTHERS,
        $.ALL
    ),

    name: $ => choice(
        $.simple_name,
        $.operator_symbol,
        $.character_literal,
        $.selected_name,
        $.indexed_name,
        $.slice_name,
        $.attribute_name,
        $.external_name
    ),

    prefix: $ => choice(
        $.name,
        $.function_call
    ),

    simple_name: $ => seq(
        $.identifier
    ),

    selected_name: $ => seq(
        $.prefix, $.dot, $.suffix
    ),

    suffix: $ => choice(
        $.simple_name,
        $.character_literal,
        $.operator_symbol,
        $.ALL
    ),

    indexed_name: $ => seq(
        $.prefix, $.left_parenthesis, $.expression, repeat(seq($.comma, $.expression)), $.right_parenthesis
    ),

    slice_name: $ => seq(
        $.prefix, $.left_parenthesis, $.discrete_range, $.right_parenthesis
    ),

    attribute_name: $ => seq(
        $.prefix, optional($.signature), $.TICK, $.attribute_designator, optional(seq($.left_parenthesis, $.expression, $.right_parenthesis))
    ),

    attribute_designator: $ => seq(
        $.attribute_simple_name
    ),

    external_name: $ => choice(
        $.external_constant_name,
        $.external_signal_name,
        $.external_variable_name
    ),

    external_constant_name: $ => seq(
        $.double_less_than, $.CONSTANT, $.external_pathname, $.colon, $.interface_type_indication, $.double_greater_than
    ),

    external_signal_name: $ => seq(
        $.double_less_than, $.SIGNAL, $.external_pathname, $.colon, $.interface_type_indication, $.double_greater_than
    ),

    external_variable_name: $ => seq(
        $.double_less_than, $.VARIABLE, $.external_pathname, $.colon, $.interface_type_indication, $.double_greater_than
    ),

    external_pathname: $ => choice(
        $.package_pathname,
        $.absolute_pathname,
        $.relative_pathname
    ),

    package_pathname: $ => seq(
        $.commercial_at, $.library_logical_name, $.dot, $.package_simple_name, $.dot, repeat(seq($.package_simple_name, $.dot)), $.object_simple_name
    ),

    absolute_pathname: $ => seq(
        $.dot, $.partial_pathname
    ),

    relative_pathname: $ => seq(
        repeat(seq($.circumflex, $.dot)), $.partial_pathname
    ),

    partial_pathname: $ => seq(
        repeat(seq($.pathname_element, $.dot)), $.object_simple_name
    ),

    pathname_element: $ => choice(
        $.entity_simple_name,
        seq($.label, optional(seq($.left_parenthesis, $.expression, $.right_parenthesis))),
        $.package_simple_name
    ),

    conditional_or_unaffected_expression: $ => seq(
        $.expression_or_unaffected, repeat(seq($.WHEN, $.condition, $.ELSE, $.expression_or_unaffected)), optional(seq($.WHEN, $.condition))
    ),

    expression_or_unaffected: $ => choice(
        $.expression,
        $.UNAFFECTED
    ),

    conditional_expression: $ => seq(
        $.expression, repeat(seq($.WHEN, $.condition, $.ELSE, $.expression))
    ),

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

    factor: $ => seq(
        $.unary_expression, optional(seq($.exponentiate, $.unary_expression))
    ),

    unary_expression: $ => choice(
        $.primary,
        seq($.ABS, $.primary),
        seq($.NOT, $.primary),
        seq($.unary_logical_operator, $.primary)
    ),

    unary_logical_operator: $ => $.logical_operator,

    primary: $ => choice(
        $.name,
        $.literal,
        $.aggregate,
        $.function_call,
        $.qualified_expression,
        $.type_conversion,
        $.allocator,
        seq($.left_parenthesis, $.conditional_expression, $.right_parenthesis)
    ),

    condition: $ => seq(
        $.expression
    ),

    condition_operator: $ => seq(
        $.condition_conversion
    ),

    logical_operator: $ => choice(
        $.AND,
        $.OR,
        $.NAND,
        $.NOR,
        $.XOR,
        $.XNOR
    ),

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

    shift_operator: $ => choice(
        $.SLL,
        $.SRL,
        $.SLA,
        $.SRA,
        $.ROL,
        $.ROR
    ),

    adding_operator: $ => choice(
        $.plus_sign,
        $.minus_sign,
        $.ampersand
    ),

    sign: $ => choice(
        $.plus_sign,
        $.minus_sign
    ),

    multiplying_operator: $ => choice(
        $.multiply,
        $.divide,
        $.MOD,
        $.REM
    ),

    binary_miscellaneous_operator: $ => seq(
        $.exponentiate
    ),

    unary_miscellaneous_operator: $ => choice(
        $.ABS,
        $.NOT,
        $.unary_logical_operator
    ),

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
      $.based_literal
    ),

    aggregate: $ => seq(
        $.left_parenthesis, $.element_association, repeat(seq($.comma, $.element_association)), $.right_parenthesis
    ),

    element_association: $ => seq(
        optional(seq($.choices, $.arrow)), $.expression
    ),

    choices: $ => seq(
        $.choice, repeat(seq($.vertical_bar, $.choice))
    ),

    choice: $ => choice(
        $.simple_expression,
        $.discrete_range,
        $.element_simple_name,
        $.OTHERS
    ),

    function_call: $ => seq(
        $.function_name, optional($.generic_map_aspect), optional($.parameter_map_aspect)
    ),

    parameter_map_aspect: $ => seq(
        optional(seq($.PARAMETER, $.MAP)), $.left_parenthesis, $.association_list, $.right_parenthesis
    ),

    qualified_expression: $ => choice(
        seq($.type_mark, $.tick, $.left_parenthesis, $.expression, $.right_parenthesis),
        seq($.type_mark, $.tick, $.aggregate),
        seq($.type_mark, $.tick, $.left_parenthesis, $.right_parenthesis)
    ),

    type_conversion: $ => seq(
        $.type_mark, $.left_parenthesis, $.expression, $.right_parenthesis
    ),

    allocator: $ => choice(
        seq($.NEW, $.subtype_indication, optional(seq($.generic_map_aspect))),
        seq($.NEW, $.qualified_expression)
    ),

    sequential_statement: $ => choice(
        $.wait_statement,
        $.assertion_statement,
        $.report_statement,
        $.signal_assignment_statement,
        $.variable_assignment_statement,
        $.procedure_call_statement,
        $.if_statement,
        $.case_statement,
        $.loop_statement,
        $.next_statement,
        $.exit_statement,
        $.return_statement,
        $.null_statement,
        $.sequential_block_statement
    ),

    wait_statement: $ => seq(
        optional($.label_declaration), $.WAIT, optional($.sensitivity_clause), optional($.condition_clause), optional($.timeout_clause), $.semicolon
    ),

    sensitivity_clause: $ => seq(
        $.ON, $.sensitivity_list
    ),

    sensitivity_list: $ => seq(
        $.signal_name, repeat(seq($.comma, $.signal_name))
    ),

    condition_clause: $ => seq(
        $.UNTIL, $.condition
    ),

    timeout_clause: $ => seq(
        $.FOR, $.expression
    ),

    assertion_statement: $ => seq(
        optional($.label_declaration), $.assertion, $.semicolon
    ),

    assertion: $ => seq(
        $.ASSERT, $.condition, optional(seq($.REPORT, $.expression)), optional(seq($.SEVERITY, $.expression))
    ),

    report_statement: $ => seq(
        optional($.label_declaration), $.REPORT, $.expression, optional(seq($.SEVERITY, $.expression)), $.semicolon
    ),

    signal_assignment_statement: $ => choice(
        seq(optional($.label_declaration), $.simple_signal_assignment),
        seq(optional($.label_declaration), $.conditional_signal_assignment),
        seq(optional($.label_declaration), $.selected_signal_assignment)
    ),

    simple_signal_assignment: $ => choice(
        $.simple_waveform_assignment,
        $.simple_force_assignment,
        $.simple_release_assignment
    ),

    simple_waveform_assignment: $ => seq(
        $.target, $.signal_assignment, optional($.delay_mechanism), $.waveform, $.semicolon
    ),

    simple_force_assignment: $ => seq(
        $.target, $.signal_assignment, $.FORCE, optional($.force_mode), $.conditional_or_unaffected_expression, $.semicolon
    ),

    simple_release_assignment: $ => seq(
        $.target, $.signal_assignment, $.RELEASE, optional($.force_mode), $.semicolon
    ),

    force_mode: $ => choice(
        $.IN,
        $.OUT
    ),

    delay_mechanism: $ => choice(
        $.TRANSPORT,
        seq(optional(seq($.REJECT, $.expression)), $.INERTIAL)
    ),

    target: $ => choice(
        $.name,
        $.aggregate
    ),

    waveform: $ => choice(
        seq($.waveform_element, repeat(seq($.comma, $.waveform_element))),
        $.UNAFFECTED
    ),

    waveform_element: $ => choice(
        seq($.expression, optional(seq($.AFTER, $.expression))),
        seq($.NULL, optional(seq($.AFTER, $.expression)))
    ),

    conditional_signal_assignment: $ => seq(
        $.target, $.signal_assignment, optional($.delay_mechanism), $.conditional_waveforms, $.semicolon
    ),

    conditional_waveforms: $ => seq(
        $.waveform, $.WHEN, $.condition, repeat(seq($.ELSE, $.waveform, $.WHEN, $.condition)), optional(seq($.ELSE, $.waveform))
    ),

    selected_signal_assignment: $ => choice(
        $.selected_waveform_assignment,
        $.selected_force_assignment
    ),

    selected_waveform_assignment: $ => seq(
        $.WITH, $.expression, $.SELECT, optional($.question_mark), $.target, $.signal_assignment, optional($.delay_mechanism), $.selected_waveforms, $.semicolon
    ),

    selected_waveforms: $ => seq(
        repeat(seq($.waveform, $.WHEN, $.choices, $.comma)), $.waveform, $.WHEN, $.choices
    ),

    selected_force_assignment: $ => seq(
        $.WITH, $.expression, $.SELECT, optional($.question_mark), $.target, $.signal_assignment, $.FORCE, optional($.force_mode), $.selected_expressions, $.semicolon
    ),

    selected_expressions: $ => seq(
        repeat(seq($.expression, $.WHEN, $.choices, $.comma)), $.expression, $.WHEN, $.choices
    ),

    variable_assignment_statement: $ => choice(
        seq(optional($.label_declaration), $.simple_variable_assignment),
        seq(optional($.label_declaration), $.selected_variable_assignment)
    ),

    simple_variable_assignment: $ => seq(
        $.target, $.variable_assignment, $.conditional_or_unaffected_expression, $.semicolon
    ),

    selected_variable_assignment: $ => seq(
        $.WITH, $.expression, $.SELECT, optional($.question_mark), $.target, $.variable_assignment, $.selected_expressions, $.semicolon
    ),

    procedure_call_statement: $ => seq(
        optional($.label_declaration), $.procedure_call, $.semicolon
    ),

    procedure_call: $ => seq(
        $.procedure_name, optional($.generic_map_aspect), optional($.parameter_map_aspect)
    ),

    if_statement: $ => seq(
        optional($.label_declaration), $.IF, $.condition, $.THEN, repeat($.sequential_statement), repeat(seq($.ELSIF, $.condition, $.THEN, repeat($.sequential_statement))), optional(seq($.ELSE, repeat($.sequential_statement))), $.END, $.IF, optional($.label), $.semicolon
    ),

    sequential_statement_body: $ => seq(
        optional(seq(repeat($.process_declarative_item), $.BEGIN)), repeat($.sequential_statement)
    ),

    case_statement: $ => seq(
        optional($.label_declaration), $.CASE, optional($.question_mark), $.expression, $.IS, $.case_statement_alternative, repeat($.case_statement_alternative), $.END, $.CASE, optional($.question_mark), optional($.label), $.semicolon
    ),

    case_statement_alternative: $ => seq(
        $.WHEN, $.choices, $.arrow, repeat($.sequential_statement)
    ),

    loop_statement: $ => seq(
        optional($.label_declaration), optional($.iteration_scheme), $.LOOP, repeat($.sequential_statement), $.END, $.LOOP, optional($.label), $.semicolon
    ),

    iteration_scheme: $ => choice(
        seq($.WHILE, $.condition),
        seq($.FOR, $.parameter_specification)
    ),

    parameter_specification: $ => seq(
        $.identifier, $.IN, $.discrete_range
    ),

    next_statement: $ => seq(
        optional($.label_declaration), $.NEXT, optional($.label), optional(seq($.WHEN, $.condition)), $.semicolon
    ),

    exit_statement: $ => seq(
        optional($.label_declaration), $.EXIT, optional($.label), optional(seq($.WHEN, $.condition)), $.semicolon
    ),

    return_statement: $ => choice(
        $.plain_return_statement,
        $.value_return_statement
    ),

    plain_return_statement: $ => seq(
        optional($.label_declaration), $.RETURN, optional(seq($.WHEN, $.condition)), $.semicolon
    ),

    value_return_statement: $ => seq(
        optional($.label_declaration), $.RETURN, $.conditional_or_unaffected_expression, $.semicolon
    ),

    null_statement: $ => seq(
        optional($.label_declaration), $.NULL, $.semicolon
    ),

    sequential_block_statement: $ => seq(
        optional($.label_declaration), $.BLOCK, optional($.IS), repeat($.process_declarative_item), $.BEGIN, repeat($.sequential_statement), $.END, optional($.BLOCK), optional($.label), $.semicolon
    ),

    concurrent_statement: $ => choice(
        $.block_statement,
        $.process_statement,
        $.concurrent_procedure_call_statement,
        $.concurrent_assertion_statement,
        $.concurrent_signal_assignment_statement,
        $.component_instantiation_statement,
        $.generate_statement
    ),

    block_statement: $ => seq(
        $.label_declaration, $.BLOCK, optional(seq($.left_parenthesis, $.condition, $.right_parenthesis)), optional($.IS), optional(seq($.generic_clause, optional(seq($.generic_map_aspect, $.semicolon)))), optional(seq($.port_clause, optional(seq($.port_map_aspect, $.semicolon)))), repeat($.block_declarative_item), $.BEGIN, repeat($.concurrent_statement), $.END, $.BLOCK, optional($.label), $.semicolon
    ),

    process_statement: $ => seq(
        optional($.label_declaration), optional($.POSTPONED), $.PROCESS, optional(seq($.left_parenthesis, $.process_sensitivity_list, $.right_parenthesis)), optional($.IS), repeat($.process_declarative_item), $.BEGIN, repeat($.sequential_statement), $.END, optional($.POSTPONED), $.PROCESS, optional($.label), $.semicolon
    ),

    process_sensitivity_list: $ => choice(
        $.ALL,
        $.sensitivity_list
    ),

    process_declarative_item: $ => choice(
        $.subprogram_declaration,
        $.subprogram_body,
        $.subprogram_instantiation_declaration,
        $.package_declaration,
        $.package_body,
        $.package_instantiation_declaration,
        $.type_declaration,
        $.subtype_declaration,
        $.constant_declaration,
        $.variable_declaration,
        $.file_declaration,
        $.alias_declaration,
        $.attribute_declaration,
        $.attribute_specification,
        $.use_clause,
        $.group_template_declaration,
        $.group_declaration
    ),

    concurrent_procedure_call_statement: $ => seq(
        optional($.label_declaration), optional($.POSTPONED), $.procedure_call, $.semicolon
    ),

    concurrent_assertion_statement: $ => seq(
        optional($.label_declaration), optional($.POSTPONED), $.assertion, $.semicolon
    ),

    concurrent_signal_assignment_statement: $ => choice(
        seq(optional($.label_declaration), optional($.POSTPONED), $.concurrent_simple_signal_assignment),
        seq(optional($.label_declaration), optional($.POSTPONED), $.concurrent_conditional_signal_assignment),
        seq(optional($.label_declaration), optional($.POSTPONED), $.concurrent_selected_signal_assignment)
    ),

    concurrent_simple_signal_assignment: $ => seq(
        $.target, $.signal_assignment, optional($.GUARDED), optional($.delay_mechanism), $.waveform, $.semicolon
    ),

    concurrent_conditional_signal_assignment: $ => seq(
        $.target, $.signal_assignment, optional($.GUARDED), optional($.delay_mechanism), $.conditional_waveforms, $.semicolon
    ),

    concurrent_selected_signal_assignment: $ => seq(
        $.WITH, $.expression, $.SELECT, optional($.question_mark), $.target, $.signal_assignment, optional($.GUARDED), optional($.delay_mechanism), $.selected_waveforms, $.semicolon
    ),

    component_instantiation_statement: $ => seq(
        $.label_declaration, $.instantiated_unit, optional($.generic_map_aspect), optional($.port_map_aspect), $.semicolon
    ),

    instantiated_unit: $ => choice(
        seq(optional($.COMPONENT), $.component_name),
        seq($.ENTITY, $.entity_name, optional(seq($.left_parenthesis, $.architecture_identifier, $.right_parenthesis))),
        seq($.CONFIGURATION, $.configuration_name)
    ),

    generate_statement: $ => choice(
        $.for_generate_statement,
        $.if_generate_statement,
        $.case_generate_statement
    ),

    for_generate_statement: $ => seq(
        $.label_declaration, $.FOR, $.parameter_specification, $.GENERATE, optional($.generate_statement_body_begin), repeat($.concurrent_statement), optional($.generate_statement_body_end), $.END, $.GENERATE, optional($.label), $.semicolon
    ),

    if_generate_statement: $ => seq(
        $.label_declaration, $.IF, optional($.label_declaration), $.condition, $.GENERATE, optional($.generate_statement_body_begin), repeat($.concurrent_statement), optional($.generate_statement_body_end), repeat(seq($.ELSIF, optional($.label_declaration), $.condition, $.GENERATE, optional($.generate_statement_body_begin), repeat($.concurrent_statement), optional($.generate_statement_body_end))), optional(seq($.ELSE, optional($.label_declaration), $.GENERATE, optional($.generate_statement_body_begin), repeat($.concurrent_statement), optional($.generate_statement_body_end))), $.END, $.GENERATE, optional($.label), $.semicolon
    ),

    case_generate_statement: $ => seq(
        $.label_declaration, $.CASE, $.expression, $.GENERATE, $.case_generate_alternative, repeat($.case_generate_alternative), $.END, $.GENERATE, optional($.label), $.semicolon
    ),

    case_generate_alternative: $ => seq(
        $.WHEN, optional($.label_declaration), $.choices, $.arrow, optional($.generate_statement_body_begin), repeat($.concurrent_statement), optional($.generate_statement_body_end)
    ),

    generate_statement_body_begin: $ => seq(
        repeat($.block_declarative_item), $.BEGIN
    ),

    generate_statement_body_end: $ => seq(
        $.END, optional($.label), $.semicolon
    ),

    label_declaration: $ => seq(
      $.label, $.colon
    ),

    label: $ => seq(
        $.identifier
    ),

    use_clause: $ => seq(
        $.USE, $.selected_name, repeat(seq($.comma, $.selected_name)), $.semicolon
    ),

    design_unit: $ => seq(
        repeat($.context_item), $.library_unit
    ),

    library_unit: $ => choice(
        $.primary_unit,
        $.secondary_unit
    ),

    primary_unit: $ => choice(
        $.entity_declaration,
        $.configuration_declaration,
        $.package_declaration,
        $.package_instantiation_declaration,
        $.context_declaration
    ),

    secondary_unit: $ => choice(
        $.architecture_body,
        $.package_body
    ),

    library_clause: $ => seq(
        $.LIBRARY, $.logical_name_list, $.semicolon
    ),

    logical_name_list: $ => seq(
        $.logical_name, repeat(seq($.comma, $.logical_name))
    ),

    logical_name: $ => seq(
        $.identifier
    ),

    context_declaration: $ => seq(
        $.CONTEXT, $.identifier, $.IS, repeat($.context_item), $.END, optional($.CONTEXT), optional($.context_simple_name), $.semicolon
    ),

    context_item: $ => choice(
        $.library_clause,
        $.use_clause,
        $.context_reference
    ),

    context_reference: $ => seq(
        $.CONTEXT, $.selected_name, repeat(seq($.comma, $.selected_name)), $.semicolon
    ),

    tool_directive: $ => seq(
        $.grave_accent, $.identifier, repeat($.graphic_character)
    ),


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
    //--------------------------------------------------------------------------

    entity_name:                    $ => $.name,
    architecture_name:              $ => $.name,
    range_attribute_name:           $ => $.name,
    unit_name:                      $ => $.name,
    uninstantiated_subprogram_name: $ => $.name,
    uninstantiated_package_name:    $ => $.name,
    instantiated_package_name:      $ => $.name,
    resolution_function_name:       $ => $.name,
    type_name:                      $ => $.name,
    subtype_name:                   $ => $.name,
    mode_view_name:                 $ => $.name,
    subprogram_name:                $ => $.name,
    function_name:                  $ => $.name,
    procedure_name:                 $ => $.name,
    generic_name:                   $ => $.name,
    port_name:                      $ => $.name,
    parameter_name:                 $ => $.name,
    signal_name:                    $ => $.name,
    variable_name:                  $ => $.name,
    file_name:                      $ => $.name,
    subprogram_name:                $ => $.name,
    group_template_name:            $ => $.name,
    component_name:                 $ => $.name,
    configuration_name:             $ => $.name,
    verification_unit_name:         $ => $.name,
    indexed_name:                   $ => $.name,
    slice_name:                     $ => $.name,
    attribute_name:                 $ => $.name,
    external_name:                  $ => $.name,

    entity_simple_name:             $ => $.simple_name,
    element_simple_name:            $ => $.simple_name,
    architecture_simple_name:       $ => $.simple_name,
    configuration_simple_name:      $ => $.simple_name,
    package_simple_name:            $ => $.simple_name,
    physical_type_simple_name:      $ => $.simple_name,
    record_type_simple_name:        $ => $.simple_name,
    record_element_simple_name:     $ => $.simple_name,
    protected_type_simple_name:     $ => $.simple_name,
    record_element_simple_name:     $ => $.simple_name,
    component_simple_name:          $ => $.simple_name,
    mode_view_simple_name:          $ => $.simple_name,
    record_element_simple_name:     $ => $.simple_name,
    attribute_simple_name:          $ => $.simple_name,
    package_simple_name:            $ => $.simple_name,
    object_simple_name:             $ => $.simple_name,
    context_simple_name:            $ => $.simple_name,

    file_logical_name:              $ => $.logical_name,
    library_logical_name:           $ => $.logical_name,

    return_identifier:              $ => $.identifier,
    architecture_identifier:        $ => $.identifier,
  }
});


