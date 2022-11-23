    type foo is record end record foo;
--  ^ keyword
--       ^ type
--           ^ keyword
--              ^ type.builtin
--                     ^ keyword
--                         ^ type.builtin
--                                ^ type

type foo is
    record
    end record bar;
            -- ^ error.misspeling.name

type foo is
    record
        e1, e1 : t;
         -- ^ error.repeated.identifier
    end record;

type foo is
    record
        e1 : t;
        e1 : t;
     -- ^ error.repeated.identifier
    end record;

type foo is
    record
        e1, e2 : t;
        e3, e2 : t;
         -- ^ error.repeated.identifier
    end record;
