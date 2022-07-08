import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import mongoose from "mongoose";
import Cors from "micro-cors";
import { isDevMode } from "../../utils/utils";
import { authDirective } from "../../models/Directives/Auth.directive";
import { upperDirective } from "../../models/Directives/Upper.directive";
import TypeDefs from "../../models/TypeDefs";
import Resolvers from "../../models/Resolvers";

const connect = mongoose.connect(process.env.MONGO_URL || "");

let schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(TypeDefs),
  resolvers: mergeResolvers(Resolvers),
});

schema = authDirective(schema, "auth");
schema = upperDirective(schema, "upper");

const server = new ApolloServer({
  schema,
  introspection: false,
  csrfPrevention: true,
  plugins: [
    isDevMode
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled(),
  ],
  context: ({ req }) => {
    const data: any = {};
    data.token = req.headers.authorization?.split(" ")[1] ?? null;
    return data;
  },
});

const cors = Cors({
  allowMethods: ["POST"],
  allowHeaders: ["authorization"],
  origin: "*/*",
  allowCredentials: true,
});

export default cors(
  async (req: NextApiRequest | any, res: NextApiResponse | any) => {
    try {
      await connect;
      console.warn("mongoose connected...");
    } catch (error) {
      console.warn("mongoose connection failed");
    }
    try {
      await server.start();
      console.warn(`apollo server running...`);
    } catch (error) {
      console.warn("apollo server connection failed");
    }
    try {
      await server.createHandler({ path: req.url })(req, res);
      console.warn("apollo server handler created...");
    } catch (error) {
      console.warn("server handler creation failed");
    }
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};
