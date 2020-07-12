import dotenv from "dotenv";
import path from "path";
import { UserDocumentType } from "../models";

// Process env
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

// Constant response string

// 401
const AuthenticationMessage = "Authentication Error";
// 404
const NotFoundMessage = "Not Found";
// 500
const InternalServerErrorMessage = "Internal Server Error";
// 422
const NotUniqueMessage = "Already Taken";

export {
  AuthenticationMessage,
  NotFoundMessage,
  InternalServerErrorMessage,
  NotUniqueMessage,
};

export interface TContext {
  user: UserDocumentType | undefined;
}
