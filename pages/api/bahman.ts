import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer, gql } from "apollo-server-micro";
import { AuthenticationError } from "apollo-server-core";
import mongoose from "mongoose";
import User from "../../models/User";


const connectMongoServer = mongoose.connect(
  "mongodb+srv://bahmandamia6982:58VRUYHALA4VqAnR@test.wstts.mongodb.net/Cluster0"
);

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
      return context.token ?? "no token found";
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
    createUser: (parent: any, args: any, context: any) => {
      const user = new User({
        name: args.name,
        age: args.age,
      });
      user.save();
      return user;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  csrfPrevention: true,
  context: ({ req }) => {
    const token = req.headers.authorization?.split(" ")[1] ?? null;
    if (token && token != "bahman") {
      throw new AuthenticationError("Please login first");
    }
    return { token };
  },
});

const start = server.start();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongoServer;
    console.warn("connected");
  } catch (e) {
    console.warn("failed");
  }
  await start;
  await server.createHandler({ path: req.url })(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
