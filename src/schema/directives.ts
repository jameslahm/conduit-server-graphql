import { SchemaDirectiveVisitor, AuthenticationError } from "apollo-server";
import {
  defaultFieldResolver,
  GraphQLField,
  GraphQLObjectType,
  GraphQLInterfaceType,
} from "graphql";

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(
    field: GraphQLField<any, any>,
    details: { objectType: GraphQLObjectType | GraphQLInterfaceType }
  ) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      if (!args[2].user) {
        throw new AuthenticationError("Not Authenticated");
      }
      return resolve.apply(this, args);
    };
  }
}

export { AuthDirective };
