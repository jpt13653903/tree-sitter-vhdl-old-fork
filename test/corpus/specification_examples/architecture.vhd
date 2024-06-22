library work;
    use work.whatnot.all;

library std;
    use std.whatnot.all;

library ieee;
    use ieee.whatnot.all;

library work;
    use work.stuff.all;

entity Full_Adder is
  port(
    Clk   : in  std_logic;
    Reset : in  std_logic;
  );
end entity Full_Adder;

-- A body of entity Full_Adder:
architecture DataFlow of Full_Adder is
  signal A,B: Bit;
begin
  MyInstance: entity work.Whatnot port map(
    Clock => Clk,
    Reset => Reset
  );

  A    <= X xor Y;
  B    <= A and Cin;
  Sum  <= A xor Cin;
  Cout <= B or (X and Y);
  signal <= whatnot;

/*  process(all) begin
    for n in 0 to 3 loop
      case(WrRegisters.BenchTesting.HBW_Select(n)) is
        when "01"   => opHBW_SEL(n+1) <= '1';
        when "10"   => opHBW_SEL(n+1) <= '0';
        when others => opHBW_SEL(n+1) <= ipUSER_DIP(n);
      end case;
    end loop;
  end process;
  opHBW_SEL_N <= not(opHBW_SEL); */
end architecture DataFlow;

