entity MyModule is port(
  signal Clk   : in  std_logic;
  signal Reset : in  std_logic;

  signal \extended identifier\       : out   std_logic;
  signal identifier_with_underscores : inout std_logic;
  signal processes : inout std_logic; -- Contains a keyword
  signal proc      : inout std_logic  -- Starts like a keyword
); end entity MyModule;

