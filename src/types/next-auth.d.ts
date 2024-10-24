import { Session } from "next-auth";
import { UserDocument } from "./types.old";

declare module "next-auth" {
  interface Session {
    user: UserDocument;
  }
}
