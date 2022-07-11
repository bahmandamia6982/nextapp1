import { ApolloError } from "apollo-server-core";

export class UserNotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, "USER_NOT_FOUND_ERROR");
  }
}
