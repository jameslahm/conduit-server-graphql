import { DataSource, DataSourceConfig } from "apollo-datasource";
import { TContext, NotFoundMessage } from "../config";
import {
  UserDocumentType,
  ArticleDocumentType,
  CommentDocumentType,
  Article,
} from "../models";
import Mongoose from "mongoose";
import {
  GetAllArticlesInput,
  GetFeedArticlesInput,
  LoginInput,
  RegisterInput,
  UpdateUserInput,
  CreateArticleInput,
  UpdateArticleInput,
  AddCommentInput,
} from "../types/graphql";
import { NotFoundError } from "../utils";

export class DBAPI extends DataSource {
  context!: TContext;

  constructor(
    public models: {
      User: Mongoose.Model<UserDocumentType, {}>;
      Article: Mongoose.Model<ArticleDocumentType, {}>;
      Comment: Mongoose.Model<CommentDocumentType, {}>;
    }
  ) {
    super();
  }

  async initialize(config: DataSourceConfig<TContext>) {
    this.context = config.context;
  }

  async login(args: LoginInput) {
    const user = await this.models.User.findOne({ email: args.email });
    return user;
  }

  async register(args: RegisterInput) {
    const user = await this.models.User.create(args as UserDocumentType);
    return user;
  }

  async getProfile(username: string) {
    const user = await this.models.User.findOne({ username: username });
    return user?.toProfileJsonFor(this.context.user);
  }

  async getAllArticles(args: GetAllArticlesInput) {
    const queryArgs: {
      author?: string;
      _id?: any;
      tagList?: any;
    } = {};
    const limit = args.limit ? args.limit : 20;
    const offset = args.offset ? args.offset : 0;
    const author = args.author;
    if (author) {
      const user = await this.getProfile(author);
      if (user) queryArgs.author = user.id;
    }
    if (args.tag) queryArgs.tagList = { $in: [args.tag] };
    const favorited = args.favorited;
    if (favorited) {
      const favoriter = await this.models.User.findOne({ username: favorited });
      if (favoriter) {
        queryArgs._id = { $in: favoriter.favorites };
      }
    }
    const articles = await this.models.Article.find(queryArgs)
      .limit(limit)
      .skip(offset)
      .populate("author");
    return {
      articles: articles.map((article) => article.toJsonFor(this.context.user)),
      articlesCount: await this.models.Article.countDocuments(queryArgs),
    };
  }
  async getFeedArticles(args: GetFeedArticlesInput) {
    const limit = args.limit ? args.limit : 20;
    const offset = args.offset ? args.offset : 0;
    const articles = await this.models.Article.find({
      author: { $in: this.context.user?.following },
    })
      .limit(limit)
      .skip(offset)
      .populate("author");
    return {
      articles: articles.map((article) => {
        return article.toJsonFor(this.context.user);
      }),
      articlesCount: await this.models.Article.countDocuments({
        author: { $in: this.context.user?.following },
      }),
    };
  }
  async getArticle(slug: string) {
    const article = await this.models.Article.findOne({ slug: slug }).populate(
      "author"
    );
    return article?.toJsonFor(this.context.user);
  }
  async getTags() {
    const tags = await Article.find().distinct("tagList");
    return tags;
  }
  async updateUser(args: UpdateUserInput) {
    await this.context.user?.update(args);
    await this.context.user?.save();
    return this.context.user;
  }
  async follow(username: string) {
    const user = await this.models.User.findOne({ username: username });
    if (user) {
      await this.context.user?.follow(user);
      return user.toProfileJsonFor(this.context.user);
    } else {
      throw new NotFoundError(NotFoundMessage);
    }
  }
  async unfollow(username: string) {
    const user = await this.models.User.findOne({ username: username });
    if (user) {
      await this.context.user?.unfollow(user);
      return user.toProfileJsonFor(this.context.user);
    } else {
      throw new NotFoundError(NotFoundMessage);
    }
  }
  async createArticle(args: CreateArticleInput) {
    const article = await this.models.Article.create({
      ...args,
      author: this.context.user,
    } as ArticleDocumentType);
    return article.toJsonFor(this.context.user);
  }
  async updateArticle(slug: string, input: UpdateArticleInput) {
    const article = await this.models.Article.findOneAndUpdate(
      { slug: slug },
      input as ArticleDocumentType
    );
    if (article) return article.toJsonFor(this.context.user);
    else {
      throw new NotFoundError(NotFoundMessage);
    }
  }
  async deleteArticle(slug: string) {
    const article = await this.models.Article.findOneAndDelete({ slug: slug });
    if (article) {
      return article.toJsonFor(this.context.user);
    } else {
      throw new NotFoundError(NotFoundMessage);
    }
  }
  async addComment(slug: string, input: AddCommentInput) {
    const article = await this.models.Article.findOne({ slug: slug });
    const comment = await this.models.Comment.create({
      ...input,
      article: article?._id,
    } as CommentDocumentType);
    return comment.toJsonFor(this.context.user);
  }
  async deleteComment(slug: string, id: string) {
    const comment = await this.models.Comment.findByIdAndDelete(id);
    return comment?.toJsonFor(this.context.user);
  }
  async favoriteArticle(slug: string) {
    const article = await this.models.Article.findOne({ slug: slug }).populate(
      "author"
    );
    await this.context.user?.favorite(article?._id);
    await article?.updateFavoriteCount();
    return article?.toJsonFor(this.context.user);
  }
  async unfavoriteArticle(slug: string) {
    const article = await this.models.Article.findOne({ slug: slug }).populate(
      "author"
    );
    await this.context.user?.unFavorite(article?._id);
    await article?.updateFavoriteCount();
    return article?.toJsonFor(this.context.user);
  }
}
