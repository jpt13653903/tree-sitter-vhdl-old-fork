export CC=gcc

touch.exe grammar.js
touch.exe src/scanner.c

node_modules/.bin/tree-sitter generate && node_modules/.bin/tree-sitter parse test/entity.vhd
# node_modules/.bin/tree-sitter generate && node_modules/.bin/tree-sitter parse test/corpus/specification_examples/entity.vhd
# node_modules/.bin/tree-sitter generate && node_modules/.bin/tree-sitter parse test/conditional_expression.vhd

