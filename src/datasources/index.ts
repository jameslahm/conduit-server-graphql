import { TContext } from "../config";
import { DBAPI } from "./db";
export * from "./db";

export interface TResolverContext extends TContext {
  dataSources: {
    dbAPI: DBAPI;
  };
}
