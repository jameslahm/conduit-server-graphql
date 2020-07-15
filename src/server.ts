import { ApolloServer, AuthenticationError } from "apollo-server";
import { typedefs, AuthDirective } from "./schema";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AuthenticationMessage } from "./config";
import { User, Article, Comment } from "./models";
import { TContext } from "./config";
import { DBAPI } from "./datasources";
import { resolvers } from "./resolvers";
import mongoose from "mongoose";
import responseCachePlugin from "apollo-server-plugin-response-cache";
import { RedisCache } from "apollo-server-cache-redis";

dotenv.config();
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose
  .connect(process.env.MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  });

process.env.NODE_ENV = "production";

const server = new ApolloServer({
  cache: new RedisCache({
    host: process.env.REDIS_URI,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  }),
  typeDefs: typedefs,
  // engine: {
  //   reportSchema: true,
  // },
  resolvers: resolvers as any,
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
  plugins: [
    responseCachePlugin({
      sessionId: (requestContext) =>
        requestContext.request.http?.headers.get("authorization") || null,
    }),
  ],
  cacheControl: {
    defaultMaxAge: 30,
  },
});

server.listen(4000).then(() => {
  console.log("Listening on http://localhost:4000");
});

// const func = server.createHandler({
//   cors: {
//     origin: "*",
//     credentials: true,
//   },
// });
// exports.handler = (
//   event: APIGatewayProxyEvent,
//   context: Context,
//   callback: Callback<APIGatewayProxyResult>
// ) => {
//   context.callbackWaitsForEmptyEventLoop = false;
//   func(event, context, callback);
// };
