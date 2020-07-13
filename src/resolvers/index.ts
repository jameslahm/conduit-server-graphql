import { Resolvers } from "../types/graphql/index";
import { NotFoundMessage, InternalServerErrorMessage } from "../config";
import { NotFoundError, InternalServerError } from "../utils";
import { AddArgumentsAsVariables } from "apollo-server";

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
    async register(source, args, { dataSources, user }, info) {
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
    async unfollow(source, args, { dataSources, user }, info) {
      const profile = await dataSources.dbAPI.unfollow(args.username);
      if (profile) {
        return profile;
      }
      return null;
    },
    async createArticle(source, args, { dataSources, user }, info) {
      const article = await dataSources.dbAPI.createArticle(args.input);
      return article;
    },
    async updateArticle(source, args, { dataSources, user }, info) {
      const article = await dataSources.dbAPI.updateArticle(
        args.slug,
        args.input
      );
      return article;
    },
    async deleteArticle(source, args, { dataSources, user }, info) {
      const article = await dataSources.dbAPI.deleteArticle(args.slug);
      return article;
    },
    async addComment(source, args, { dataSources, user }, info) {
      const comment = await dataSources.dbAPI.addComment(args.slug, args.input);
      return comment;
    },
    async deleteComment(source, args, { dataSources, user }, info) {
      const comment = await dataSources.dbAPI.deleteComment(args.slug, args.id);
      if (comment) {
        return comment;
      } else {
        return null;
      }
    },
    async favoriteArticle(source, args, { dataSources, user }, info) {
      const article = await dataSources.dbAPI.favoriteArticle(args.slug);
      if (article) {
        return article;
      } else {
        return null;
      }
    },
    async unfavoriteArticle(source, args, { dataSources, user }, info) {
      const article = await dataSources.dbAPI.unfavoriteArticle(args.slug);
      if (article) {
        return article;
      } else {
        return null;
      }
    },
  },
};
