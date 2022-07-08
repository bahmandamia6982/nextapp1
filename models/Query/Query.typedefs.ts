import { gql } from "apollo-server-core";

export const queryTypeDefs = gql`

  directive @master on FIELD_DEFINITION
  directive @admin on FIELD_DEFINITION
  directive @user on FIELD_DEFINITION
  directive @auth(role: String)  on FIELD_DEFINITION
  directive @upper  on FIELD_DEFINITION

  type Query{
    token: String
    getUser: User! @auth(role: "admin")
  }
`;
