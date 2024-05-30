module.exports = grammar({
  name: 'vhdl',

  externals: $ => [
    $.keyword,
    $.builtinFunc
  ],

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => /hello/
  }
});


