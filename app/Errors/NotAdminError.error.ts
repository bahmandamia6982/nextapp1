import { ApolloError } from "apollo-server-core";

export class NotAdminError extends ApolloError {
  constructor(message: string) {
    super(message, "NOT_ADMIN_ERROR");
  }
}
