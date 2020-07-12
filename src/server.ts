import { ApolloServer } from "apollo-server";
import typedefs from "./schema";
import dotenv from "dotenv";

dotenv.config();

const server = new ApolloServer({
  typeDefs: typedefs,
  engine: {
    reportSchema: true,
  },
});

server.listen(3000).then(() => {
  console.log("Listening on http://localhost:3000");
});
