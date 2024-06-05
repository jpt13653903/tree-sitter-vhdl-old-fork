-- A body of entity Full_Adder:
architecture DataFlow of Full_Adder is
  signal A,B: Bit;
begin
  A <= X xor Y;
  B <= A and Cin;
  Sum <= A xor Cin;
  Cout <= B or (X and Y);
end architecture DataFlow;


