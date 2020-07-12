import { gql } from "apollo-server";

const typedefs = gql`
  type User {
    email: String
    token: String
    username: String
    bio: String
    image: String
  }

  type UserResponse {
    user: User
  }

  type Profile {
    username: String
    bio: String
    image: String
    following: Boolean
  }

  type ProfileResponse {
    profile: Profile
  }

  type Article {
    slug: String
    title: String
    description: String
    body: String
    tagList: [String]!
    createdAt: String
    updatedAt: String
    favorited: Boolean
    favoritesCount: Int
    author: Profile
  }

  type MultipleArticles {
    articles: [Article]
    articlesCount: Int
  }

  type SingleArticle {
    article: Article
  }

  type Comment {
    id: ID
    createdAt: String
    updatedAt: String
    body: String
    author: Profile
  }

  type SingleComment {
    comment: Comment
  }

  type MultipleComments {
    comments: [Comment]
  }

  type Tags {
    tags: [String]
  }

  input LoginInput {
    email: String
    password: String
  }

  input RegistrationInput {
    email: String!
    username: String!
    password: String!
  }

  input UpdateUserInput {
    email: String
    username: String
    password: String
    image: String
    bio: String
  }

  input GetAllArticlesInput {
    tag: String
    author: String
    favorited: String
    limit: Int
    offset: Int
  }

  input GetFeedArticlesInput {
    limit: Int
    offset: Int
  }

  input CreateArticleInput {
    title: String!
    description: String!
    body: String!
    tagList: [String]
  }

  input AddCommentInput {
    body: String
  }

  type Query {
    getCurrentUser: UserResponse
    getProfile: ProfileResponse
    getAllArticles(input: GetAllArticlesInput): MultipleArticles
    getFeedArticles(input: GetFeedArticlesInput): MultipleArticles
    getArticle: SingleArticle
    getComments: MultipleComments
    getTags: Tags
  }

  type Mutation {
    login(input: LoginInput): UserResponse
    registration(input: RegistrationInput): UserResponse
    updateUser(input: UpdateUserInput): UserResponse
    follow: ProfileResponse
    unfollow: ProfileResponse
    createArticle(input: CreateArticleInput): SingleArticle
    updateArticle(input: CreateArticleInput): SingleArticle
    deleteArticle: SingleArticle
    addComment(input: AddCommentInput): SingleComment
    deleteComment: SingleComment
    favoriteArticle: SingleArticle
    unfavoriteArticle: SingleArticle
  }
`;

export default typedefs;
