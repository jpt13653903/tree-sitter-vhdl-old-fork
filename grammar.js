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

    $.abs,
    $.access,
    $.after,
    $.alias,
    $.all,
    $.and,
    $.architecture,
    $.array,
    $.assert,
    $.assume,
    $.assume_guarantee,
    $.attribute,
    $.begin,
    $.block,
    $.body,
    $.buffer,
    $.bus,
    $.case,
    $.component,
    $.configuration,
    $.constant,
    $.context,
    $.cover,
    $.default,
    $.disconnect,
    $.downto,
    $.else,
    $.elsif,
    $.end,
    $.entity,
    $.exit,
    $.fairness,
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
    $.mod,
    $.nand,
    $.new,
    $.next,
    $.nor,
    $.not,
    $.null,
    $.of,
    $.on,
    $.open,
    $.or,
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
    $.rem,
    $.report,
    $.restrict,
    $.restrict_guarantee,
    $.return,
    $.rol,
    $.ror,
    $.select,
    $.sequence,
    $.severity,
    $.signal,
    $.shared,
    $.sla,
    $.sll,
    $.sra,
    $.srl,
    $.strong,
    $.subtype,
    $.then,
    $.to,
    $.transport,
    $.type,
    $.unaffected,
    $.units,
    $.until,
    $.use,
    $.variable,
    $.vmode,
    $.vprop,
    $.vunit,
    $.wait,
    $.when,
    $.while,
    $.with,
    $.xnor,
    $.xor,

    $.reserved_end_marker, // Scanner internal use only

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

    $.delimiter_end_marker, // Scanner internal use only

    $.decimal_literal,
    $.decimal_literal_float,
    $.based_literal,
    $.based_literal_float,
    $.character_literal,
    $.string_literal,
    $.bit_string_literal,
    $.comment,
    $.tool_directive,
    $.tool_directive_standard,
    $.tool_directive_common,

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
    $.comment,
    $.tool_directive,
    $.tool_directive_standard,
    $.tool_directive_common,
    /\s/,
  ],

  rules: {
    design_file: $ => repeat1($.design_unit)

    entity_declaration: $ => seq(
      $.entity, $.identifier, $.is,
      optional($.generic_clause),
      optional($.port_clause),
      $.entity_declarative_part,
      optional(seq(
        $.begin,
        $.entity_statement_part
      )),
      $.end, optional($.entity), optional($.simple_name), $.semicolon
    ),


    entity_declarative_part: $ => repeat($.entity_declarative_item),

    entity_declarative_item: $ => choice(
      $.subprogram_declaration,
      $.subprogram_body,
      $.subprogram_instantiation_declaration,
      $.package_declaration,
      $.package_body,
      $.package_instantiation_declaration,
      $.type_declaration,
      $.subtype_declaration,
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
      $.group_declaration,
      $.Property_Declaration,
      $.Sequence_Declaration,
      $.Clock_Declaration
    ),

    entity_statement_part: $ => repeat(entity_statement),

    entity_statement: $ => choice(
      $.concurrent_assertion_statement,
      $.concurrent_procedure_call_statement,
      $.process_statement,
      $.PSL_Directive
    ),

    architecture_body: $ => seq(
      $.architecture, $.identifier, $.of, $.name, $.is,
        $.architecture_declarative_part,
      $.begin,
        $.architecture_statement_part,
      $.end, optional($.architecture), optional($.simple_name)
    ),

    architecture_declarative_part: $ => repeat(
      $.block_declarative_item
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
      $.group_declaration,
      $.Property_Declaration,
      $.Sequence_Declaration,
      $.Clock_Declaration
    ),

    architecture_statement_part: $ => repeat(
      $.concurrent_statement
    ),

    configuration_declaration: $ => seq(
      $.configuration, $.identifier, $.of, $.name, $.is,
        $.configuration_declarative_part,
        repeat($.verification_unit_binding_indication, $.semicolon),
        $.block_configuration,
      $.end, optional($.configuration), optional($.simple_name),
      $.semicolon
    ),

    configuration_declarative_part: $ => repeat(
      $.configuration_declarative_item
    ),

    configuration_declarative_item: $ => choice(
      $.use_clause,
      $.attribute_specification,
      $.group_declaration
    ),

    block_configuration: $ => seq(
      $.for, $.block_specification,
        repeat($.use_clause),
        repeat($.configuration_item),
      $.end, $.for, $.semicolon
    ),

    block_specification: $ => seq(
      $.name,
      optional($.left_parenthesis, $.generate_specification, $.right_parenthesis)
    ),

    generate_specification: $ => choice(
      $.discrete_range
      $.expression
      $.identifier
    ),

    configuration_item: $ => choice(
      $.block_configuration,
      $.component_configuration
    ),

    component_configuration: $ => seq(
      $.for, $.component_specification,
        optional($.binding_indication, $.semicolon),
        repeat($.verification_unit_binding_indication, $.semicolon),
        optional($.block_configuration),
      $.end, $.for, $.semicolon
    ),

    subprogram_declaration: $ => seq(
      $.subprogram_specification, $.semicolon
    ),

    subprogram_specification: $ => choice(
      $.procedure_specification,
      $.function_specification
    ),

    procedure_specification: $ => seq(
      $.procedure, $.designator,
      optional(
        $.generic, $.left_parenthesis, $.generic_list, $.right_parenthesis,
        optional($.generic_map_aspect)
      ),
      optional(seq(
        optional($.parameter),
        $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis
      ))
    ),

    function_specification: $ => seq(
      optional(choice($.pure, $.impure)), $.function, $.designator,
      optional(
        $.generic, $.left_parenthesis, $.generic_list, $.right_parenthesis,
        optional($.generic_map_aspect)
      ),
      optional(seq(
        optional($.parameter),
        $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis
      )),
      $.return, $.type_mark
    ),

    designator: $ => choice($.identifier, $.operator_symbol),

    operator_symbol: $ => $.string_literal,

    formal_parameter_list: $ => $.interface_list,

    subprogram_body: $ => seq(
      $.subprogram_specification, $.is,
        $.subprogram_declarative_part,
      $.begin,
        $.subprogram_statement_part,
      $.end, optional(subprogram_kind), optional(designator), $.semicolon
    ),

    subprogram_declarative_part: $ => repeat(
      $.subprogram_declarative_item
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

    subprogram_statement_part: $ => repeat(
      $.sequential_statement
    ),

    subprogram_kind: $ => choice($.procedure, $.function),

    subprogram_instantiation_declaration: $ => seq(
      $.subprogram_kind, $.designator, $.is, $.new, $.name,
      optional($.signature),
      optional($.generic_map_aspect), $.semicolon
    ),

    package_declaration: $ => seq(
      $.package, $.identifier, $.is,
      optional(seq(
        $.generic_clause,
        optional($.generic_map_aspect, $.semicolon)
      )),
      $.package_declarative_part,
      $.end, optional(package), optional(simple_name), $.semicolon
    ),

    package_declarative_part: $ => repeat(
      $.package_declarative_item
    ),

    package_declarative_item: $ => choice(
      $.subprogram_declaration,
      $.subprogram_instantiation_declaration,
      $.package_declaration,
      $.package_instantiation_declaration,
      $.type_declaration,
      $.subtype_declaration,
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
      $.group_declaration,
      $.Property_Declaration,
      $.Sequence_Declaration
    ),

    package_body: $ => seq(
      $.package, $.body, $.simple_name, $.is,
        $.package_body_declarative_part,
      $.end, optional($.package, $.body), optional($.simple_name, $.semicolon)
    ),

    package_body_declarative_part: $ => repeat(
      $.package_body_declarative_item
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
      $.package, $.identifier, $.is, $.new, $.name,
      optional($.generic_map_aspect), $.semicolon
    ),

    scalar_type_definition: $ => choice(
      $.enumeration_type_definition,
      $.integer_type_definition,
      $.floating_type_definition,
      $.physical_type_definition
    ),

    range_constraint: $ => $.range $.range_spec,

    range_spec: $ => choice(
      $.attribute_name,
      seq($.simple_expression, $.direction, $.simple_expression)
    ),

    direction: $ => choice($.to, $.downto),

    enumeration_type_definition: $ => seq(
      $.left_parenthesis, $.enumeration_literal,
      repeat($.comma, $.enumeration_literal) $.right_parenthesis,
    ),

    enumeration_literal: $ => choice($.identifier, $.character_literal),

    integer_type_definition: $ => $.range_constraint,

    physical_type_definition: $ => seq(
      $.range_constraint,
      $.units,
        $.primary_unit_declaration,
        repeat($.secondary_unit_declaration),
      $.end, $.units, optional($.simple_name)
    ),

    primary_unit_declaration: $ => seq($.identifier, $.semicolon),

    secondary_unit_declaration: $ => seq(
      $.identifier, $.equals_sign, $.physical_literal, $.semicolon
    ),

    physical_literal: $ => seq(
      optional($.abstract_literal), $.name
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
      $.array, $.left_parenthesis, $.index_subtype_definition,
      repeat($.comma, $.index_subtype_definition), $.right_parenthesis,
      $.of, $.subtype_indication
    ),

    constrained_array_definition: $ => seq(
      $.array, $.index_constraint, $.of, $.subtype_indication
    ),

    index_subtype_definition: $ => seq($.type_mark, $.range, $.box),

    array_constraint: $ => choice(
      seq($.index_constraint, optional($.array_element_constraint)),
      seq($.left_parenthesis $.open $.right_parenthesis,
          optional(array_element_constraint))
    ),

    array_element_constraint: $ => $.element_constraint,

    index_constraint: $ => seq(
      $.left_parenthesis, $.discrete_range,
      repeat($.comma, $.discrete_range), $.right_parenthesis
    ),

    discrete_range: $ => choice(
      $.discrete_subtype_indication,
      $.range_spec
    ),

    record_type_definition: $ => seq(
      $.record,
      $.element_declaration,
      repeat($.element_declaration),
      $.end, $.record, optional($.simple_name)
    ),

    element_declaration: $ => seq(
      $.identifier_list, $.colon, $.element_subtype_definition, $.semicolon
    ),

    identifier_list: $ => seq(
      $.identifier, repeat($.comma, $.identifier)
    ),

    element_subtype_definition: $ => $.subtype_indication,

    record_constraint: $ => seq(
      $.left_parenthesis, $.record_element_constraint,
      repeat($.comma, $.record_element_constraint), $.right_parenthesis
    ),

    record_element_constraint: $ => seq(
      $.simple_name, $.element_constraint
    ),

    access_type_definition: $ => seq($.access, $.subtype_indication),

    incomplete_type_declaration: $ => seq($.type, $.identifier, $.semicolon),

    file_type_definition: $ => seq($.file, $.of, $.type_mark),

    protected_type_definition: $ => choice(
      $.protected_type_declaration,
      $.protected_type_body
    ),

    protected_type_declaration: $ => seq(
      $.protected,
      $.protected_type_declarative_part,
      $.end, $.protected, optional($.simple_name)
    ),

    protected_type_declarative_part: $ => repeat(
      $.protected_type_declarative_item
    ),

    protected_type_declarative_item: $ => choice(
      $.subprogram_declaration,
      $.subprogram_instantiation_declaration,
      $.attribute_specification,
      $.use_clause
    ),

    protected_type_body: $ => seq(
      $.protected, $.body,
      $.protected_type_body_declarative_part
      $.end, $.protected, $.body, optional($.simple_name)
    ),

    protected_type_body_declarative_part: $ => repeat(
      $.protected_type_body_declarative_item
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

    type_declaration: $ => choice(
      $.full_type_declaration,
      $.incomplete_type_declaration
    ),

    full_type_declaration: $ => seq(
      $.type, $.identifier, $.is, $.type_definition, $.semicolon
    ),

    type_definition: $ => choice(
      $.scalar_type_definition,
      $.composite_type_definition,
      $.access_type_definition,
      $.file_type_definition,
      $.protected_type_definition
    ),

    subtype_declaration: $ => seq(
      $.subtype, $.identifier, $.is, $.subtype_indication, $.semicolon
    ),

    subtype_indication: $ => seq(
      optional($.resolution_indication), $.type_mark, optional($.constraint)
    ),

    resolution_indication: $ => choice(
      $.name,
      seq($.left_parenthesis, $.element_resolution, $.right_parenthesis)
    ),

    element_resolution: $ => choice(
      $.array_element_resolution,
      $.record_resolution
    ),

    array_element_resolution: $ => $.resolution_indication,

    record_resolution: $ => seq(
      $.record_element_resolution,
      repeat($.comma, $.record_element_resolution)
    ),

    record_element_resolution: $ => seq(
      $.simple_name, $.resolution_indication
    ),

    type_mark: $ => $.name,

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
      $.constant, $.identifier_list, $.colon, $.subtype_indication,
      optional($.variable_assignment, $.expression) $.semicolon
    ),

    signal_declaration: $ => seq(
      $.signal, $.identifier_list, $.colon, $.subtype_indication,
      optional(signal_kind),
      optional($.variable_assignment, $.expression) $.semicolon
    ),

    signal_kind: $ => choice($.register | $.bus),

    variable_declaration: $ => seq(
      optional($.shared),
      $.variable, $.identifier_list, $.colon, $.subtype_indication,
      optional($.variable_assignment, $.expression) $.semicolon
    ),

    file_declaration: $ => seq(
      $.file, $.identifier_list, $.colon, $.subtype_indication,
      optional($.file_open_information), $.semicolon
    ),

    file_open_information: $ => seq(
      optional($.open, $.file_open_kind_expression), $.is, $.file_logical_name
    ),

    file_logical_name: $ => $.expression,

    interface_declaration: $ => choice(
      $.interface_object_declaration,
      $.interface_type_declaration,
      $.interface_subprogram_declaration,
      $.interface_package_declaration
    ),

    interface_object_declaration: $ => choice(
      $.interface_constant_declaration,
      $.interface_signal_declaration,
      $.interface_variable_declaration,
      $.interface_file_declaration
    ),

    interface_constant_declaration: $ => seq(
      optional($.constant), $.identifier_list, $.colon,
      optional($.in), $.subtype_indication,
      optional($.variable_assignment, $.expression)
    ),

    interface_signal_declaration: $ => seq(
      optional(signal) $.identifier_list, $.colon,
      optional(mode), $.subtype_indication, optional(bus),
      optional($.variable_assignment, $.expression)
    )

    interface_variable_declaration: $ => seq(
      optional($.variable), $.identifier_list, $.colon,
      optional(mode), $.subtype_indication,
      optional($.variable_assignment, $.expression)
    ),

    interface_file_declaration: $ => seq(
      $.file, $.identifier_list, $.colon, $.subtype_indication
    ),

    mode: $ => choice(
      $.in, $.out, $.inout, $.buffer, $.linkage
    ),

    interface_type_declaration: $ => $.interface_incomplete_type_declaration,

    interface_incomplete_type_declaration: $ => seq($.type, $.identifier),

    interface_subprogram_declaration: $ => seq(
      $.interface_subprogram_specification,
      optional($.is, $.interface_subprogram_default)
    ),

    interface_subprogram_specification: $ => choice(
      $.interface_procedure_specification,
      $.interface_function_specification
    ),

    interface_procedure_specification: $ => seq(
      $.procedure, $.designator,
      optional(seq(optional($.parameter),
        $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis
      ))
    ),

    interface_function_specification: $ => seq(
      optional(choice($.pure, $.impure)), $.function, $.designator,
      optional(seq(optional($.parameter),
        $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis
      )), $.return, $.type_mark
    ),

    interface_subprogram_default: $ => choice($.name, $.box),

    interface_package_declaration: $ => seq(
      $.package, $.identifier, $.is, $.new, $.name,
      $.interface_package_generic_map_aspect
    ),

    interface_package_generic_map_aspect: $ => choice(
      $.generic_map_aspect,
      seq($.generic, $.map, $.left_parenthesis $.box $.right_parenthesis),
      seq($.generic, $.map, $.left_parenthesis $.default $.right_parenthesis)
    ),

    interface_list: $ => seq(
      $.interface_element, repeat($.semicolon, $.interface_element)
    ),

    interface_element: $ => $.interface_declaration,

    generic_clause: $ => seq(
      $.generic, $.left_parenthesis, $.generic_list, $.right_parenthesis, $.semicolon
    ),

    generic_list: $ => $.interface_list,

    port_clause: $ => seq(
      $.port, $.left_parenthesis, $.port_list, $.right_parenthesis, $.semicolon
    ),

    port_list: $ => $.interface_list,

    association_list: $ => seq(
      $.association_element, repeat($.comma, $.association_element)
    ),

    association_element: $ => seq(
      optional($.formal_part, $.arrow), $.actual_part
    ),

    formal_part: $ => choice(
      $.formal_designator,
      seq($.name,       $.left_parenthesis, $.formal_designator, $.right_parenthesis),
      seq($.type_mark,  $.left_parenthesis, $.formal_designator, $.right_parenthesis)
    ),

    formal_designator: $ => $.name,

    actual_part: $ => choice(
      $.actual_designator,
      seq($.name,       $.left_parenthesis, $.actual_designator, $.right_parenthesis),
      seq($.type_mark,  $.left_parenthesis, $.actual_designator, $.right_parenthesis)
    ),

    actual_designator: $ => choice(
      seq(optional($.inertial), $.expression),
      $.identifier,
      $.subtype_indication,
      $.open
    ),

    generic_map_aspect: $ => seq(
      $.generic, $.map,
      $.left_parenthesis, $.generic_association_list, $.right_parenthesis
    ),

    port_map_aspect: $ => seq(
      $.port, $.map,
      $.left_parenthesis, $.port_association_list, $.right_parenthesis
    ),

    alias_declaration: $ => seq(
      $.alias, $.alias_designator,
      optional($.colon, $.subtype_indication), $.is, $.name
      optional($.signature) $.semicolon
    ),

    alias_designator: $ => choice(
      $.identifier, $.character_literal, $.operator_symbol
    ),

    attribute_declaration: $ => seq(
      $.attribute, $.identifier, $.colon, $.type_mark, $.semicolon
    ),

    component_declaration: $ => seq(
      $.component, $.identifier, optional($.is),
      optional($.local_generic_clause),
      optional($.local_port_clause),
      $.end. $.component, optional($.simple_name) $.semicolon
    ),

    group_template_declaration: $ => seq(
      $.group, $.identifier, $.is,
      $.left_parenthesis, $.entity_class_entry_list, $.right_parenthesis, $.semicolon
    ),

    entity_class_entry_list: $ => seq(
      $.entity_class_entry, repeat($.comma, $.entity_class_entry)
    ),

    entity_class_entry: $ => seq(
      $.entity_class, optional($.box)
    ),

    group_declaration: $ => seq(
      $.group, $.identifier, $.colon, $.name,
      $.left_parenthesis, $.group_constituent_list, $.right_parenthesis, $.semicolon
    ),

    group_constituent_list: $ => seq(
      $.group_constituent, repeat($.comma, $.group_constituent)
    ),

    group_constituent: $ => choice($.name, $.character_literal),

    attribute_specification: $ => seq(
      $.attribute, $.attribute_designator, $.of, $.entity_specification, $.is,
      $.expression, $.semicolon
    ),

    entity_specification: $ => seq(
      $.entity_name_list, $.colon, $.entity_class
    ),

    entity_class: $ => choice(
      $.entity,
      $.architecture,
      $.configuration,
      $.procedure,
      $.function,
      $.package,
      $.type,
      $.subtype,
      $.constant,
      $.signal,
      $.variable,
      $.component,
      $.label,
      $.literal,
      $.units,
      $.group,
      $.file,
      $.property,
      $.sequence
    ),

    entity_name_list: $ => choice(
      seq($.entity_designator, repeat($.comma, $.entity_designator)),
      $.others,
      $.all
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
      $.for, $.component_specification, $.binding_indication, $.semicolon,
      optional($.end, $.for, $.semicolon),
    ),

    compound_configuration_specification: $ => seq(
      $.for, $.component_specification, $.binding_indication, $.semicolon,
      $.verification_unit_binding_indication, $.semicolon,
      repeat($.verification_unit_binding_indication, $.semicolon),
      $.end, $.for, $.semicolon
    ),

    component_specification: $ => seq(
      $.instantiation_list, $.colon, $.name
    ),

    instantiation_list: $ => choice(
      seq($.identifier, repeat($.comma, $.identifier)),
      $.others,
      $.all
    ),

    binding_indication: $ => seq(
      optional($.use, $.entity_aspect),
      optional($.generic_map_aspect),
      optional($.port_map_aspect)
    ),

    entity_aspect: $ => choice(
      seq($.entity, $.name, optional(seq(
        $.left_parenthesis, $.identifier $.right_parenthesis))),
      seq($.configuration, $.name),
      $.open
    ),

    verification_unit_binding_indication: $ => seq(
      $.use, $.vunit, $.verification_unit_list,
    ),

    verification_unit_list: $ => seq(
      $.name, repeat($.comma, $.name)
    ),

    disconnection_specification: $ => seq(
      $.disconnect, $.guarded_signal_specification,
      $.after, $.time_expression, $.semicolon
    ),

    guarded_signal_specification: $ => seq(
      $.guarded_signal_list, $.colon, $.type_mark
    ),

    signal_list: $ => seq(
      seq($.name, repeat($.comma, $.name)),
      $.others,
      $.all
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

    prefix: $ => choice($.name, $.function_call),

    simple_name: $ => $.identifier,

    selected_name: $ => seq($.prefix, $.dot, $.suffix),

    suffix: $ => choice(
      $.simple_name,
      $.character_literal,
      $.operator_symbol,
      $.all
    ),

    indexed_name: $ => seq(
      $.prefix, $.left_parenthesis, $.expression,
      repeat($.comma, $.expression), $.right_parenthesis
    ),

    slice_name: $ => seq(
      $.prefix, $.left_parenthesis, $.discrete_range, $.right_parenthesis
    ),

    attribute_name: $ => seq(
      $.prefix, optional($.signature), $.tick, $.attribute_designator,
      optional($.left_parenthesis, $.expression, $.right_parenthesis),
    ),

    $.attribute_designator: $ => $.simple_name,

    external_name: $ => choice(
      $.external_constant_name,
      $.external_signal_name,
      $.external_variable_name
    ),

    external_constant_name: $ => seq(
      $.double_less_than, $.constant, $.external_pathname, $.colon,
      $.subtype_indication, $.double_greater_than
    ),

    external_signal_name: $ => seq(
      $.double_less_than, $.signal, $.external_pathname, $.colon,
      $.subtype_indication, $.double_greater_than
    ),

    external_variable_name: $ => seq(
      $.double_less_than, $.variable, $.external_pathname, $.colon,
      $.subtype_indication, $.double_greater_than
    ),

    external_pathname: $ => choice(
      $.package_pathname,
      $.absolute_pathname,
      $.relative_pathname
    ),

    package_pathname: $ => seq(
      $.commercial_at, $.logical_name, $.dot, $.simple_name,
      repeat1($.dot, $.simple_name)
    ),

    absolute_pathname: $ => seq(
      $.dot, $.partial_pathname
    ),

    relative_pathname: $ => seq(
      repeat($.circumflex, $.dot), $.partial_pathname
    ),

    partial_pathname: $ => seq(
      repeat($.pathname_element, $.dot), $.simple_name
    ),

    pathname_element: $ => seq(
      $.identifier,
      optional(seq($.left_parenthesis, $.expression, $.right_parenthesis))
    ),

    expression: $ => choice(
      seq($.condition_operator, $.primary),
      $.logical_expression
    ),

    logical_expression: $ => choice(
      seq($.relation, repeat(  $.and,  $.relation)),
      seq($.relation, repeat(  $.or,   $.relation)),
      seq($.relation, repeat(  $.xor,  $.relation)),
      seq($.relation, optional($.nand, $.relation)),
      seq($.relation, optional($.nor,  $.relation)),
      seq($.relation, repeat(  $.xnor, $.relation))
    ),

    relation: $ => seq(
      $.shift_expression, optional($.relational_operator, $.shift_expression)
    ),

    shift_expression: $ => seq(
      $.simple_expression, optional($.shift_operator, $.simple_expression)
    ),

    simple_expression: $ => seq(
      optional($.sign), $.term, repeat($.adding_operator, $.term)
    ),

    term: $ => seq(
      $.factor, repeat($.multiplying_operator, $.factor)
    ),

    factor: $ => choice(
      seq($.primary, optional($.exponentiate, $.primary)),
      seq($.abs, $.primary),
      seq($.not, $.primary),
      seq($.logical_operator, $.primary)
    ),

    primary: $ => choice(
      $.name,
      $.literal,
      $.aggregate,
      $.function_call,
      $.qualified_expression,
      $.type_conversion,
      $.allocator,
      seq($.left_parenthesis, $.expression, $.right_parenthesis)
    ),

    condition_operator: $ => $.condition_conversion,

    logical_operator: $ => choice(
      $.and, $.or, $.nand, $.nor, $.xor, $.xnor
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

    shift_operator:         $ => choice($.sll, $.srl, $.sla, $.sra, $.rol, $.ror),
    adding_operator:        $ => choice($.plus_sign, $.minus_sign, $.ampersand),
    sign:                   $ => choice($.plus_sign, $.minus_sign),
    multiplying_operator:   $ => choice($.multiply, $.divide, $.mod, $.rem),
    miscellaneous_operator: $ => choice($.exponentiate, $.abs, $.not),

    literal: $ => choice(
      $.numeric_literal,
      $.enumeration_literal,
      $.string_literal,
      $.bit_string_literal,
      $.null
    ),

    numeric_literal: $ => choice(
      $.abstract_literal,
      $.physical_literal
    ),

    aggregate: $ => seq(
      $.left_parenthesis, $.element_association,
      repeat($.comma, $.element_association), $.right_parenthesis
    ),

    element_association: $ => seq(
      optional($.choices, $.arrow), $.expression
    ),

    choices: $ => seq(
      $.choice, repeat($.vertical_bar, $.choice)
    ),

    choice: $ => choice(
      $.expression,
      $.discrete_range,
      $.simple_name,
      $.others
    ),

    function_call: $ => seq(
      $.function_name,
      optional($.left_parenthesis, $.actual_parameter_part, $.right_parenthesis)
    ),

    actual_parameter_part: $ => $.association_list,

    qualified_expression: $ => choice(
      seq($.type_mark, $.tick, $.left_parenthesis, $.expression, $.right_parenthesis),
      seq($.type_mark, $.tick, $.aggregate)
    ),

    type_conversion: $ => seq(
      $.type_mark, $.left_parenthesis, $.expression, $.right_parenthesis
    ),

    allocator: $ => choice(
      seq($.new, $.subtype_indication),
      seq($.new, $.qualified_expression)
    ),

    sequence_of_statements: $ => repeat($.sequential_statement),

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
      $.null_statement
    ),

    wait_statement: $ => seq(
      optional($.label_spec), $.wait,
      optional($.sensitivity_clause), optional($.condition_clause),
      optional($.timeout_clause), $.semicolon
    ),

    sensitivity_clause: $ => seq(
      $.on, $.sensitivity_list
    ),

    sensitivity_list: $ => seq(
      $.name, repeat($.comma, $.name)
    ),

    condition_clause: $ => seq(
      $.until, $.condition
    ),

    condition: $ => $.expression,

    timeout_clause: $ => seq(
      $.for, $.expression
    ),

    assertion_statement: $ => seq(
      optional($.label_spec), $.assertion, $.semicolon
    ),

    assertion: $ => seq(
      $.assert, $.condition,
      optional($.report, $.expression),
      optional($.severity, $.expression)
    ),

    report_statement: $ => seq(
      optional($.label_spec),
      $.report, $.expression,
      optional($.severity, $.expression), $.semicolon
    ),


    signal_assignment_statement: $ => seq(
      optional($.label_spec),
      choice(
        $.simple_signal_assignment,
        $.conditional_signal_assignment,
        $.selected_signal_assignment
      )
    ),

    simple_signal_assignment: $ => choice(
      $.simple_waveform_assignment,
      $.simple_force_assignment,
      $.simple_release_assignment
    ),

    simple_waveform_assignment: $ => seq(
      $.target, $.signal_assignment,
      optional($.delay_mechanism), $.waveform, $.semicolon
    ),

    simple_force_assignment: $ => seq(
      $.target, $.signal_assignment, $.force,
      optional($.force_mode), $.expression, $.semicolon
    ),

    simple_release_assignment: $ => seq(
      $.target, $.signal_assignment, $.release,
      optional($.force_mode), $.semicolon
    ),

    force_mode: $ => choice($.in, $.out),

    delay_mechanism: $ => choice(
      $.transport,
      seq(optional($.reject, $.expression), $.inertial)
    ),

    target: $ => choice($.name, $.aggregate),

    waveform: $ => choice(
      seq($.waveform_element, repeat($.comma, $.waveform_element)),
      $.unaffected
    ),

    waveform_element: $ => choice(
      seq($.value_expression, optional($.after, $.time_expression)),
      seq($.null, optional($.after, $.time_expression))
    ),

    conditional_signal_assignment: $ => choice(
      $.conditional_waveform_assignment,
      $.conditional_force_assignment
    ),

    conditional_waveform_assignment: $ => seq(
      $.target, $.signal_assignment,
      optional($.delay_mechanism), $.conditional_waveforms, $.semicolon
    ),

    conditional_waveforms: $ => seq(
      $.waveform, $.when, $.condition,
      repeat($.else, $.waveform, $.when, $.condition),
      optional($.else, $.waveform)
    ),

    conditional_force_assignment: $ => seq(
      $.target, $.signal_assignment, $.force,
      optional($.force_mode), $.conditional_expressions, $.semicolon
    ),

    conditional_expressions: $ => seq(
      $.expression, $.when, $.condition,
      repeat($.else, $.expression, $.when, $.condition),
      optional($.else, $.expression)
    ),

    selected_signal_assignment: $ => choice(
      $.selected_waveform_assignment,
      $.selected_force_assignment
    ),

    selected_waveform_assignment: $ => seq(
      $.with, $.expression, $.select, optional($.question_mark),
      $.target, $.signal_assignment, optional($.delay_mechanism),
      $.selected_waveforms, $.semicolon
    ),

    selected_waveforms: $ => seq(
      repeat($.waveform, $.when, $.choices, $.comma),
      $.waveform, $.when, $.choices
    ),

    selected_force_assignment: $ => seq(
      $.with, $.expression, $.select, optional($.question_mark),
      $.target, $.signal_assignment, $.force,
      optional($.force_mode), $.selected_expressions, $.semicolon
    ),

    selected_expressions: $ => seq(
      repeat($.expression, $.when, $.choices, $.comma),
      $.expression, $.when, $.choices
    ),

    variable_assignment_statement: $ => seq(
      optional($.label_spec),
      choice(
        $.simple_variable_assignment,
        $.conditional_variable_assignment,
        $.selected_variable_assignment
      )
    ),

    simple_variable_assignment: $ => seq(
      $.target, $.variable_assignment, $.expression, $.semicolon
    ),

    conditional_variable_assignment: $ => seq(
      $.target, $.variable_assignment, $.conditional_expressions, $.semicolon
    ),

    selected_variable_assignment: $ => seq(
      $.with, $.expression, $.select, optional($.question_mark),
      $.target, $.variable_assignment, $.selected_expressions, $.semicolon
    ),

    procedure_call_statement: $ => seq(
      optional($.label_spec), $.procedure_call, $.semicolon
    ),

    procedure_call: $ => seq(
      $.procedure_name,
      optional($.left_parenthesis, $.actual_parameter_part $.right_parenthesis)
    ),

    if_statement: $ => seq(
      optional($.label_spec),
      $.if, $.condition, $.then,
        $.sequence_of_statements,
      repeat($.elsif, $.condition, $.then
        $.sequence_of_statements),
      optional($.else,
        $.sequence_of_statements),
      $.end, $.if, optional($.identifier), $.semicolon
    ),

    case_statement: $ => seq(
      optional($.label_spec),
      $.case, optional($.question_mark), $.expression, $.is,
        repeat1($.case_statement_alternative),
      $.end, $.case, optional($.question_mark), optional($.identifier), $.semicolon
    ),

    case_statement_alternative: $ => seq(
      $.when, $.choices, $.arrow,
      $.sequence_of_statements
    ),

    loop_statement: $ => seq(
      optional($.label_spec),
      optional($.iteration_scheme), $.loop,
      $.sequence_of_statements,
      $.end, $.loop, optional($.identifier), $.semicolon
    ),

    iteration_scheme: $ => choice(
      seq($.while, $.condition),
      seq($.for, $.loop_parameter_specification)
    ),

    parameter_specification: $ => seq(
      $.identifier, $.in, $.discrete_range
    ),

    next_statement: $ => seq(
      optional($.label_spec),
      $.next, optional($.identifier), optional($.when, $.condition), $.semicolon
    ),

    exit_statement: $ => seq(
      optional($.label_spec),
      $.exit, optional($.identifier), optional($.when, $.condition), $.semicolon
    ),

    return_statement: $ => seq(
      optional($.label_spec),
      $.return, optional($.expression), $.semicolon
    ),

    null_statement: $ => seq(
      optional($.label_spec),
      $.null, $.semicolon
    ),

    concurrent_statement: $ => choice(
      $.block_statement,
      $.process_statement,
      $.concurrent_procedure_call_statement,
      $.concurrent_assertion_statement,
      $.concurrent_signal_assignment_statement,
      $.component_instantiation_statement,
      $.generate_statement,
      $.PSL_Directive
    ),

    block_statement: $ => seq(
      $.label_spec,
      $.block,
      optional($.left_parenthesis, $.guard_condition, $.right_parenthesis),
      optional($.is),
      $.block_header,
      $.block_declarative_part,
      $.begin,
      $.block_statement_part,
      $.end, $.block, optional($.identifier), $.semicolon
    ),

    block_header: $ => seq(
      optional($.generic_clause, optional($.generic_map_aspect, $.semicolon)),
      optional($.port_clause,    optional($.port_map_aspect,    $.semicolon))
    ),

    block_declarative_part: $ => repeat($.block_declarative_item),

    block_statement_part: $ => repeat($.concurrent_statement),

    process_statement: $ => seq(
      optional($.label_spec),
      optional($.postponed), $.process,
      optional($.left_parenthesis, $.process_sensitivity_list, $.right_parenthesis),
      optional($.is),
      $.process_declarative_part,
      $.begin,
      $.process_statement_part,
      $.end, optional($.postponed), $.process, optional($.identifier), $.semicolon
    ),

    process_sensitivity_list: $ => choice($.all, $.sensitivity_list),

    process_declarative_part: $ => repeat($.process_declarative_item),

    process_declarative_item: $ => choice(
      $.subprogram_declaration,
      $.subprogram_body,
      $.subprogram_instantiation_declaration,
      $.package_declaration,
      $.package_body,
      seq($.package, $.instantiation_declaration),
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

    process_statement_part: $ => repeat($.sequential_statement),

    concurrent_procedure_call_statement: $ => seq(
      optional($.label_spec),
      optional($.postponed), $.procedure_call, $.semicolon
    ),

    concurrent_assertion_statement: $ => seq(
      optional($.label_spec),
      optional($.postponed), $.assertion, $.semicolon
    ),

    concurrent_signal_assignment_statement: $ => seq(
      optional($.label_spec), optional($.postponed), choice(
        $.concurrent_simple_signal_assignment,
        $.concurrent_conditional_signal_assignment,
        $.concurrent_selected_signal_assignment
      )
    ),

    concurrent_simple_signal_assignment: $ => seq(
      $.target, $.signal_assignment, optional($.guarded),
      optional($.delay_mechanism), $.waveform, $.semicolon
    ),

    concurrent_conditional_signal_assignment: $ => seq(
      $.target, $.signal_assignment, optional($.guarded),
      optional($.delay_mechanism), $.conditional_waveforms, $.semicolon
    ),

    concurrent_selected_signal_assignment: $ => seq(
      $.with, $.expression, $.select, optional($.question_mark),
      $.target, $.signal_assignment, optional($.guarded),
      optional($.delay_mechanism), $.selected_waveforms, $.semicolon
    ),

    component_instantiation_statement: $ => seq(
      $.label_spec, $.instantiated_unit,
      optional($.generic_map_aspect),
      optional($.port_map_aspect), $.semicolon
    ),

    instantiated_unit: $ => choice(
      seq(optional($.component), $.name),
      seq($.entity, $.name,
          optional($.left_parenthesis, $.identifier, $.right_parenthesis)),
      seq($.configuration, $.name)
    ),

    generate_statement: $ => choice(
      $.for_generate_statement,
      $.if_generate_statement,
      $.case_generate_statement
    ),

    for_generate_statement: $ => seq(
      $.label_spec,
      $.for, $.generate_parameter_specification, $.generate,
      $.generate_statement_body,
      $.end, $.generate, optional($.identifier), $.semicolon
    ),

    if_generate_statement: $ => seq(
      $.label_spec,
      $.if optional($.label_spec), $.condition, $.generate,
        $.generate_statement_body,
      repeat($.elsif, optional($.label_spec), $.condition, $.generate,
        $.generate_statement_body),
      optional($.else, optional($.label_spec), $.generate,
        $.generate_statement_body),
      $.end, $.generate, optional($.identifier), $.semicolon
    ),

    case_generate_statement: $ => seq(
      $.label_spec,
      $.case, $.expression, $.generate,
      repeat1($.case_generate_alternative),
      $.end, $.generate, optional($.identifier), $.semicolon
    ),

    case_generate_alternative: $ => seq(
      $.when, optional($.label_spec), $.choices, $.arrow,
      $.generate_statement_body
    ),

    generate_statement_body: $ => seq(
      optional($.block_declarative_part, $.begin),
      repeat($.concurrent_statement),
      optional($.end, optional($.identifier), $.semicolon)
    ),

    label_spec: $ => seq($.identifier, $.colon),

    use_clause: $ => seq(
      $.use, $.selected_name, repeat($.comma, $.selected_name), $.semicolon
    ),

    design_unit: $ => seq(
      $.context_clause, $.library_unit
    ),

    library_unit: $ => choice($.primary_unit, $.secondary_unit),

    primary_unit: $ => choice(
      $.entity_declaration,
      $.configuration_declaration,
      $.package_declaration,
      $.package_instantiation_declaration,
      $.context_declaration,
      $.Verification_Unit
    ),

    secondary_unit: $ => choice(
      $.architecture_body,
      $.package_body
    ),

    library_clause: $ => seq(
      $.library, $.logical_name_list, $.semicolon
    ),

    logical_name_list: $ => seq(
      $.logical_name, repeat($.comma, $.logical_name)
    ),

    logical_name: $ => $.identifier,

    context_declaration: $ => seq(
      $.context, $.identifier, $.is,
      $.context_clause,
      $.end, optional($.context), optional($.simple_name), $.semicolon
    ),

    context_clause: $ => repeat($.context_item),

    context_item: $ => choice(
      $.library_clause,
      $.use_clause,
      $.context_reference
    ),

    context_reference: $ => seq(
      $.context, $.selected_name, repeat($.comma, $.selected_name), $.semicolon
    ),

    tabular_registry_file: $ => repeat($.tabular_registry_entry),

    tabular_registry_entry: $ => choice(
      $.foreign_architecture_registry,
      $.foreign_subprogram_registry,
      $.foreign_application_registry,
      $.library_registry
    ),

    foreign_architecture_registry: $ => seq(
      $.object_library_name, $.model_name $.vhpiArchF,
      $.elaboration_specifier, $.execution_function_name
    ),

    foreign_subprogram_registry: $ => seq(
      $.object_library_name, $.model_name, choice($.vhpiFuncF, $.vhpiProcF),
      $.null, $.execution_specifier
    ),

    foreign_application_registry: $ => seq(
      $.object_library_name, $.application_name, $.vhpiAppF
      $.registration_function_name $.null
    ),

    library_registry: $ => seq(
      $.object_library_name, $.null, $.vhpiLibF, $.registration_function_name, $.null
    ),

    object_library_name: $ => choice(
      $.C_identifier,
      $.extended_identifier
    ),

    model_name: $ => choice(
      $.C_identifier,
      $.extended_identifier
    ),

    application_name: $ => choice(
      $.C_identifier,
      $.extended_identifier
    ),

    elaboration_specifier: $ => choice(
      $.elaboration_function_name,
      $.null
    ),

    elaboration_function_name: $ => $.C_identifier,

    execution_specifier: $ => choice(
      $.execution_function_name,
      $.null
    ),

    execution_function_name: $ => $.C_identifier,

    registration_function_name: $ => $.C_identifier,

    foreign_attribute_value: $ => choice(
      $.standard_indirect_binding,
      $.standard_direct_binding
    ),

    standard_direct_binding: $ => choice(
      $.standard_direct_architecture_binding,
      $.standard_direct_subprogram_binding
    ),

    standard_direct_architecture_binding: $ => seq(
      $.VHPIDIRECT, $.object_library_specifier,
      $.elaboration_specifier, $.execution_function_name
    ),

    standard_direct_subprogram_binding: $ => seq(
      $.VHPIDIRECT, $.object_library_specifier, $.execution_specifier
    ),

    object_library_specifier: $ => choice(
      $.object_library_path,
      $.null
    ),

    object_library_path: $ => /.+/
  }
});


