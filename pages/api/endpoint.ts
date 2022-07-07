import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer, gql } from "apollo-server-micro";
import Cors from "micro-cors";
import mongoose from "mongoose";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
  ForbiddenError,
} from "apollo-server-core";
import { isDevMode } from "../../utils/utils";
import User from "../../models/User";
import { JsonWebTokenError } from "jsonwebtoken";
import { PageNotFoundError } from "next/dist/shared/lib/utils";

const connectDatabase = mongoose.connect(
  "mongodb+srv://bahmandamia6982:bahmandamia6982@demo.wstts.mongodb.net/demo?retryWrites=true&w=majority"
);

const cors = Cors({
  allowMethods: ["POST"],
  origin: "*/*",
  allowCredentials: true,
});

const typeDefs = gql`
  type Query {
    token: String
    getUsers(name: String!, skip: Float = 0, limit: Float! = 100): [User]
  }
  type Mutation {
    createUser(name: String!, age: Float!): User!
  }
  type User {
    name: String
    age: Float
  }
`;

const resolvers = {
  Query: {
    token: (parent: any, args: any, context: any) => {
      return "this is token";
    },
    getUsers: async (parent: any, { name, skip, limit }: any, context: any) => {
      const regex = new RegExp(name, 'i')
      const users = await User.find({ name: regex }).skip(skip).limit(limit);
      return users
    },
  },
  Mutation: {
    createUser: async (parent: any, args: any, context: any) => {
        const newUser = new User({...args})
        const user = await newUser.save()
        return user
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: false,
  csrfPrevention: true,
  plugins: [
    isDevMode
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled(),
  ],
  context: ({ req }) => {
    return {};
  },
});

const startServer = server.start();

export default cors(
  async (req: NextApiRequest | any, res: NextApiResponse | any) => {
    try {
      await connectDatabase;
      console.warn("connected to mongodb");
    } catch (error) {
      console.warn("failed to onnect monodb");
    }
    try {
      await startServer;
      console.warn(
        `connected to apollo server on http://localhost:3000/api/endpoint`
      );
    } catch (error) {
      console.warn("failed to connect to apollo server");
    }
    try {
      await server.createHandler({ path: req.url })(req, res);
      console.warn("apollo server handler created");
    } catch (error) {
      console.warn("failed to apollo server create handler");
    }
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};
