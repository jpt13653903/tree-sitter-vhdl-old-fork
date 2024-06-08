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
        $.operator_symbol,
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
    ],

    conflicts: $ => [
    ],

    rules: {
        design_file: $ => repeat1(seq($.conditional_expression, $.semicolon)),

        signature: $ => seq(
            $.left_square_bracket, /*optional(seq($.name, repeat(seq($.comma, $.name)))), optional(seq($.RETURN, $.name)),*/ $.right_square_bracket
        ),

        simple_range: $ => seq(
            $.conditional_expression, optional(seq($._direction, $._simple_expression))
        ),

        _direction: $ => choice(
            $.TO,
            $.DOWNTO
        ),

        association_element: $ => seq(
            $.conditional_expression, optional(seq($.arrow, $.conditional_expression))
        ),

        parenthesis_group: $ => seq(
            optional(seq($.PARAMETER, $.MAP)),
            $.left_parenthesis,
            optional(seq($.association_element, repeat(seq($.comma, $.association_element)))),
            $.right_parenthesis,
        ),

        attribute: $ => seq(
            $.tick,
            choice(
                $.attribute_designator,
                $.parenthesis_expression
            ),
        ),

        attribute_designator: $ => choice(
            $.identifier,
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

        conditional_expression: $ => seq(
            $.expression, repeat(seq($.WHEN, $.expression, $.ELSE, $.expression))
        ),

        expression: $ => choice(
            seq($.condition_conversion, $._primary),
            $._logical_expression
        ),

        _logical_expression: $ => choice(
            seq($._relation, repeat(  seq($.AND,  $._relation))),
            seq($._relation, repeat(  seq($.OR,   $._relation))),
            seq($._relation, repeat(  seq($.XOR,  $._relation))),
            seq($._relation, optional(seq($.NAND, $._relation))),
            seq($._relation, optional(seq($.NOR,  $._relation))),
            seq($._relation, repeat(  seq($.XNOR, $._relation)))
        ),

        _relation: $ => seq(
            $._shift_expression, optional(seq($._relational_operator, $._shift_expression))
        ),

        _relational_operator: $ => choice(
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

        _shift_expression: $ => seq(
            $._simple_expression, optional(seq($._shift_operator, $._simple_expression))
        ),

        _shift_operator: $ => choice(
            $.SLL,
            $.SRL,
            $.SLA,
            $.SRA,
            $.ROL,
            $.ROR
        ),

        _simple_expression: $ => seq(
            optional($._sign), $._term, repeat(seq($._adding_operator, $._term))
        ),

        _sign: $ => choice(
            $.plus_sign,
            $.minus_sign
        ),

        _adding_operator: $ => choice(
            $.plus_sign,
            $.minus_sign,
            $.ampersand
        ),

        _term: $ => seq(
            $._factor, repeat(seq($._multiplying_operator, $._factor))
        ),

        _multiplying_operator: $ => choice(
            $.multiply,
            $.divide,
            $.MOD,
            $.REM
        ),

        _factor: $ => seq(
            $._unary_expression, optional(seq($.exponentiate, $._unary_expression))
        ),

        _unary_expression: $ => seq(
            optional(choice($.ABS, $.NOT, $._logical_operator)), $._primary
        ),

        _logical_operator: $ => choice(
            $.AND,
            $.OR,
            $.NAND,
            $.NOR,
            $.XOR,
            $.XNOR
        ),

        _primary: $ => choice(
            seq($.identifier, repeat(choice($.parenthesis_group, $.attribute, $.signature))),
            $._literal,
            // $.aggregate,
            // $.allocator,
            $.parenthesis_expression
        ),

        parenthesis_expression: $ => seq(
            $.left_parenthesis,
            $.element_association, repeat(seq($.comma, $.element_association)),
            $.right_parenthesis,
        ),

        _literal: $ => choice(
            seq($._abstract_literal, optional($._unit)),
            $.character_literal,
            $.string_literal,
            $.bit_string_literal,
            $.library_constant,
            $.library_constant_boolean,
            $.library_constant_character,
            $.library_constant_debug,
            $.NULL
        ),

        _unit: $ => choice(
            alias($.identifier, $.unit),
            $.library_constant_unit
        ),

        _abstract_literal: $ => choice(
          $.decimal_literal,
          $.decimal_literal_float,
          $.based_literal,
          $.based_literal_float
        ),

        element_association: $ => seq(
            $.choices, optional(seq($.arrow, $.conditional_expression))
        ),

        choices: $ => seq(
            $.choice, repeat(seq($.vertical_bar, $.choice))
        ),

        choice: $ => choice(
            $.simple_range,
            $.OTHERS
        ),
    }
});

