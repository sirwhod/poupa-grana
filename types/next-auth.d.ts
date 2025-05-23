/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    firebaseIdToken?: string;
  }
  interface User {
    firebaseIdToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    firebaseIdToken?: string;
  }
}