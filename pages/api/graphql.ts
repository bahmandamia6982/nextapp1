import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer, gql } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  AuthenticationError,
} from "apollo-server-core";
import Cors from "micro-cors";
import User from "../../models/User";
import mongoose from "mongoose";

const connect = mongoose.connect(
  "mongodb+srv://bahmandamia6982:bahmandamia6982@demo.wstts.mongodb.net/demo?retryWrites=true&w=majority"
);

const cors = Cors();

const typeDefs = gql`
  type Query {
    token: String
    getUsers(name: String!, skip: Float = 0, limit: Float! = 0): [User]
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
      return "eya4s9a4sx9a4s9x4asx";
    },
    getUsers: async (parent: any, args: any, context: any) => {
      const nameRegex = new RegExp(args.name, "i");
      const user = await User.find({ name: nameRegex })
        .skip(args.skip)
        .limit(args.limit);
      return user;
    },
  },
  Mutation: {
    createUser: async (parent: any, args: any, context: any) => {
      const user = new User({
        name: args.name,
        age: args.age,
      });
      await user.save();
      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: false,
  csrfPrevention: true,
  context: ({ req }) => {
    return {};
  },
});

const start = server.start();

export default cors(
  async (req: NextApiRequest | any, res: NextApiResponse | any) => {
    try {
      await connect;
      console.warn("connected to mongodb");
    } catch (error) {
      console.warn("failed to onnect monodb");
    }
    try {
      await start;
      console.warn(
        `connected to apollo server on http://localhost:3000/api/bahman`
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
