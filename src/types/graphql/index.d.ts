import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql";
import { TResolverContext } from "../../datasources";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  token: Scalars["String"];
  username: Scalars["String"];
  bio: Scalars["String"];
  image: Scalars["String"];
};

export type Profile = {
  __typename?: "Profile";
  id: Scalars["ID"];
  username: Scalars["String"];
  bio: Scalars["String"];
  image: Scalars["String"];
  following: Scalars["Boolean"];
};

export type Article = {
  __typename?: "Article";
  id: Scalars["ID"];
  slug: Scalars["String"];
  title: Scalars["String"];
  description: Scalars["String"];
  body: Scalars["String"];
  tagList: Array<Maybe<Scalars["String"]>>;
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  favorited: Scalars["Boolean"];
  favoritesCount: Scalars["Int"];
  author: Profile;
};

export type MultipleArticles = {
  __typename?: "MultipleArticles";
  articles: Array<Maybe<Article>>;
  articlesCount: Scalars["Int"];
};

export type Comment = {
  __typename?: "Comment";
  id: Scalars["ID"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  body: Scalars["String"];
  author: Profile;
};

export type MultipleComments = {
  __typename?: "MultipleComments";
  comments: Array<Maybe<Comment>>;
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type RegistrationInput = {
  email: Scalars["String"];
  username: Scalars["String"];
  password: Scalars["String"];
};

export type UpdateUserInput = {
  email?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  image?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
};

export type GetAllArticlesInput = {
  tag?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
  favorited?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type GetFeedArticlesInput = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type CreateArticleInput = {
  title: Scalars["String"];
  description: Scalars["String"];
  body: Scalars["String"];
  tagList: Array<Maybe<Scalars["String"]>>;
};

export type AddCommentInput = {
  body: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getCurrentUser?: Maybe<User>;
  getProfile?: Maybe<Profile>;
  getAllArticles?: Maybe<MultipleArticles>;
  getFeedArticles?: Maybe<MultipleArticles>;
  getArticle?: Maybe<Article>;
  getComments?: Maybe<MultipleComments>;
  getTags?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type QueryGetProfileArgs = {
  username: Scalars["String"];
};

export type QueryGetAllArticlesArgs = {
  input: GetAllArticlesInput;
};

export type QueryGetFeedArticlesArgs = {
  input: GetFeedArticlesInput;
};

export type QueryGetArticleArgs = {
  slug: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  login?: Maybe<User>;
  registration?: Maybe<User>;
  updateUser?: Maybe<User>;
  follow?: Maybe<Profile>;
  unfollow?: Maybe<Profile>;
  createArticle?: Maybe<Article>;
  updateArticle?: Maybe<Article>;
  deleteArticle?: Maybe<Article>;
  addComment?: Maybe<Comment>;
  deleteComment?: Maybe<Comment>;
  favoriteArticle?: Maybe<Article>;
  unfavoriteArticle?: Maybe<Article>;
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRegistrationArgs = {
  input: RegistrationInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MutationFollowArgs = {
  username: Scalars["String"];
};

export type MutationUnfollowArgs = {
  username: Scalars["String"];
};

export type MutationCreateArticleArgs = {
  input: CreateArticleInput;
};

export type MutationUpdateArticleArgs = {
  input: CreateArticleInput;
};

export type MutationDeleteArticleArgs = {
  slug: Scalars["String"];
};

export type MutationAddCommentArgs = {
  input: AddCommentInput;
};

export type MutationDeleteCommentArgs = {
  slug: Scalars["String"];
  id: Scalars["ID"];
};

export type MutationFavoriteArticleArgs = {
  slug: Scalars["String"];
};

export type MutationUnfavoriteArticleArgs = {
  slug: Scalars["String"];
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Profile: ResolverTypeWrapper<Profile>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Article: ResolverTypeWrapper<Article>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  MultipleArticles: ResolverTypeWrapper<MultipleArticles>;
  Comment: ResolverTypeWrapper<Comment>;
  MultipleComments: ResolverTypeWrapper<MultipleComments>;
  LoginInput: LoginInput;
  RegistrationInput: RegistrationInput;
  UpdateUserInput: UpdateUserInput;
  GetAllArticlesInput: GetAllArticlesInput;
  GetFeedArticlesInput: GetFeedArticlesInput;
  CreateArticleInput: CreateArticleInput;
  AddCommentInput: AddCommentInput;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars["Upload"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  User: User;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Profile: Profile;
  Boolean: Scalars["Boolean"];
  Article: Article;
  Int: Scalars["Int"];
  MultipleArticles: MultipleArticles;
  Comment: Comment;
  MultipleComments: MultipleComments;
  LoginInput: LoginInput;
  RegistrationInput: RegistrationInput;
  UpdateUserInput: UpdateUserInput;
  GetAllArticlesInput: GetAllArticlesInput;
  GetFeedArticlesInput: GetFeedArticlesInput;
  CreateArticleInput: CreateArticleInput;
  AddCommentInput: AddCommentInput;
  Query: {};
  Mutation: {};
  Upload: Scalars["Upload"];
};

export type UserResolvers<
  ContextType = TResolverContext,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  bio?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  image?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ProfileResolvers<
  ContextType = TResolverContext,
  ParentType extends ResolversParentTypes["Profile"] = ResolversParentTypes["Profile"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  bio?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  image?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  following?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ArticleResolvers<
  ContextType = TResolverContext,
  ParentType extends ResolversParentTypes["Article"] = ResolversParentTypes["Article"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  body?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tagList?: Resolver<
    Array<Maybe<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  favorited?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  favoritesCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  author?: Resolver<ResolversTypes["Profile"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MultipleArticlesResolvers<
  ContextType = TResolverContext,
  ParentType extends ResolversParentTypes["MultipleArticles"] = ResolversParentTypes["MultipleArticles"]
> = {
  articles?: Resolver<
    Array<Maybe<ResolversTypes["Article"]>>,
    ParentType,
    ContextType
  >;
  articlesCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CommentResolvers<
  ContextType = TResolverContext,
  ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  body?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  author?: Resolver<ResolversTypes["Profile"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MultipleCommentsResolvers<
  ContextType = TResolverContext,
  ParentType extends ResolversParentTypes["MultipleComments"] = ResolversParentTypes["MultipleComments"]
> = {
  comments?: Resolver<
    Array<Maybe<ResolversTypes["Comment"]>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<
  ContextType = TResolverContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  getCurrentUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType
  >;
  getProfile?: Resolver<
    Maybe<ResolversTypes["Profile"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetProfileArgs, "username">
  >;
  getAllArticles?: Resolver<
    Maybe<ResolversTypes["MultipleArticles"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetAllArticlesArgs, "input">
  >;
  getFeedArticles?: Resolver<
    Maybe<ResolversTypes["MultipleArticles"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetFeedArticlesArgs, "input">
  >;
  getArticle?: Resolver<
    Maybe<ResolversTypes["Article"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetArticleArgs, "slug">
  >;
  getComments?: Resolver<
    Maybe<ResolversTypes["MultipleComments"]>,
    ParentType,
    ContextType
  >;
  getTags?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
};

export type MutationResolvers<
  ContextType = TResolverContext,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  login?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "input">
  >;
  registration?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRegistrationArgs, "input">
  >;
  updateUser?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateUserArgs, "input">
  >;
  follow?: Resolver<
    Maybe<ResolversTypes["Profile"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFollowArgs, "username">
  >;
  unfollow?: Resolver<
    Maybe<ResolversTypes["Profile"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUnfollowArgs, "username">
  >;
  createArticle?: Resolver<
    Maybe<ResolversTypes["Article"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateArticleArgs, "input">
  >;
  updateArticle?: Resolver<
    Maybe<ResolversTypes["Article"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateArticleArgs, "input">
  >;
  deleteArticle?: Resolver<
    Maybe<ResolversTypes["Article"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteArticleArgs, "slug">
  >;
  addComment?: Resolver<
    Maybe<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddCommentArgs, "input">
  >;
  deleteComment?: Resolver<
    Maybe<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    RequireFields<MutationDeleteCommentArgs, "slug" | "id">
  >;
  favoriteArticle?: Resolver<
    Maybe<ResolversTypes["Article"]>,
    ParentType,
    ContextType,
    RequireFields<MutationFavoriteArticleArgs, "slug">
  >;
  unfavoriteArticle?: Resolver<
    Maybe<ResolversTypes["Article"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUnfavoriteArticleArgs, "slug">
  >;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type Resolvers<ContextType = TResolverContext> = {
  User?: UserResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Article?: ArticleResolvers<ContextType>;
  MultipleArticles?: MultipleArticlesResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  MultipleComments?: MultipleCommentsResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = TResolverContext> = Resolvers<ContextType>;
