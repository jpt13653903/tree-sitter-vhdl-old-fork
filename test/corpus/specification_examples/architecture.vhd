library work;
    use work.whatnot.all;

library std;
    use std.whatnot.all;

library ieee;
    use ieee.whatnot.all;

-- A body of entity Full_Adder:
architecture DataFlow of Full_Adder is
    signal A,B: Bit;
begin
    MyInstance: entity work.Whatnot port map(
      Clock => Clk,
      Reset => Reset
    );

    A <= X xor Y;
    B <= A and Cin;
    Sum <= A xor Cin;
    Cout <= B or (X and Y);
end architecture DataFlow;


