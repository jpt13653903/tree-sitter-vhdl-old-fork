/*------------------------------------------------------------------------------

EBNF:

conditional_expression ::= expression { WHEN condition ELSE expression }

condition              ::= expression
expression             ::= "??" primary
                         | logical_expression

logical_expression     ::= relation { "and"  relation }
                         | relation { "or"   relation }
                         | relation { "xor"  relation }
                         | relation [ "nand" relation ]
                         | relation [ "nor"  relation ]
                         | relation { "xnor" relation }

relation               ::= shift_expression [ relational_operator shift_expression ]
relational_operator    ::= "=" | "/=" | "<" | "<=" | ">" | ">=" | "?=" | "?/=" | "?<" | "?<=" | "?>" | "?>="

shift_expression       ::= simple_expression [ shift_operator simple_expression ]
shift_operator         ::= "sll" | "srl" | "sla" | "sra" | "rol" | "ror"

simple_expression      ::= [ sign ] term { adding_operator term }
sign                   ::= "+" | "-"
adding_operator        ::= "+" | "-" | "&"

term                   ::= factor { multiplying_operator factor }
multiplying_operator   ::= "*" | "/" | "mod" | "rem"

factor                 ::= unary_expression [ "**" unary_expression ]

unary_expression       ::= primary
                         | "abs" primary
                         | "not" primary
                         | logical_operator primary
logical_operator       ::= "and" | "or" | "nand" | "nor" | "xor" | "xnor"

primary                ::= name
                         | literal
                         | aggregate
                         | function_call
                         | qualified_expression
                         | type_conversion
                         | allocator
                         | "(" conditional_expression ")"

name                   ::=

literal                ::= numeric_literal
                         | enumeration_literal
                         | string_literal
                         | bit_string_literal
                         | "null"

numeric_literal        ::= abstract_literal
                         | physical_literal

abstract_literal       ::= decimal_literal
                         | based_literal

physical_literal       ::= [ abstract_literal ] unit_name

enumeration_literal    ::= identifier
                         | character_literal

aggregate              ::=

function_call          ::=

qualified_expression   ::=

type_conversion        ::=

allocator              ::=

conditional_expression ::=
------------------------------------------------------------------------------*/

A'(std_logic);
A'(B => std_logic, C => unsigned);

A(B);

