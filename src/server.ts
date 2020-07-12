import { ApolloServer, AuthenticationError } from "apollo-server";
import { typedefs, AuthDirective } from "./schema";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AuthenticationMessage } from "./config";
import { User, Article, Comment } from "./models";
import { TContext } from "./config";
import { DBAPI } from "./datasources";

dotenv.config();

const server = new ApolloServer({
  typeDefs: typedefs,
  engine: {
    reportSchema: true,
  },
  schemaDirectives: {
    auth: AuthDirective,
  },
  dataSources: () => ({
    dbAPI: new DBAPI({ User, Article, Comment }),
  }),
  context: async ({ req }) => {
    const context: TContext = { user: undefined };
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      try {
        const payload = jwt.verify(token, process.env.SECRET) as { id: string };
        const loginUser = await User.findById(payload.id);
        if (loginUser) {
          context.user = loginUser;
        } else {
          context.user = undefined;
        }
      } catch (err) {
        throw new AuthenticationError(AuthenticationMessage);
      }
    } else {
      context.user = undefined;
    }
    return context;
  },
});

server.listen(3000).then(() => {
  console.log("Listening on http://localhost:3000");
});