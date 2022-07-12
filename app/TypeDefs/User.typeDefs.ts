import { gql } from 'apollo-server-core';

export const UserTypeDefs = gql`
  type User {
    name: String 
    currentAge: Int @deprecated(reason: "Use [age] field")
    age: Int
  }

  input UserFields {
    name: String!
    age: Int!
  }

  type Mutation {
    createUser(fields: UserFields): User!
  }

`;
