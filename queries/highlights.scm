;-------------------------------------------------------------------------------
;
; ## Capture Reference
;
; https://neovim.io/doc/user/treesitter.html#treesitter-highlight-groups
;
; @variable                    various variable names
; @variable.builtin            built-in variable names (e.g. this, self)
; @variable.parameter          parameters of a function
; @variable.parameter.builtin  special parameters (e.g. _, it)
; @variable.member             object and struct fields
;
; @constant                    constant identifiers
; @constant.builtin            built-in constant values
; @constant.macro              constants defined by the preprocessor
;
; @module                      modules or namespaces
; @module.builtin              built-in modules or namespaces
; @label                       GOTO and other labels (e.g. label: in C), including heredoc labels
;
; @string                      string literals
; @string.documentation        string documenting code (e.g. Python docstrings)
; @string.regexp               regular expressions
; @string.escape               escape sequences
; @string.special              other special strings (e.g. dates)
; @string.special.symbol       symbols or atoms
; @string.special.path         filenames
; @string.special.url          URIs (e.g. hyperlinks)
;
; @character                   character literals
; @character.special           special characters (e.g. wildcards)
;
; @boolean                     boolean literals
; @number                      numeric literals
; @number.float                floating-point number literals
;
; @type                        type or class definitions and annotations
; @type.builtin                built-in types
; @type.definition             identifiers in type definitions (e.g. typedef <type> <identifier> in C)
;
; @attribute                   attribute annotations (e.g. Python decorators, Rust lifetimes)
; @attribute.builtin           builtin annotations (e.g. @property in Python)
; @property                    the key in key/value pairs
;
; @function                    function definitions
; @function.builtin            built-in functions
; @function.call               function calls
; @function.macro              preprocessor macros
;
; @function.method             method definitions
; @function.method.call        method calls
;
; @constructor                 constructor calls and definitions
; @operator                    symbolic operators (e.g. +, *)
;
; @keyword                     keywords not fitting into specific categories
; @keyword.coroutine           keywords related to coroutines (e.g. go in Go, async/await in Python)
; @keyword.function            keywords that define a function (e.g. func in Go, def in Python)
; @keyword.operator            operators that are English words (e.g. and, or)
; @keyword.import              keywords for including modules (e.g. import, from in Python)
; @keyword.type                keywords defining composite types (e.g. struct, enum)
; @keyword.modifier            keywords defining type modifiers (e.g. const, static, public)
; @keyword.repeat              keywords related to loops (e.g. for, while)
; @keyword.return              keywords like return and yield
; @keyword.debug               keywords related to debugging
; @keyword.exception           keywords related to exceptions (e.g. throw, catch)
;
; @keyword.conditional         keywords related to conditionals (e.g. if, else)
; @keyword.conditional.ternary ternary operator (e.g. ?, :)
;
; @keyword.directive           various preprocessor directives and shebangs
; @keyword.directive.define    preprocessor definition directives
;
; @punctuation.delimiter       delimiters (e.g. ;, ., ,)
; @punctuation.bracket         brackets (e.g. (), {}, [])
; @punctuation.special         special symbols (e.g. {} in string interpolation)
;
; @comment                     line and block comments
; @comment.documentation       comments documenting code
;
; @comment.error               error-type comments (e.g. ERROR, FIXME, DEPRECATED)
; @comment.warning             warning-type comments (e.g. WARNING, FIX, HACK)
; @comment.todo                todo-type comments (e.g. TODO, WIP)
; @comment.note                note-type comments (e.g. NOTE, INFO, XXX)
;
; @markup.strong               bold text
; @markup.italic               italic text
; @markup.strikethrough        struck-through text
; @markup.underline            underlined text (only for literal underline markup!)
;
; @markup.heading              headings, titles (including markers)
; @markup.heading.1            top-level heading
; @markup.heading.2            section heading
; @markup.heading.3            subsection heading
; @markup.heading.4            and so on
; @markup.heading.5            and so forth
; @markup.heading.6            six levels ought to be enough for anybody
;
; @markup.quote                block quotes
; @markup.math                 math environments (e.g. $ ... $ in LaTeX)
;
; @markup.link                 text references, footnotes, citations, etc.
; @markup.link.label           link, reference descriptions
; @markup.link.url             URL-style links
;
; @markup.raw                  literal or verbatim text (e.g. inline code)
; @markup.raw.block            literal or verbatim text as a stand-alone block
;
; @markup.list                 list markers
; @markup.list.checked         checked todo-style list markers
; @markup.list.unchecked       unchecked todo-style list markers
;
; @diff.plus                   added text (for diff files)
; @diff.minus                  deleted text (for diff files)
; @diff.delta                  changed text (for diff files)
;
; @tag                         XML-style tag names (e.g. in XML, HTML, etc.)
; @tag.builtin                 XML-style tag names (e.g. HTML5 tags)
; @tag.attribute               XML-style tag attributes
; @tag.delimiter               XML-style tag delimiters
; ------------------------------------------------------------------------------

(comment) @comment @spell
(identifier) @variable

[
    (ABS) (ACCESS) (AFTER) (ALIAS) (ALL) (AND) (ARCHITECTURE) (ARRAY) (ASSERT)
    (ASSUME) (ATTRIBUTE) (BEGIN) (BLOCK) (BODY) (BUFFER) (BUS) (CASE)
    (COMPONENT) (CONFIGURATION) (CONSTANT) (CONTEXT) (COVER) (DEFAULT)
    (DISCONNECT) (DOWNTO) (ELSE) (ELSIF) (END) (ENTITY) (EXIT) (FAIRNESS) (FILE)
    (FOR) (FORCE) (FUNCTION) (GENERATE) (GENERIC) (GROUP) (GUARDED) (IF)
    (IMPURE) (IN) (INERTIAL) (INOUT) (IS) (LABEL) (LIBRARY) (LINKAGE) (LITERAL)
    (LOOP) (MAP) (MOD) (NAND) (NEW) (NEXT) (NOR) (NOT) (NULL) (OF) (ON) (OPEN)
    (OR) (OTHERS) (OUT) (PACKAGE) (PARAMETER) (PORT) (POSTPONED) (PROCEDURE)
    (PROCESS) (PROPERTY) (PROTECTED) (PRIVATE) (PURE) (RANGE) (RECORD)
    (REGISTER) (REJECT) (RELEASE) (REM) (REPORT) (RESTRICT) (RETURN) (ROL)
    (ROR) (SELECT) (SEQUENCE) (SEVERITY) (SIGNAL) (SHARED) (SLA) (SLL) (SRA)
    (SRL) (STRONG) (SUBTYPE) (THEN) (TO) (TRANSPORT) (TYPE) (UNAFFECTED) (UNITS)
    (UNTIL) (USE) (VARIABLE) (VIEW) (VPKG) (VMODE) (VPROP) (VUNIT) (WAIT) (WHEN)
    (WHILE) (WITH) (XNOR) (XOR) (box)
] @keyword

(tool_directive) @keyword.directive
(directive_body) @keyword.directive
(directive_constant_builtin) @constant.macro
(directive_error) @comment.error
(directive_protect) @keyword.directive
(directive_warning) @comment.warning

[
    (ampersand) (multiply) (plus_sign) (minus_sign) (divide) (less_than_sign)
    (equals_sign) (greater_than_sign) (vertical_bar) (question_mark)
    (arrow) (circumflex) (exponentiate) (variable_assignment) (inequality)
    (greater_than_or_equal) (less_than_or_equal) (signal_assignment)
    (condition_conversion) (matching_equality) (matching_inequality)
    (matching_less_than) (matching_less_than_or_equal) (matching_greater_than)
    (matching_greater_than_or_equal)
] @operator

[ (tick) (comma) (dot) (semicolon) ] @punctuation.delimiters

[
    (left_parenthesis)    (right_parenthesis)
    (left_square_bracket) (right_square_bracket)
    (double_less_than)    (double_greater_than)
] @punctuation.bracket

[
    (colon) (commercial_at)
] @punctuation.special

[
    (decimal_literal)
    (based_literal)
    (bit_string_literal)
] @number

[
    (decimal_literal_float)
    (based_literal_float)
] @number.float

(string_literal) @string
(character_literal) @character

[
    (attribute_function)
    (attribute_impure_function)
    (attribute_mode_view)
    (attribute_pure_function)
    (attribute_range)
    (attribute_signal)
    (attribute_subtype)
    (attribute_type)
    (attribute_value)
    (library_attribute)
] @attribute.builtin

(library_constant)           @constant.builtin
(library_function)           @function.builtin
(library_type)               @type.builtin
(library_constant_boolean)   @boolean
(library_constant_character) @character
(library_constant_debug)     @keyword.debug
(library_constant_unit)      @keyword.modifier

(label) @label

