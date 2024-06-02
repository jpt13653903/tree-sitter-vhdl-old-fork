entity MyModule is port(
  signal Clk   : in  std_logic;
  signal Reset : in  std_logic;

  signal \extended identifier\       : out   std_logic;
  signal identifier_with_underscores : inout std_logic;
  signal processes  : inout std_logic; -- Contains a keyword
  signal proc       : inout std_logic; -- Starts like a keyword
  signal proc_stuff : inout std_logic; -- Almost contains a keyword

  signal assume_something : out std_logic; -- Starts like a keyword, but breaks just after the underscore
  signal delayed          : out std_logic; -- A pre-defined attribute, but also a valid identifier
  signal testing : in integer := b"1001";
  signal testing : in integer := o"1362";
  signal testing : in integer := x"18f2";
  signal testing : in integer := ub"1001";
  signal testing : in integer := uo"1362";
  signal testing : in integer := ux"18f2";
  signal testing : in integer := sb"1001";
  signal testing : in integer := so"1362";
  signal testing : in integer := sx"18f2";
  signal testing : in integer := d"6789";
  signal testing : in integer := "My String Literal";
  signal testing : in integer := ''';
  signal testing : in integer := 'x'
); end entity MyModule;
