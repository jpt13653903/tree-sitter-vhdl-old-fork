//------------------------------------------------------------------------------

#ifdef DEBUG
    const char* token_type_to_string(TokenType type)
    {
        switch(type){
            case IDENTIFIER:                               return "IDENTIFIER";

            case RESERVED_ABS:                             return "RESERVED_ABS";
            case RESERVED_ACCESS:                          return "RESERVED_ACCESS";
            case RESERVED_AFTER:                           return "RESERVED_AFTER";
            case RESERVED_ALIAS:                           return "RESERVED_ALIAS";
            case RESERVED_ALL:                             return "RESERVED_ALL";
            case RESERVED_AND:                             return "RESERVED_AND";
            case RESERVED_ARCHITECTURE:                    return "RESERVED_ARCHITECTURE";
            case RESERVED_ARRAY:                           return "RESERVED_ARRAY";
            case RESERVED_ASSERT:                          return "RESERVED_ASSERT";
            case RESERVED_ASSUME:                          return "RESERVED_ASSUME";
            case RESERVED_ASSUME_GUARANTEE:                return "RESERVED_ASSUME_GUARANTEE";
            case RESERVED_ATTRIBUTE:                       return "RESERVED_ATTRIBUTE";
            case RESERVED_BEGIN:                           return "RESERVED_BEGIN";
            case RESERVED_BLOCK:                           return "RESERVED_BLOCK";
            case RESERVED_BODY:                            return "RESERVED_BODY";
            case RESERVED_BUFFER:                          return "RESERVED_BUFFER";
            case RESERVED_BUS:                             return "RESERVED_BUS";
            case RESERVED_CASE:                            return "RESERVED_CASE";
            case RESERVED_COMPONENT:                       return "RESERVED_COMPONENT";
            case RESERVED_CONFIGURATION:                   return "RESERVED_CONFIGURATION";
            case RESERVED_CONSTANT:                        return "RESERVED_CONSTANT";
            case RESERVED_CONTEXT:                         return "RESERVED_CONTEXT";
            case RESERVED_COVER:                           return "RESERVED_COVER";
            case RESERVED_DEFAULT:                         return "RESERVED_DEFAULT";
            case RESERVED_DISCONNECT:                      return "RESERVED_DISCONNECT";
            case RESERVED_DOWNTO:                          return "RESERVED_DOWNTO";
            case RESERVED_ELSE:                            return "RESERVED_ELSE";
            case RESERVED_ELSIF:                           return "RESERVED_ELSIF";
            case RESERVED_END:                             return "RESERVED_END";
            case RESERVED_ENTITY:                          return "RESERVED_ENTITY";
            case RESERVED_EXIT:                            return "RESERVED_EXIT";
            case RESERVED_FAIRNESS:                        return "RESERVED_FAIRNESS";
            case RESERVED_FILE:                            return "RESERVED_FILE";
            case RESERVED_FOR:                             return "RESERVED_FOR";
            case RESERVED_FORCE:                           return "RESERVED_FORCE";
            case RESERVED_FUNCTION:                        return "RESERVED_FUNCTION";
            case RESERVED_GENERATE:                        return "RESERVED_GENERATE";
            case RESERVED_GENERIC:                         return "RESERVED_GENERIC";
            case RESERVED_GROUP:                           return "RESERVED_GROUP";
            case RESERVED_GUARDED:                         return "RESERVED_GUARDED";
            case RESERVED_IF:                              return "RESERVED_IF";
            case RESERVED_IMPURE:                          return "RESERVED_IMPURE";
            case RESERVED_IN:                              return "RESERVED_IN";
            case RESERVED_INERTIAL:                        return "RESERVED_INERTIAL";
            case RESERVED_INOUT:                           return "RESERVED_INOUT";
            case RESERVED_IS:                              return "RESERVED_IS";
            case RESERVED_LABEL:                           return "RESERVED_LABEL";
            case RESERVED_LIBRARY:                         return "RESERVED_LIBRARY";
            case RESERVED_LINKAGE:                         return "RESERVED_LINKAGE";
            case RESERVED_LITERAL:                         return "RESERVED_LITERAL";
            case RESERVED_LOOP:                            return "RESERVED_LOOP";
            case RESERVED_MAP:                             return "RESERVED_MAP";
            case RESERVED_MOD:                             return "RESERVED_MOD";
            case RESERVED_NAND:                            return "RESERVED_NAND";
            case RESERVED_NEW:                             return "RESERVED_NEW";
            case RESERVED_NEXT:                            return "RESERVED_NEXT";
            case RESERVED_NOR:                             return "RESERVED_NOR";
            case RESERVED_NOT:                             return "RESERVED_NOT";
            case RESERVED_NULL:                            return "RESERVED_NULL";
            case RESERVED_OF:                              return "RESERVED_OF";
            case RESERVED_ON:                              return "RESERVED_ON";
            case RESERVED_OPEN:                            return "RESERVED_OPEN";
            case RESERVED_OR:                              return "RESERVED_OR";
            case RESERVED_OTHERS:                          return "RESERVED_OTHERS";
            case RESERVED_OUT:                             return "RESERVED_OUT";
            case RESERVED_PACKAGE:                         return "RESERVED_PACKAGE";
            case RESERVED_PARAMETER:                       return "RESERVED_PARAMETER";
            case RESERVED_PORT:                            return "RESERVED_PORT";
            case RESERVED_POSTPONED:                       return "RESERVED_POSTPONED";
            case RESERVED_PROCEDURE:                       return "RESERVED_PROCEDURE";
            case RESERVED_PROCESS:                         return "RESERVED_PROCESS";
            case RESERVED_PROPERTY:                        return "RESERVED_PROPERTY";
            case RESERVED_PROTECTED:                       return "RESERVED_PROTECTED";
            case RESERVED_PURE:                            return "RESERVED_PURE";
            case RESERVED_RANGE:                           return "RESERVED_RANGE";
            case RESERVED_RECORD:                          return "RESERVED_RECORD";
            case RESERVED_REGISTER:                        return "RESERVED_REGISTER";
            case RESERVED_REJECT:                          return "RESERVED_REJECT";
            case RESERVED_RELEASE:                         return "RESERVED_RELEASE";
            case RESERVED_REM:                             return "RESERVED_REM";
            case RESERVED_REPORT:                          return "RESERVED_REPORT";
            case RESERVED_RESTRICT:                        return "RESERVED_RESTRICT";
            case RESERVED_RESTRICT_GUARANTEE:              return "RESERVED_RESTRICT_GUARANTEE";
            case RESERVED_RETURN:                          return "RESERVED_RETURN";
            case RESERVED_ROL:                             return "RESERVED_ROL";
            case RESERVED_ROR:                             return "RESERVED_ROR";
            case RESERVED_SELECT:                          return "RESERVED_SELECT";
            case RESERVED_SEQUENCE:                        return "RESERVED_SEQUENCE";
            case RESERVED_SEVERITY:                        return "RESERVED_SEVERITY";
            case RESERVED_SIGNAL:                          return "RESERVED_SIGNAL";
            case RESERVED_SHARED:                          return "RESERVED_SHARED";
            case RESERVED_SLA:                             return "RESERVED_SLA";
            case RESERVED_SLL:                             return "RESERVED_SLL";
            case RESERVED_SRA:                             return "RESERVED_SRA";
            case RESERVED_SRL:                             return "RESERVED_SRL";
            case RESERVED_STRONG:                          return "RESERVED_STRONG";
            case RESERVED_SUBTYPE:                         return "RESERVED_SUBTYPE";
            case RESERVED_THEN:                            return "RESERVED_THEN";
            case RESERVED_TO:                              return "RESERVED_TO";
            case RESERVED_TRANSPORT:                       return "RESERVED_TRANSPORT";
            case RESERVED_TYPE:                            return "RESERVED_TYPE";
            case RESERVED_UNAFFECTED:                      return "RESERVED_UNAFFECTED";
            case RESERVED_UNITS:                           return "RESERVED_UNITS";
            case RESERVED_UNTIL:                           return "RESERVED_UNTIL";
            case RESERVED_USE:                             return "RESERVED_USE";
            case RESERVED_VARIABLE:                        return "RESERVED_VARIABLE";
            case RESERVED_VMODE:                           return "RESERVED_VMODE";
            case RESERVED_VPROP:                           return "RESERVED_VPROP";
            case RESERVED_VUNIT:                           return "RESERVED_VUNIT";
            case RESERVED_WAIT:                            return "RESERVED_WAIT";
            case RESERVED_WHEN:                            return "RESERVED_WHEN";
            case RESERVED_WHILE:                           return "RESERVED_WHILE";
            case RESERVED_WITH:                            return "RESERVED_WITH";
            case RESERVED_XNOR:                            return "RESERVED_XNOR";
            case RESERVED_XOR:                             return "RESERVED_XOR";

            case RESERVED_END_MARKER:                      return "RESERVED_END_MARKER";

            case DELIMITER_AMPERSAND:                      return "DELIMITER_AMPERSAND";
            case DELIMITER_TICK:                           return "DELIMITER_TICK";
            case DELIMITER_LEFT_PARENTHESIS:               return "DELIMITER_LEFT_PARENTHESIS";
            case DELIMITER_RIGHT_PARENTHESIS:              return "DELIMITER_RIGHT_PARENTHESIS";
            case DELIMITER_MULTIPLY:                       return "DELIMITER_MULTIPLY";
            case DELIMITER_PLUS_SIGN:                      return "DELIMITER_PLUS_SIGN";
            case DELIMITER_COMMA:                          return "DELIMITER_COMMA";
            case DELIMITER_MINUS_SIGN:                     return "DELIMITER_MINUS_SIGN";
            case DELIMITER_DOT:                            return "DELIMITER_DOT";
            case DELIMITER_DIVIDE:                         return "DELIMITER_DIVIDE";
            case DELIMITER_COLON:                          return "DELIMITER_COLON";
            case DELIMITER_SEMICOLON:                      return "DELIMITER_SEMICOLON";
            case DELIMITER_LESS_THAN_SIGN:                 return "DELIMITER_LESS_THAN_SIGN";
            case DELIMITER_EQUALS_SIGN:                    return "DELIMITER_EQUALS_SIGN";
            case DELIMITER_GREATER_THAN_SIGN:              return "DELIMITER_GREATER_THAN_SIGN";
            case DELIMITER_GRAVE_ACCENT:                   return "DELIMITER_GRAVE_ACCENT";
            case DELIMITER_VERTICAL_BAR:                   return "DELIMITER_VERTICAL_BAR";
            case DELIMITER_LEFT_SQUARE_BRACKET:            return "DELIMITER_LEFT_SQUARE_BRACKET";
            case DELIMITER_RIGHT_SQUARE_BRACKET:           return "DELIMITER_RIGHT_SQUARE_BRACKET";
            case DELIMITER_QUESTION_MARK:                  return "DELIMITER_QUESTION_MARK";
            case DELIMITER_COMMERCIAL_AT:                  return "DELIMITER_COMMERCIAL_AT";

            case DELIMITER_ARROW:                          return "DELIMITER_ARROW";
            case DELIMITER_EXPONENTIATE:                   return "DELIMITER_EXPONENTIATE";
            case DELIMITER_VARIABLE_ASSIGNMENT:            return "DELIMITER_VARIABLE_ASSIGNMENT";
            case DELIMITER_INEQUALITY:                     return "DELIMITER_INEQUALITY";
            case DELIMITER_GREATER_THAN_OR_EQUAL:          return "DELIMITER_GREATER_THAN_OR_EQUAL";
            case DELIMITER_LESS_THAN_OR_EQUAL:             return "DELIMITER_LESS_THAN_OR_EQUAL";
            case DELIMITER_SIGNAL_ASSIGNMENT:              return "DELIMITER_SIGNAL_ASSIGNMENT";
            case DELIMITER_BOX:                            return "DELIMITER_BOX";
            case DELIMITER_CONDITION_CONVERSION:           return "DELIMITER_CONDITION_CONVERSION";
            case DELIMITER_MATCHING_EQUALITY:              return "DELIMITER_MATCHING_EQUALITY";
            case DELIMITER_MATCHING_INEQUALITY:            return "DELIMITER_MATCHING_INEQUALITY";
            case DELIMITER_MATCHING_LESS_THAN:             return "DELIMITER_MATCHING_LESS_THAN";
            case DELIMITER_MATCHING_LESS_THAN_OR_EQUAL:    return "DELIMITER_MATCHING_LESS_THAN_OR_EQUAL";
            case DELIMITER_MATCHING_GREATER_THAN:          return "DELIMITER_MATCHING_GREATER_THAN";
            case DELIMITER_MATCHING_GREATER_THAN_OR_EQUAL: return "DELIMITER_MATCHING_GREATER_THAN_OR_EQUAL";
            case DELIMITER_DOUBLE_LESS_THAN:               return "DELIMITER_DOUBLE_LESS_THAN";
            case DELIMITER_DOUBLE_GREATER_THAN:            return "DELIMITER_DOUBLE_GREATER_THAN";

            case DELIMITER_END_MARKER:                     return "DELIMITER_END_MARKER";

            case TOKEN_DECIMAL_LITERAL:                    return "TOKEN_DECIMAL_LITERAL";
            case TOKEN_BASED_LITERAL:                      return "TOKEN_BASED_LITERAL";
            case TOKEN_CHARACTER_LITERAL:                  return "TOKEN_CHARACTER_LITERAL";
            case TOKEN_STRING_LITERAL:                     return "TOKEN_STRING_LITERAL";
            case TOKEN_BIT_STRING_LITERAL:                 return "TOKEN_BIT_STRING_LITERAL";
            case TOKEN_COMMENT:                            return "TOKEN_COMMENT";
            case TOKEN_TOOL_DIRECTIVE:                     return "TOKEN_TOOL_DIRECTIVE";
            case TOKEN_STANDARD_TOOL_DIRECTIVE:            return "TOKEN_STANDARD_TOOL_DIRECTIVE";
            case TOKEN_COMMON_TOOL_DIRECTIVE:              return "TOKEN_COMMON_TOOL_DIRECTIVE";

            case TOKEN_END_MARKER:                         return "TOKEN_END_MARKER";

            case ATTRIBUTE_FUNCTION:                       return "ATTRIBUTE_FUNCTION";
            case ATTRIBUTE_PURE_FUNCTION:                  return "ATTRIBUTE_PURE_FUNCTION";
            case ATTRIBUTE_RANGE:                          return "ATTRIBUTE_RANGE";
            case ATTRIBUTE_SIGNAL:                         return "ATTRIBUTE_SIGNAL";
            case ATTRIBUTE_SUBTYPE:                        return "ATTRIBUTE_SUBTYPE";
            case ATTRIBUTE_TYPE:                           return "ATTRIBUTE_TYPE";
            case ATTRIBUTE_VALUE:                          return "ATTRIBUTE_VALUE";

            case LIBRARY_CONSTANT:                         return "LIBRARY_CONSTANT";
            case LIBRARY_FUNCTION:                         return "LIBRARY_FUNCTION";
            case LIBRARY_TYPE:                             return "LIBRARY_TYPE";

            case ERROR_SENTINEL:                           return "ERROR_SENTINEL";

            case COMMENT_LINE_START:                       return "COMMENT_LINE_START";
            case COMMENT_BLOCK_START:                      return "COMMENT_BLOCK_START";

            case BASE_SPECIFIER_BINARY:                    return "BASE_SPECIFIER_BINARY";
            case BASE_SPECIFIER_OCTAL:                     return "BASE_SPECIFIER_OCTAL";
            case BASE_SPECIFIER_HEX:                       return "BASE_SPECIFIER_HEX";
            case BASE_SPECIFIER_UNSIGNED_BINARY:           return "BASE_SPECIFIER_UNSIGNED_BINARY";
            case BASE_SPECIFIER_UNSIGNED_OCTAL:            return "BASE_SPECIFIER_UNSIGNED_OCTAL";
            case BASE_SPECIFIER_UNSIGNED_HEX:              return "BASE_SPECIFIER_UNSIGNED_HEX";
            case BASE_SPECIFIER_SIGNED_BINARY:             return "BASE_SPECIFIER_SIGNED_BINARY";
            case BASE_SPECIFIER_SIGNED_OCTAL:              return "BASE_SPECIFIER_SIGNED_OCTAL";
            case BASE_SPECIFIER_SIGNED_HEX:                return "BASE_SPECIFIER_SIGNED_HEX";
            case BASE_SPECIFIER_DECIMAL:                   return "BASE_SPECIFIER_DECIMAL";

            case IDENTIFIER_EXPECTING_LETTER:              return "IDENTIFIER_EXPECTING_LETTER";

            default: return "Unknown type";
        }
    }
#else
    #define token_type_to_string(...) "DEBUG not defined for TokenType.c"
#endif
//------------------------------------------------------------------------------

bool can_be_identifier(TokenType type)
{
    return (type == IDENTIFIER) ||
           (type >  TOKEN_END_MARKER && type < ERROR_SENTINEL);
}
//------------------------------------------------------------------------------

bool can_start_identifier(TokenType type)
{
    return (type >= IDENTIFIER       && type < RESERVED_END_MARKER) ||
           (type >  TOKEN_END_MARKER && type < ERROR_SENTINEL     ) ||
           (type == IDENTIFIER_EXPECTING_LETTER);
}
//------------------------------------------------------------------------------

bool is_base_specifier(TokenType type)
{
    return (type >= BASE_SPECIFIER_BINARY && type <= BASE_SPECIFIER_DECIMAL);
}
//------------------------------------------------------------------------------

