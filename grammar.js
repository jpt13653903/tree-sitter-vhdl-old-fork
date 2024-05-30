module.exports = grammar({
  name: 'vhdl',

  externals: $ => [
    $.keyword,
    $.builtinFunc,
    $.error_sentinel
  ],

  extras: $ => [
    $.comment,
    $.tool_directive,
    /\s/,
  ],

  rules: {
    source_file: $ => repeat(choice($.keyword, $.builtinFunc)),

    // keyword: $ => /[Hh][Ee][Ll][Ll][Oo]/,
    // builtinFunc: $ => /[Ff][Uu][Nn][Cc]/,

    comment: $ => token(choice(
      /--.*/,
      seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/')
    )),
    tool_directive: $ => token(/`.*/),
  }
});


