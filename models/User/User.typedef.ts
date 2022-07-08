import { gql } from "apollo-server-core";

export const userTypeDefs = gql`
  type User {
    name: String
    age: Int @deprecated(reason: "deprecated babe")
  }
`;
