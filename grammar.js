module.exports = grammar({
    name: 'vhdl',

    /* The external scanner tokenises all lexical elements (i.e. section 15 of
     * the VHDL-2019 standard), which makes handling case insensitivity and
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

        $._ABS,
        $.ACCESS,
        $.AFTER,
        $.ALIAS,
        $.ALL,
        $._AND,
        $.ARCHITECTURE,
        $.ARRAY,
        $.ASSERT,
        $.ASSUME, // Not used -- PSL keyword
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
        $.COVER, // Not used -- PSL keyword
        $.DEFAULT,
        $.DISCONNECT,
        $.DOWNTO,
        $.ELSE,
        $.ELSIF,
        $.END,
        $.ENTITY,
        $.EXIT,
        $.FAIRNESS, // Not used -- PSL keyword
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
        $._MOD,
        $._NAND,
        $.NEW,
        $.NEXT,
        $._NOR,
        $._NOT,
        $.NULL,
        $.OF,
        $.ON,
        $.OPEN,
        $._OR,
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
        $._REM,
        $.REPORT,
        $.RESTRICT, // Not used -- PSL keyword
        $.RETURN,
        $._ROL,
        $._ROR,
        $.SELECT,
        $.SEQUENCE,
        $.SEVERITY,
        $.SIGNAL,
        $.SHARED,
        $._SLA,
        $._SLL,
        $._SRA,
        $._SRL,
        $.STRONG, // Not used -- PSL keyword
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
        $.VMODE, // Not used -- PSL keyword
        $.VPKG,  // Not used -- PSL keyword
        $.VPROP, // Not used -- PSL keyword
        $.VUNIT,
        $.WAIT,
        $.WHEN,
        $.WHILE,
        $.WITH,
        $._XNOR,
        $._XOR,

        $.reserved_end_marker, // Scanner internal use only

        $.directive_body,
        $.directive_constant_builtin,
        $.directive_error,
        $._directive_newline,
        $.directive_protect,
        $.directive_warning,

        $.directive_end_marker, // Scanner internal use only

        $._ampersand,
        $.tick,
        $.left_parenthesis,
        $.right_parenthesis,
        $._multiply,
        $._plus_sign,
        $.comma,
        $._minus_sign,
        $.dot,
        $._divide,
        $.colon,
        $.semicolon,
        $._less_than_sign,
        $._equals_sign,
        $._greater_than_sign,
        $._grave_accent,
        $._vertical_bar,
        $.left_square_bracket,
        $.right_square_bracket,
        $._question_mark,
        $.commercial_at,

        $._arrow,
        $._circumflex,
        $.exponentiate,
        $.variable_assignment,
        $._inequality,
        $._greater_than_or_equal,
        $._less_than_or_equal,
        $.signal_assignment,
        $.box,
        $.condition_conversion,
        $._matching_equality,
        $._matching_inequality,
        $._matching_less_than,
        $._matching_less_than_or_equal,
        $._matching_greater_than,
        $._matching_greater_than_or_equal,
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
        $.operator_symbol,
        $.comment,

        $.token_end_marker, // Scanner internal use only

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
        $.library_namespace,
        $.library_type,

        $._end_of_file,

        $.error_sentinel,
    ],

    extras: $ => [
        $.comment,
        $.tool_directive
    ],

    conflicts: $ => [ ],

    rules: {
        // Design File
            design_file: $ => seq(repeat(choice($.design_unit)), $._end_of_file),

            design_unit: $ => seq(
                repeat($._context_item), $._library_unit
            ),

            _library_unit: $ => choice(
                $._primary_unit,
                $._secondary_unit,
                /.+/
            ),

        // Context Items
            _context_item: $ => choice(
                $.library_clause,
                $.use_clause,
                $.context_reference
            ),

            library_clause: $ => seq(
                $.LIBRARY, $.logical_name_list, $.semicolon
            ),

            use_clause: $ => seq(
                $.USE, $.selected_name, repeat(seq($.comma, $.selected_name)), $.semicolon
            ),

            context_reference: $ => seq(
                $.CONTEXT, $.selected_name_list, $.semicolon
            ),

            logical_name_list: $ => seq(
                $._logical_name, repeat(seq($.comma, $._logical_name))
            ),

            _logical_name: $ => choice(
                $.library_namespace,
                $.identifier
            ),

            selected_name_list: $ => seq(
                $.selected_name, repeat(seq($.comma, $.selected_name))
            ),

            selected_name: $ => seq(
                $._logical_name, repeat(seq($.dot, choice($.identifier, $.ALL)))
            ),

        // Primary Units
            _primary_unit: $ => choice(
                $.entity_declaration,
                $.configuration_declaration,
                $.package_declaration,
                $.package_instantiation_declaration,
                $.context_declaration
            ),

            entity_declaration: $ => seq(
                $.ENTITY, $.identifier, $.IS, optional($.generic_clause), optional($.port_clause), repeat($._entity_declarative_item), optional($.entity_begin_block), $.END, optional($.ENTITY), optional($.identifier), $.semicolon
            ),

            configuration_declaration: $ => seq(
                $.CONFIGURATION, $.identifier, $.OF, $.name, $.IS, repeat($._configuration_declarative_item), repeat(seq($.verification_unit_binding_indication, $.semicolon)), $.block_configuration, $.END, optional($.CONFIGURATION), optional($.identifier), $.semicolon
            ),

            package_declaration: $ => seq(
                $.PACKAGE, $.identifier, $.IS, optional($.package_header), repeat($._package_declarative_item), $.END, optional($.PACKAGE), optional($.identifier), $.semicolon
            ),

            package_instantiation_declaration: $ => seq(
                $.PACKAGE, $.identifier, $.IS, $.NEW, $.name, optional($.generic_map_aspect), $.semicolon
            ),

            context_declaration: $ => seq(
                $.CONTEXT, $.identifier, $.IS, repeat($._context_item), $.END, optional($.CONTEXT), optional($.identifier), $.semicolon
            ),

        // Secondary Units
            _secondary_unit: $ => choice(
                $.architecture_body,
                $.package_body
            ),

            architecture_body: $ => seq(
                $.ARCHITECTURE, $.identifier, $.OF, $.name, $.IS, repeat($._block_declarative_item), $.concurrent_begin_block, $.END, optional($.ARCHITECTURE), optional($.identifier), $.semicolon
            ),

            package_body: $ => seq(
                $.PACKAGE, $.BODY, $.identifier, $.IS, repeat($._package_body_declarative_item), $.END, optional(seq($.PACKAGE, $.BODY)), optional($.identifier), $.semicolon
            ),

        // Statement Blocks
            entity_begin_block: $ => seq(
                $.BEGIN,
                repeat($._entity_statement)
            ),

            concurrent_begin_block: $ => seq(
                $.BEGIN,
                repeat($._concurrent_statement)
            ),

            sequential_begin_block: $ => seq(
                $.BEGIN,
                repeat($._sequential_statement)
            ),

            generate_body: $ => choice(
                seq($.GENERATE, repeat($._concurrent_statement)),
                seq($.GENERATE, $.generate_statement_body_begin, repeat($._concurrent_statement), $.generate_statement_body_end)
            ),

            case_generate_body: $ => choice(
                seq($._arrow, repeat($._concurrent_statement)),
                seq($._arrow, $.generate_statement_body_begin, repeat($._concurrent_statement), $.generate_statement_body_end)
            ),

            generate_statement_body_begin: $ => seq(
                repeat($._block_declarative_item), $.BEGIN
            ),

            generate_statement_body_end: $ => seq(
                $.END, optional(alias($.identifier, $.label)), $.semicolon
            ),

        // Statements
            _entity_statement: $ => choice(
                $.concurrent_assertion_statement,
                $.concurrent_procedure_call_statement,
                $.process_statement,
                /.+/
            ),

            _concurrent_statement: $ => choice(
                $.component_instantiation_statement,

                $.for_generate_statement,
                $.if_generate_statement,
                $.case_generate_statement,

                $.concurrent_assertion_statement,
                $.concurrent_procedure_call_statement,
                $.concurrent_simple_signal_assignment,
                $.concurrent_conditional_signal_assignment,
                $.concurrent_selected_signal_assignment,

                $.block_statement,
                $.process_statement,
                /.+/
            ),

            _sequential_statement: $ => choice(
                $.assertion_statement,
                $.case_statement,
                $.exit_statement,
                $.if_statement,
                $.loop_statement,
                $.next_statement,
                $.null_statement,
                $.procedure_call_statement,
                $.report_statement,
                $.return_statement,
                $.sequential_block_statement,
                $.simple_waveform_assignment,
                $.simple_force_assignment,
                $.simple_release_assignment,
                $.conditional_signal_assignment,
                $.selected_waveform_assignment,
                $.selected_force_assignment,
                $.simple_variable_assignment,
                $.selected_variable_assignment,
                $.wait_statement,
                /.+/
            ),

            block_statement: $ => seq(
                $.label_declaration, $.BLOCK, optional(seq($.left_parenthesis, $._expression, $.right_parenthesis)), optional($.IS), optional(seq($.generic_clause, optional(seq($.generic_map_aspect, $.semicolon)))), optional(seq($.port_clause, optional(seq($.port_map_aspect, $.semicolon)))), repeat($._block_declarative_item), $.concurrent_begin_block, $.END, $.BLOCK, optional(alias($.identifier, $.label)), $.semicolon
            ),

            sequential_block_statement: $ => seq(
                optional($.label_declaration), $.BLOCK, optional($.IS), repeat($._process_declarative_item), $.sequential_begin_block, $.END, optional($.BLOCK), optional(alias($.identifier, $.label)), $.semicolon
            ),

            component_instantiation_statement: $ => choice(
                seq($.label_declaration, $.instantiated_unit, optional($.generic_map_aspect), optional($.port_map_aspect), $.semicolon),
                seq($.label_declaration, $.name,              optional($.generic_map_aspect),          $.port_map_aspect,  $.semicolon)
            ),

            instantiated_unit: $ => choice(
                seq($.COMPONENT, $.name), // Optional "component" covered by procedure call
                seq($.ENTITY, optional(seq($.library_namespace, $.dot)), $.name, optional($.architecture_identifier)),
                seq($.CONFIGURATION, $.name)
            ),

            architecture_identifier: $ => seq(
                $.left_parenthesis, $.identifier, $.right_parenthesis
            ),

            process_statement: $ => seq(
                optional($.label_declaration), optional($.POSTPONED), $.PROCESS, optional(seq($.left_parenthesis, $._process_sensitivity_list, $.right_parenthesis)), optional($.IS), repeat($._process_declarative_item), $.sequential_begin_block, $.END, optional($.POSTPONED), $.PROCESS, optional(alias($.identifier, $.label)), $.semicolon
            ),

            case_generate_statement: $ => seq(
                $.label_declaration, $.CASE, $._expression, $.GENERATE, $.case_generate_alternative, repeat($.case_generate_alternative), $.END, $.GENERATE, optional(alias($.identifier, $.label)), $.semicolon
            ),

            for_generate_statement: $ => seq(
                $.label_declaration, $.FOR, $.parameter_specification, $.generate_body, $.END, $.GENERATE, optional(alias($.identifier, $.label)), $.semicolon
            ),

            if_generate_statement: $ => seq(
                $.label_declaration, $.IF, optional($.label_declaration), $._expression, $.generate_body, repeat(seq($.ELSIF, optional($.label_declaration), $._expression, $.generate_body)), optional(seq($.ELSE, optional($.label_declaration), $.generate_body)), $.END, $.GENERATE, optional(alias($.identifier, $.label)), $.semicolon
            ),

            assertion_statement: $ => seq(
                optional($.label_declaration), $.assertion, $.semicolon
            ),

            concurrent_assertion_statement: $ => seq(
                optional($.label_declaration), optional($.POSTPONED), $.assertion, $.semicolon
            ),

            assertion: $ => seq(
                $.ASSERT, $._expression, optional(seq($.REPORT, $._expression)), optional(seq($.SEVERITY, $._expression))
            ),

            case_statement: $ => seq(
                optional($.label_declaration), $.CASE, optional($._question_mark), $._expression, $.IS, $.case_statement_alternative, repeat($.case_statement_alternative), $.END, $.CASE, optional($._question_mark), optional(alias($.identifier, $.label)), $.semicolon
            ),

            exit_statement: $ => seq(
                optional($.label_declaration), $.EXIT, optional(alias($.identifier, $.label)), optional(seq($.WHEN, $._expression)), $.semicolon
            ),

            if_statement: $ => seq(
                optional($.label_declaration), $.IF, $._expression, $.THEN, repeat($._sequential_statement), repeat(seq($.ELSIF, $._expression, $.THEN, repeat($._sequential_statement))), optional(seq($.ELSE, repeat($._sequential_statement))), $.END, $.IF, optional(alias($.identifier, $.label)), $.semicolon
            ),

            loop_statement: $ => seq(
                optional($.label_declaration), optional($.iteration_scheme), $.LOOP, repeat($._sequential_statement), $.END, $.LOOP, optional(alias($.identifier, $.label)), $.semicolon
            ),

            next_statement: $ => seq(
                optional($.label_declaration), $.NEXT, optional(alias($.identifier, $.label)), optional(seq($.WHEN, $._expression)), $.semicolon
            ),

            null_statement: $ => seq(
                optional($.label_declaration), $.NULL, $.semicolon
            ),

            procedure_call_statement: $ => seq(
                optional($.label_declaration), $.name, $.semicolon
            ),

            concurrent_procedure_call_statement: $ => seq(
                optional($.label_declaration), optional($.POSTPONED), $.name, $.semicolon
            ),

            report_statement: $ => seq(
                optional($.label_declaration), $.REPORT, $._expression, optional(seq($.SEVERITY, $._expression)), $.semicolon
            ),

            return_statement: $ => choice(
                seq(optional($.label_declaration), $.RETURN, optional(seq($.WHEN, $._expression)), $.semicolon),
                seq(optional($.label_declaration), $.RETURN, $.conditional_or_unaffected_expression, $.semicolon)
            ),

            simple_waveform_assignment: $ => seq(
                optional($.label_declaration), $._target, $.signal_assignment, optional($.delay_mechanism), $.waveform, $.semicolon
            ),

            simple_variable_assignment: $ => seq(
                optional($.label_declaration), $._target, $.variable_assignment, $.conditional_or_unaffected_expression, $.semicolon
            ),

            concurrent_simple_signal_assignment: $ => seq(
                optional($.label_declaration), optional($.POSTPONED), $._target, $.signal_assignment, optional($.GUARDED), optional($.delay_mechanism), $.waveform, $.semicolon
            ),

            simple_force_assignment: $ => seq(
                optional($.label_declaration), $._target, $.signal_assignment, $.FORCE, optional($.force_mode), $.conditional_or_unaffected_expression, $.semicolon
            ),

            simple_release_assignment: $ => seq(
                optional($.label_declaration), $._target, $.signal_assignment, $.RELEASE, optional($.force_mode), $.semicolon
            ),

            conditional_signal_assignment: $ => seq(
                optional($.label_declaration), $._target, $.signal_assignment, optional($.delay_mechanism), $.conditional_waveforms, $.semicolon
            ),

            concurrent_conditional_signal_assignment: $ => seq(
                optional($.label_declaration), optional($.POSTPONED), $._target, $.signal_assignment, optional($.GUARDED), optional($.delay_mechanism), $.conditional_waveforms, $.semicolon
            ),

            selected_waveform_assignment: $ => seq(
                optional($.label_declaration), $.WITH, $._expression, $.SELECT, optional($._question_mark), $._target, $.signal_assignment, optional($.delay_mechanism), $.selected_waveforms, $.semicolon
            ),

            concurrent_selected_signal_assignment: $ => seq(
                optional($.label_declaration), optional($.POSTPONED), $.WITH, $._expression, $.SELECT, optional($._question_mark), $._target, $.signal_assignment, optional($.GUARDED), optional($.delay_mechanism), $.selected_waveforms, $.semicolon
            ),

            selected_force_assignment: $ => seq(
                optional($.label_declaration), $.WITH, $._expression, $.SELECT, optional($._question_mark), $._target, $.signal_assignment, $.FORCE, optional($.force_mode), $.selected_expressions, $.semicolon
            ),

            selected_variable_assignment: $ => seq(
                optional($.label_declaration), $.WITH, $._expression, $.SELECT, optional($._question_mark), $._target, $.variable_assignment, $.selected_expressions, $.semicolon
            ),

            wait_statement: $ => seq(
                optional($.label_declaration), $.WAIT, optional($.sensitivity_clause), optional($.condition_clause), optional($.timeout_clause), $.semicolon
            ),

        // Expressions
            conditional_expression: $ => prec(9, seq(
                $._expression, repeat(seq($.WHEN, $._expression, $.ELSE, $._expression))
            )),

            _expression: $ => prec(10, choice(
                $.condition_expression,
                $.logical_expression,
                $.relational_expression,
                $.shift_expression,
                $.simple_expression
            )),

            condition_expression: $ => prec(11, seq(
                $.condition_conversion, $._expression,
            )),

            logical_expression: $ => prec.left(12, seq(
                $._expression, $.logical_operator, $._expression,
            )),

            relational_expression: $ => prec.left(13, seq(
                $._expression, $.relational_operator, $._expression,
            )),

            shift_expression: $ => prec.left(14, seq(
                $._expression, $.shift_operator, $._expression,
            )),

            simple_expression: $ => choice(
                prec.left(15, seq($._expression, $.adding_operator,      $._expression)),
                prec     (16, seq(               $.sign,                 $._expression)),
                prec.left(17, seq($._expression, $.multiplying_operator, $._expression)),
                prec.left(18, seq($._expression, $.exponentiate,         $._expression)),
                prec     (19, seq(               $.unary_operator,       $._expression)),
                prec     (20, $._primary)
            ),

            unary_operator: $ => choice(
                $._ABS,
                $._NOT,
                $._AND,
                $._OR,
                $._NAND,
                $._NOR,
                $._XOR,
                $._XNOR
            ),

            logical_operator: $ => choice(
                $._AND,
                $._OR,
                $._NAND,
                $._NOR,
                $._XOR,
                $._XNOR
            ),

            relational_operator: $ => choice(
                $._equals_sign,
                $._inequality,
                $._less_than_sign,
                $._less_than_or_equal,
                $._greater_than_sign,
                $._greater_than_or_equal,
                $._matching_equality,
                $._matching_inequality,
                $._matching_less_than,
                $._matching_less_than_or_equal,
                $._matching_greater_than,
                $._matching_greater_than_or_equal
            ),

            shift_operator: $ => choice(
                $._SLL,
                $._SRL,
                $._SLA,
                $._SRA,
                $._ROL,
                $._ROR
            ),

            sign: $ => choice(
                $._plus_sign,
                $._minus_sign
            ),

            adding_operator: $ => choice(
                $._plus_sign,
                $._minus_sign,
                $._ampersand
            ),

            multiplying_operator: $ => choice(
                $._multiply,
                $._divide,
                $._MOD,
                $._REM
            ),

            _primary: $ => choice(
                $.name,
                $._literal,
                $.allocator,
                $.parenthesis_expression
            ),

            name: $ => prec.left(21, seq(
                seq($._direct_name, repeat($.name_selector)),
            )),

            _direct_name: $ => prec.left(choice(
                $.identifier,
                $.operator_symbol,
                $.character_literal,
                $.library_function,
                $.library_type,
                $._external_name,
            )),

            name_selector: $ => choice(
                $.function_call,
                $.parenthesis_group,
                $.attribute,
                $.signature,
                $.selection
            ),

            _external_name: $ => choice(
                $.external_constant_name,
                $.external_signal_name,
                $.external_variable_name
            ),

            external_constant_name: $ => seq(
                $.double_less_than, $.CONSTANT, $._external_pathname, $.colon, $._interface_type_indication, $.double_greater_than
            ),

            external_signal_name: $ => seq(
                $.double_less_than, $.SIGNAL, $._external_pathname, $.colon, $._interface_type_indication, $.double_greater_than
            ),

            external_variable_name: $ => seq(
                $.double_less_than, $.VARIABLE, $._external_pathname, $.colon, $._interface_type_indication, $.double_greater_than
            ),

            _external_pathname: $ => choice(
                $.package_pathname,
                $.absolute_pathname,
                $.relative_pathname
            ),

            package_pathname: $ => seq(
                $.commercial_at, $.identifier, $.dot, $.identifier, $.dot, repeat(seq($.identifier, $.dot)), $.identifier
            ),

            absolute_pathname: $ => seq(
                $.dot, $.partial_pathname
            ),

            relative_pathname: $ => seq(
                repeat(seq($._circumflex, $.dot)), $.partial_pathname
            ),

            partial_pathname: $ => seq(
                repeat(seq($.pathname_element, $.dot)), $.identifier
            ),

            pathname_element: $ => seq(
              $.identifier, optional(seq($.left_parenthesis, $._expression, $.right_parenthesis))
            ),

            function_call: $ => prec.right(choice(
                seq(optional($.generic_map_aspect), $.PARAMETER, $.MAP, $.parenthesis_group),
                seq($.generic_map_aspect, optional(seq(optional(seq($.PARAMETER, $.MAP)), $.parenthesis_group)))
            )),

            parenthesis_group: $ => seq(
                $.left_parenthesis,
                optional($.association_or_range_list),
                $.right_parenthesis,
            ),

            association_or_range_list: $ => seq(
                $._association_or_range, repeat(seq($.comma, $._association_or_range))
            ),

            _association_or_range: $ => choice(
                $.association_element,
                $._range
            ),

            association_element: $ => choice(
                $._actual_part,
                prec.left(6, seq($.name, $._arrow, $._actual_part)),
                /.+/
            ),

            _actual_part: $ => prec(21, choice(
                seq(optional($.INERTIAL), $.conditional_expression),
                $.OPEN
            )),

            attribute: $ => seq(
                $.tick,
                choice(
                    $._attribute_designator,
                    $.parenthesis_expression // qualified_expression
                ),
            ),

            _attribute_designator: $ => choice(
                alias($.identifier, $.attribute_identifier),
                $.attribute_function,
                $.attribute_impure_function,
                $.attribute_mode_view,
                $.attribute_pure_function,
                $.attribute_range,
                $.attribute_signal,
                $.attribute_subtype,
                $.attribute_type,
                $.attribute_value,
                $.library_attribute
            ),

            signature: $ => seq(
                $.left_square_bracket, optional(seq($.name, repeat(seq($.comma, $.name)))), optional(seq($.RETURN, $.name)), $.right_square_bracket
            ),

            selection: $ => seq(
                $.dot, $._suffix
            ),

            _suffix: $ => choice(
                $.identifier,
                $.character_literal,
                $.operator_symbol,
                $.ALL
            ),

            _literal: $ => choice(
                seq($._abstract_literal, optional($._unit)),
                $.bit_string_literal,
                $.string_literal,
                $.library_constant,
                $.library_constant_boolean,
                $.library_constant_character,
                $.library_constant_debug,
                $.NULL
            ),

            _abstract_literal: $ => choice(
                $.decimal_literal,
                $.decimal_literal_float,
                $.based_literal,
                $.based_literal_float
            ),

            _unit: $ => choice(
                alias($.identifier, $.unit),
                $.library_constant_unit
            ),

            allocator: $ => seq(
                $.NEW, $.name
            ),

            parenthesis_expression: $ => seq(
                $.left_parenthesis, $.element_association_list, $.right_parenthesis,
            ),

            element_association_list: $ => seq(
                $.element_association, repeat(seq($.comma, $.element_association))
            ),

            element_association: $ => choice(
                $.conditional_expression,
                prec(6, seq($._element, $._arrow, $.conditional_expression))
            ),

            _element: $ => choice(
                $.simple_expression,
                $._range,
                $.OTHERS,
                $.choices
            ),

            choices: $ => prec.left(7, seq(
                $._element, $._vertical_bar, $._element
            )),

            _range: $ => choice(
                $._expression,
                $.simple_range
            ),

            simple_range: $ => prec.left(8, seq(
                $.simple_expression, $._direction, $.simple_expression
            )),

            _direction: $ => choice(
                $.TO,
                $.DOWNTO
            ),

        // Tool Directives
            tool_directive: $ => seq(
                $._grave_accent, choice($.user_directive, $.protect_directive, $.conditional_analysis_directive), $._directive_newline
            ),

            user_directive: $ => seq(
                seq($.identifier, repeat($.directive_body))
            ),

            protect_directive: $ => seq(
                seq($.directive_protect, repeat($.directive_body)),
            ),

            conditional_analysis_directive: $ => choice(
                seq($.IF,    $.conditional_analysis_expression, $.THEN),
                seq($.ELSIF, $.conditional_analysis_expression, $.THEN),
                seq($.ELSE),
                seq($.END, optional($.IF)),

                seq($.directive_warning, $.string_literal),
                seq($.directive_error,   $.string_literal)
            ),

            conditional_analysis_expression: $ => seq(
                $.conditional_analysis_relation, repeat(seq($.logical_operator, $.conditional_analysis_relation))
            ),

            conditional_analysis_relation: $ => choice(
                seq(optional(alias($._NOT, $.unary_operator)), $.left_parenthesis, $.conditional_analysis_expression, $.right_parenthesis),
                seq($._conditional_analysis_identifier, $._conditional_analysis_operator, $.string_literal)
            ),

            _conditional_analysis_operator: $ => choice(
                $._equals_sign,
                $._inequality,
                $._less_than_sign,
                $._less_than_or_equal,
                $._greater_than_sign,
                $._greater_than_or_equal
            ),

            _conditional_analysis_identifier: $ => choice(
                $.directive_constant_builtin,
                $.identifier
            ),

        // Unsorted
            _configuration_declarative_item: $ => choice(
                $.use_clause,
                $.attribute_specification,
                $.group_declaration,
                /.+/
            ),

            block_configuration: $ => seq(
                $.FOR, $.name, repeat($.use_clause), repeat($._configuration_item), $.END, $.FOR, $.semicolon
            ),

            _configuration_item: $ => choice(
                $.block_configuration,
                $.component_configuration
            ),

            component_configuration: $ => seq(
                $.FOR, $.component_specification, optional($.binding_indication), repeat(seq($.verification_unit_binding_indication, $.semicolon)), optional($.block_configuration), $.END, $.FOR, $.semicolon
            ),

            generic_clause: $ => seq(
                $.GENERIC, $.left_parenthesis, $.interface_list, $.right_parenthesis, $.semicolon
            ),

            port_clause: $ => seq(
                $.PORT, $.left_parenthesis, $.interface_list, $.right_parenthesis, $.semicolon
            ),

            interface_list: $ => seq(
                $._interface_declaration, repeat(seq($.semicolon, $._interface_declaration)), optional($.semicolon)
            ),

            _interface_declaration: $ => choice(
                $._interface_object_declaration,
                $.interface_type_declaration,
                $.interface_subprogram_declaration,
                $.interface_package_declaration,
                /.+/
            ),

            _interface_object_declaration: $ => choice(
                $.interface_constant_signal_or_variable_declaration,
                $.interface_file_declaration
            ),

            interface_type_declaration: $ => seq(
                $.TYPE, $.identifier, optional(seq($.IS, $._incomplete_type_definition))
            ),

            interface_subprogram_declaration: $ => seq(
                $._interface_subprogram_specification, optional(seq($.IS, $._interface_subprogram_default))
            ),

            interface_package_declaration: $ => seq(
                $.PACKAGE, $.identifier, $.IS, $.NEW, $.name, $.interface_package_generic_map_aspect
            ),

            interface_package_generic_map_aspect: $ => choice(
                seq($.GENERIC, $.MAP, $.left_parenthesis, $.box,              $.right_parenthesis),
                seq($.GENERIC, $.MAP, $.left_parenthesis, $.DEFAULT,          $.right_parenthesis),
                seq($.GENERIC, $.MAP, $.left_parenthesis, $.association_list, $.right_parenthesis)
            ),

            generic_map_aspect: $ => seq(
                $.GENERIC, $.MAP, $.left_parenthesis, $.association_list, $.right_parenthesis
            ),

            port_map_aspect: $ => seq(
                $.PORT, $.MAP, $.left_parenthesis, $.association_list, $.right_parenthesis
            ),

            association_list: $ => seq(
                $.association_element, repeat(seq($.comma, $.association_element))
            ),

            _interface_subprogram_default: $ => choice(
                $.name,
                $.box
            ),

            _designator: $ => choice(
                $.identifier,
                $.operator_symbol
            ),

            formal_parameter_list: $ => $.interface_list,

            interface_constant_signal_or_variable_declaration: $ => seq(
                optional(choice($.CONSTANT, $.SIGNAL, $.VARIABLE)), $.identifier_list, $.colon, $._mode_indication
            ),

            interface_file_declaration: $ => seq(
                $.FILE, $.identifier_list, $.colon, $.subtype_indication
            ),

            identifier_list: $ => seq(
                $.identifier, repeat(seq($.comma, $.identifier))
            ),

            _mode_indication: $ => choice(
                $.simple_mode_indication,
                $._mode_view_indication
            ),

            simple_mode_indication: $ => seq(
                optional($.mode), $._interface_type_indication, optional($.BUS), optional(seq($.variable_assignment, $.conditional_expression))
            ),

            _mode_view_indication: $ => choice(
                $.record_mode_view_indication,
                $.array_mode_view_indication
            ),

            record_mode_view_indication: $ => seq(
                $.VIEW, $.name, optional(seq($.OF, $.subtype_indication))
            ),

            array_mode_view_indication: $ => seq(
                $.VIEW, $.left_parenthesis, $.name, $.right_parenthesis, optional(seq($.OF, $.subtype_indication))
            ),

            mode_view_declaration: $ => seq(
                $.VIEW, $.identifier, $.OF, $.subtype_indication, $.IS, repeat($.mode_view_element_definition), $.END, $.VIEW, optional($.identifier), $.semicolon
            ),

            mode_view_element_definition: $ => seq(
                $.record_element_list, $.colon, $._element_mode_indication, $.semicolon
            ),

            record_element_list: $ => seq(
                $.identifier, repeat(seq($.comma, $.identifier))
            ),

            _element_mode_indication: $ => choice(
                $.mode,
                $._element_mode_view_indication
            ),

            _element_mode_view_indication: $ => choice(
                $.element_record_mode_view_indication,
                $.element_array_mode_view_indication
            ),

            element_record_mode_view_indication: $ => seq(
                $.VIEW, $.name
            ),

            element_array_mode_view_indication: $ => seq(
                $.VIEW, $.left_parenthesis, $.name, $.right_parenthesis
            ),

            mode: $ => choice(
                $.IN,
                $.OUT,
                $.INOUT,
                $.BUFFER,
                $.LINKAGE
            ),

            _interface_type_indication: $ => choice(
                $.subtype_indication,
                $.unspecified_type_indication
            ),

            subtype_indication: $ => seq(
                optional($.resolution_indication), $.name, optional($.range_constraint)
            ),

            unspecified_type_indication: $ => seq(
                $.TYPE, $.IS, $._incomplete_type_definition
            ),

            _incomplete_type_definition: $ => choice(
                $.private_incomplete_type_definition,
                $.scalar_incomplete_type_definition,
                $.discrete_incomplete_type_definition,
                $.integer_incomplete_type_definition,
                $.physical_incomplete_type_definition,
                $.floating_incomplete_type_definition,
                $.array_type_definition,
                $.access_incomplete_type_definition,
                $.file_incomplete_type_definition
            ),

            private_incomplete_type_definition: $ => $.PRIVATE,

            scalar_incomplete_type_definition: $ => $.box,

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

            array_type_definition: $ => choice(
                seq($.ARRAY, $.left_parenthesis, $.array_index_incomplete_type_list, $.right_parenthesis, $.OF, $._incomplete_subtype_indication),
                seq($.ARRAY, $.index_constraint, $.OF, $.subtype_indication)
            ),

            array_index_incomplete_type_list: $ => seq(
                $._array_index_incomplete_type, repeat(seq($.comma, $._array_index_incomplete_type))
            ),

            _array_index_incomplete_type: $ => choice(
                $.index_subtype_definition,
                $.index_constraint,
                $.unspecified_type_indication
            ),

            index_constraint: $ => prec.left(seq(
                $._range, repeat(seq($.comma, $._range))
            )),

            index_subtype_definition: $ => seq(
                $.name, $.RANGE, $.box
            ),

            access_incomplete_type_definition: $ => seq(
                $.ACCESS, $._incomplete_subtype_indication
            ),

            _incomplete_subtype_indication: $ => choice(
                $.subtype_indication,
                $.unspecified_type_indication
            ),

            file_incomplete_type_definition: $ => seq(
                $.FILE, $.OF, $.incomplete_type_mark
            ),

            incomplete_type_mark: $ => choice(
                $.name,
                $.unspecified_type_indication
            ),

            resolution_indication: $ => choice(
                $.name,
                seq($.left_parenthesis, $._element_resolution, $.right_parenthesis)
            ),

            _element_resolution: $ => choice(
                $.resolution_indication,
                $.record_resolution
            ),

            record_resolution: $ => seq(
                $.record_element_resolution, repeat(seq($.comma, $.record_element_resolution))
            ),

            record_element_resolution: $ => seq(
                $.identifier, $.resolution_indication
            ),

            range_constraint: $ => seq(
                $.RANGE, $._range
            ),

            _entity_declarative_item: $ => choice(
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
                $.group_declaration,
                /.+/
            ),

            group_declaration: $ => seq(
                $.GROUP, $.identifier, $.colon, $.name, $.left_parenthesis, $.group_constituent_list, $.right_parenthesis, $.semicolon
            ),

            group_constituent_list: $ => seq(
                $.name, repeat(seq($.comma, $.name))
            ),

            group_template_declaration: $ => seq(
                $.GROUP, $.identifier, $.IS, $.left_parenthesis, $.entity_class_entry_list, $.right_parenthesis, $.semicolon
            ),

            entity_class_entry_list: $ => seq(
                $.entity_class_entry, repeat(seq($.comma, $.entity_class_entry))
            ),

            entity_class_entry: $ => seq(
                $._entity_class, optional($.box)
            ),

            disconnection_specification: $ => seq(
                $.DISCONNECT, $.guarded_signal_specification, $.AFTER, $._expression, $.semicolon
            ),

            guarded_signal_specification: $ => seq(
                $.signal_list, $.colon, $.name
            ),

            signal_list: $ => choice(
                seq($.name, repeat(seq($.comma, $.name))),
                $.OTHERS,
                $.ALL
            ),

            attribute_specification: $ => seq(
                $.ATTRIBUTE, $._attribute_designator, $.OF, $.entity_specification, $.IS, $.conditional_expression, $.semicolon
            ),

            entity_specification: $ => seq(
                $.entity_name_list, $.colon, $._entity_class
            ),

            _entity_class: $ => choice(
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
                $._entity_tag, optional($.signature)
            ),

            _entity_tag: $ => choice(
                $.identifier,
                $.character_literal,
                $.operator_symbol
            ),

            attribute_declaration: $ => seq(
                $.ATTRIBUTE, $.identifier, $.colon, $.name, $.semicolon
            ),

            alias_declaration: $ => seq(
                $.ALIAS, $._alias_designator, optional(seq($.colon, $.subtype_indication)), $.IS, $.name, $.semicolon
            ),

            _alias_designator: $ => choice(
                $.identifier,
                $.character_literal,
                $.operator_symbol
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

            file_declaration: $ => seq(
                $.FILE, $.identifier_list, $.colon, $.subtype_indication, optional($.file_open_information), $.semicolon
            ),

            file_open_information: $ => seq(
                optional(seq($.OPEN, $._expression)), $.IS, $.file_logical_name
            ),

            file_logical_name: $ => $._expression,

            subtype_declaration: $ => seq(
                $.SUBTYPE, $.identifier, $.IS, $.subtype_indication, $.semicolon
            ),

            _package_body_declarative_item: $ => choice(
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
                $.group_declaration,
                /.+/
            ),

            package_header: $ => seq(
                $.generic_clause, optional(seq($.generic_map_aspect, $.semicolon))
            ),

            _package_declarative_item: $ => choice(
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
                $.group_declaration,
                /.+/
            ),

            component_declaration: $ => seq(
                $.COMPONENT, $.identifier, optional($.IS), optional($.generic_clause), optional($.port_clause), $.END, optional($.COMPONENT), optional($.identifier), $.semicolon
            ),

            subprogram_declaration: $ => seq(
                $._subprogram_specification, $.semicolon
            ),

            subprogram_body: $ => seq(
                $._subprogram_specification, $.IS, repeat($._subprogram_declarative_item), $.sequential_begin_block, $.END, optional(choice($.PROCEDURE, $.FUNCTION)), optional($._designator), $.semicolon
            ),

            _subprogram_specification: $ => choice(
                $.procedure_specification,
                $.function_specification
            ),

            _interface_subprogram_specification: $ => choice(
                $.interface_procedure_specification,
                $.interface_function_specification
            ),

            procedure_specification: $ => prec.left(seq(
                $.PROCEDURE, $._designator, optional($.subprogram_header), optional(seq(optional($.PARAMETER), $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis))
            )),

            interface_procedure_specification: $ => seq(
                $.PROCEDURE, $._designator, optional(seq(optional($.PARAMETER), $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis))
            ),

            function_specification: $ => seq(
                optional(choice($.PURE, $.IMPURE)), $.FUNCTION, $._designator, optional($.subprogram_header), optional(seq(optional($.PARAMETER), $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis)), $.RETURN, optional(seq($.identifier, $.OF)), $.name
            ),

            interface_function_specification: $ => seq(
                optional(choice($.PURE, $.IMPURE)), $.FUNCTION, $._designator, optional(seq(optional($.PARAMETER), $.left_parenthesis, $.formal_parameter_list, $.right_parenthesis)), $.RETURN, $.name
            ),

            subprogram_instantiation_declaration: $ => seq(
                choice($.PROCEDURE, $.FUNCTION), $._designator, $.IS, $.NEW, $.name, optional($.signature), optional($.generic_map_aspect), $.semicolon
            ),

            subprogram_header: $ => seq(
                $.GENERIC, $.left_parenthesis, $.interface_list, $.right_parenthesis, optional($.generic_map_aspect)
            ),

            type_declaration: $ => seq(
                $.TYPE, $.identifier, optional(seq($.IS, $._type_definition)), $.semicolon
            ),

            _type_definition: $ => choice(
                $._scalar_type_definition,
                $._composite_type_definition,
                $.access_type_definition,
                $.file_type_definition,
                $._protected_type_definition,
                $.protected_type_instantiation_definition
            ),

            protected_type_instantiation_definition: $ => seq(
                $.NEW, $.subtype_indication, optional($.generic_map_aspect)
            ),

            _protected_type_definition: $ => choice(
                $.protected_type_declaration,
                $.protected_type_body
            ),

            protected_type_declaration: $ => seq(
                $.PROTECTED, optional($.protected_type_header), repeat($._protected_type_declarative_item), $.END, $.PROTECTED, optional($.identifier)
            ),

            protected_type_header: $ => seq(
                $.generic_clause, optional(seq($.generic_map_aspect, $.semicolon))
            ),

            _protected_type_declarative_item: $ => choice(
                $.subprogram_declaration,
                $.subprogram_instantiation_declaration,
                $.attribute_specification,
                $.use_clause,
                $.private_variable_declaration,
                $.alias_declaration,
                /.+/
            ),

            private_variable_declaration: $ => seq(
                $.PRIVATE, $.variable_declaration
            ),

            variable_declaration: $ => seq(
                optional($.SHARED), $.VARIABLE, $.identifier_list, $.colon, $.subtype_indication, optional($.generic_map_aspect), optional(seq($.variable_assignment, $.conditional_expression)), $.semicolon
            ),

            protected_type_body: $ => seq(
                $.PROTECTED, $.BODY, repeat($._protected_type_body_declarative_item), $.END, $.PROTECTED, $.BODY, optional(seq($.identifier))
            ),

            _protected_type_body_declarative_item: $ => choice(
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
                $.group_declaration,
                /.+/
            ),

            _process_declarative_item: $ => choice(
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
                $.group_declaration,
                /.+/
            ),

            iteration_scheme: $ => choice(
                seq($.WHILE, $._expression),
                seq($.FOR, $.parameter_specification)
            ),

            parameter_specification: $ => seq(
                $.identifier, $.IN, $._range
            ),

            case_statement_alternative: $ => seq(
                $.WHEN, $._element, $._arrow, repeat($._sequential_statement)
            ),

            selected_waveforms: $ => seq(
                repeat(seq($.waveform, $.WHEN, $._element, $.comma)), $.waveform, $.WHEN, $._element
            ),

            waveform: $ => choice(
                seq($.waveform_element, repeat(seq($.comma, $.waveform_element))),
                $.UNAFFECTED
            ),

            waveform_element: $ => seq(
                $._expression, optional(seq($.AFTER, $._expression)),
            ),

            force_mode: $ => choice(
                $.IN,
                $.OUT
            ),

            selected_expressions: $ => seq(
                repeat(seq($._expression, $.WHEN, $._element, $.comma)), $._expression, $.WHEN, $._element
            ),

            conditional_waveforms: $ => seq(
                $.waveform, $.WHEN, $._expression, repeat(seq($.ELSE, $.waveform, $.WHEN, $._expression)), optional(seq($.ELSE, $.waveform))
            ),

            delay_mechanism: $ => choice(
                $.TRANSPORT,
                seq(optional(seq($.REJECT, $._expression)), $.INERTIAL)
            ),

            _target: $ => choice(
                $.name,
                $.aggregate
            ),

            aggregate: $ => seq(
                $.left_parenthesis,
                $.element_association, repeat(seq($.comma, choice($.element_association))),
                $.right_parenthesis
            ),

            conditional_or_unaffected_expression: $ => seq(
                $._expression_or_unaffected, repeat(seq($.WHEN, $._expression, $.ELSE, $._expression_or_unaffected)), optional(seq($.WHEN, $._expression))
            ),

            _expression_or_unaffected: $ => choice(
                $._expression,
                $.UNAFFECTED
            ),

            label_declaration: $ => seq(
                alias($.identifier, $.label), $.colon
            ),

            sensitivity_clause: $ => seq(
                $.ON, $.sensitivity_list
            ),

            sensitivity_list: $ => seq(
                $.name, repeat(seq($.comma, $.name))
            ),

            condition_clause: $ => seq(
                $.UNTIL, $._expression
            ),

            timeout_clause: $ => seq(
                $.FOR, $._expression
            ),

            _subprogram_declarative_item: $ => choice(
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
                $.group_declaration,
                /.+/
            ),

            file_type_definition: $ => seq(
                $.FILE, $.OF, $.name
            ),

            access_type_definition: $ => seq(
                $.ACCESS, $.subtype_indication, optional($.generic_map_aspect)
            ),

            _scalar_type_definition: $ => choice(
                $.enumeration_type_definition,
                $.range_constraint,
                $.physical_type_definition
            ),

            physical_type_definition: $ => seq(
                $.range_constraint, $.UNITS, $.primary_unit_declaration, repeat($.secondary_unit_declaration), $.END, $.UNITS, optional($.identifier)
            ),

            primary_unit_declaration: $ => seq(
                $.identifier, $.semicolon
            ),

            secondary_unit_declaration: $ => seq(
                $.identifier, $._equals_sign, seq(optional($._abstract_literal), choice($.name, $.library_constant_unit)), $.semicolon
            ),

            enumeration_type_definition: $ => seq(
                $.left_parenthesis, $.enumeration_literal, repeat(seq($.comma, $.enumeration_literal)), $.right_parenthesis
            ),

            enumeration_literal: $ => choice(
                $.identifier,
                $.character_literal
            ),

            _composite_type_definition: $ => choice(
                $.array_type_definition,
                $.record_type_definition
            ),

            record_type_definition: $ => seq(
                $.RECORD, repeat($.element_declaration), $.END, $.RECORD, optional($.identifier)
            ),

            element_declaration: $ => seq(
                $.identifier_list, $.colon, $.subtype_indication, $.semicolon
            ),

            _process_sensitivity_list: $ => choice(
                $.ALL,
                $.sensitivity_list
            ),

            _block_declarative_item: $ => prec(1, choice(
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
                $.group_declaration,
                /.+/
            )),

            configuration_specification: $ => prec.left(choice(
                seq($.FOR, $.component_specification, $.binding_indication, optional(seq($.END, $.FOR, $.semicolon))),
                seq($.FOR, $.component_specification, $.binding_indication, $.verification_unit_binding_indication, $.semicolon, repeat(seq($.verification_unit_binding_indication, $.semicolon)), $.END, $.FOR, $.semicolon)
            )),

            verification_unit_binding_indication: $ => seq(
                $.USE, $.VUNIT, $.verification_unit_list
            ),

            verification_unit_list: $ => seq(
                $.name, repeat(seq($.comma, $.name))
            ),

            component_specification: $ => seq(
                $.instantiation_list, $.colon, $.name
            ),

            instantiation_list: $ => choice(
                seq(alias($.identifier, $.label), repeat(seq($.comma, alias($.identifier, $.label)))),
                $.OTHERS,
                $.ALL
            ),

            binding_indication: $ => seq(
                optional(seq($.USE, $.entity_aspect)), optional($.generic_map_aspect), optional($.port_map_aspect), $.semicolon
            ),

            entity_aspect: $ => choice(
                seq($.ENTITY, $.name, optional(seq($.left_parenthesis, $.identifier, $.right_parenthesis))),
                seq($.CONFIGURATION, $.name),
                $.OPEN
            ),

            case_generate_alternative: $ => prec.left(seq(
                $.WHEN, optional($.label_declaration), $._element, $.case_generate_body
            )),
    }
});

