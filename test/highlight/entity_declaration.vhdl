entity ent is
end entity foo;
        -- ^ error.misspeling.name

    entity ent is
--  ^ keyword
--         ^ variable
    end entity ent;
--             ^ variable
