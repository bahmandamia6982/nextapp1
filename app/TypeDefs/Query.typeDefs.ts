import { gql } from 'apollo-server-core';

export const QueryTypeDefs = gql`
  directive @auth(role: String) on FIELD_DEFINITION
  directive @uppercase on FIELD_DEFINITION

  type Query {
    token: String
    direction: String
    getUser(name: String): User @auth(role: "admin")
  }

`;
