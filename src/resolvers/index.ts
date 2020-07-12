import { Resolvers } from "../types/graphql/index";
import { NotFoundMessage, InternalServerErrorMessage } from "../config";
import { NotFoundError, InternalServerError } from "../utils";

export const resolvers: Resolvers = {
  Query: {
    async getCurrentUser(source, args, { dataSources, user }, info) {
      if (user?.id) {
        const auth = user.toAuthJson();
        if (auth) {
          return auth;
        }
      }
      return null;
    },
    async getProfile(source, args, { dataSources, user }, info) {
      const { username } = args;
      const profile = await dataSources.dbAPI.getProfile(username);
      if (profile) return profile;
      else {
        return null;
      }
    },
    async getAllArticles(source, args, { dataSources, user }, info) {
      return dataSources.dbAPI.getAllArticles(args.input);
    },
    async getFeedArticles(source, args, { dataSources, user }, info) {
      return dataSources.dbAPI.getFeedArticles(args.input);
    },
    async getArticle(source, args, { dataSources, user }, info) {
      const article = await dataSources.dbAPI.getArticle(args.slug);
      if (article) {
        return article;
      } else {
        return null;
      }
    },
    async getTags(source, args, { dataSources, user }, info) {
      return dataSources.dbAPI.getTags();
    },
  },
  Mutation: {
    async login(source, args, { dataSources, user }, info) {
      const loginUser = await dataSources.dbAPI.login(args.input);
      if (!loginUser) {
        throw new NotFoundError(NotFoundMessage);
      }
      return loginUser.toAuthJson();
    },
    async registration(source, args, { dataSources, user }, info) {
      const loginUser = await dataSources.dbAPI.register(args.input);
      if (!loginUser) {
        throw new InternalServerError(InternalServerErrorMessage);
      }
      return loginUser.toAuthJson();
    },
    async updateUser(source, args, { dataSources, user }, info) {
      const loginUser = await dataSources.dbAPI.updateUser(args.input);
      if (loginUser) {
        return loginUser.toAuthJson();
      }
      return null;
    },
    async follow(source, args, { dataSources, user }, info) {
      const profile = await dataSources.dbAPI.follow(args.username);
      if (profile) {
        return profile;
      }
      return null;
    },
  },
};
