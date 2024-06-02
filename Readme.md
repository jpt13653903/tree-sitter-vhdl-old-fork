# Tree-sitter-vhdl

Tree-sitter-vhdl is a VHDL parser for syntax highlighting.

This started off as a fork from [Alexandre Muller](https://github.com/alemuller/tree-sitter-vhdl)
As such many of the contents might still be from that repository, so I don't
claim authorship for everything.  The parser is largely rewritten, however.

## References

- [VHDL-2000](https://edg.uchicago.edu/~tang/VHDLref.pdf)
- [VHDL-2008](https://faculty-web.msoe.edu/johnsontimoj/Common/FILES/VHDL_2008.pdf)
- [VHDL-2019](https://doi.org/10.1109/IEEESTD.2019.8938196)
- [VHDL Library Files](https://standards.ieee.org/downloads/) (search for "1076")
- [VSCode Modern VHDL](https://github.com/richjyoung/vscode-modern-vhdl/blob/master/syntaxes/vhdl.tmLanguage.yml)

## Setup Process

This grammar has not been merged into the official tree-sitter yet, so you need
to perform a manual setup process.
Configure your `treesitter.lua` (or equivalent) as follows:

```lua
local parser_config = require('nvim-treesitter.parsers').get_parser_configs()

parser_config.vhdl = {
  install_info = {
    url = "https://github.com/jpt13653903/tree-sitter-vhdl.git",
    files = { 'src/parser.c', 'src/scanner.c' },
    branch = 'main',
    generate_requires_npm = false,
    requires_generate_from_grammar = false,
  },
  filetype = 'vhdl',
}

local treesitter = require('nvim-treesitter.configs')

treesitter.setup {
  ensure_installed = {
    -- Some list of languages...
    'vhdl',
    -- Some more languages...
  },

  -- Some other options and configuration...
}
```

Then copy the `queries` folder to your `after` configuration folder,
typically `~/.config/nvim/after/` on Linux
and `~/AppData/Local/nvim/after/` on Windows.

Finally, run `:TSUpdate`.

## Building

- Follow the instructions
  [here](https://tree-sitter.github.io/tree-sitter/creating-parsers#getting-started)
  to setup your development environment.
- Run `npm install --save-dev tree-sitter-cli`
- Run `node_modules/tree-sitter-cli/tree-sitter.exe generate`
