entity MyModule is port(
  signal Clk   : in  std_logic;
  signal Reset : in  std_logic;

  signal \extended identifier\       : out   std_logic;
  signal identifier_with_underscores : inout std_logic;
  signal processes  : inout std_logic; -- Contains a keyword
  signal proc       : inout std_logic; -- Starts like a keyword
  signal proc_stuff : inout std_logic; -- Almost contains a keyword

  signal assume_something : out std_logic; -- Starts like a keyword, but breaks just after the underscore
  signal delayed          : out std_logic  -- A pre-defined attribute, but also a valid identifier
); end entity MyModule;
