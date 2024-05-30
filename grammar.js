module.exports = grammar({
  name: 'vhdl',

  externals: $ => [
    $.keyword,
    $.builtinFunc
  ],

  rules: {
    source_file: $ => repeat(choice($.keyword, $.builtinFunc))
  }
});


