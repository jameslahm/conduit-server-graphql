import { gql } from "apollo-server";

const typedefs = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    bio: String!
    image: String!
  }

  type Profile {
    id: ID!
    username: String!
    bio: String!
    image: String!
    following: Boolean!
  }

  type Article {
    id: ID!
    slug: String!
    title: String!
    description: String!
    body: String!
    tagList: [String]!
    createdAt: String!
    updatedAt: String!
    favorited: Boolean!
    favoritesCount: Int!
    author: Profile!
  }

  type MultipleArticles {
    articles: [Article]!
    articlesCount: Int!
  }

  type Comment {
    id: ID!
    createdAt: String!
    updatedAt: String!
    body: String!
    author: Profile!
  }

  type MultipleComments {
    comments: [Comment]!
  }

  input LoginInput {
    email: String!
    password: String!
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
    tagList: [String]!
  }

  input AddCommentInput {
    body: String!
  }

  directive @auth on FIELD_DEFINITION

  type Query {
    getCurrentUser: User @auth
    getProfile(username: String!): Profile
    getAllArticles(input: GetAllArticlesInput!): MultipleArticles
    getFeedArticles(input: GetFeedArticlesInput!): MultipleArticles @auth
    getArticle(slug: String!): Article
    getComments: MultipleComments
    getTags: [String]
  }

  type Mutation {
    login(input: LoginInput!): User
    registration(input: RegistrationInput!): User
    updateUser(input: UpdateUserInput!): User @auth
    follow(username: String!): Profile @auth
    unfollow(username: String!): Profile @auth
    createArticle(input: CreateArticleInput!): Article @auth
    updateArticle(input: CreateArticleInput!): Article @auth
    deleteArticle(slug: String!): Article @auth
    addComment(input: AddCommentInput!): Comment @auth
    deleteComment(slug: String!, id: ID!): Comment @auth
    favoriteArticle(slug: String!): Article @auth
    unfavoriteArticle(slug: String!): Article @auth
  }
`;

export { typedefs };
