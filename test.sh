export CC=gcc

touch.exe grammar.js
touch.exe src/scanner.c

node_modules/.bin/tree-sitter generate && node_modules/.bin/tree-sitter parse test/highlight/entity.vhd

