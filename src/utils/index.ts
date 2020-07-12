import { ApolloError } from "apollo-server";

class NotFoundError extends ApolloError {
  constructor(message: string) {
    super(message, "NOT FOUND");
  }
}

class InternalServerError extends ApolloError {
  constructor(message: string) {
    super(message, "Internal Server Error");
  }
}

export { NotFoundError, InternalServerError };
