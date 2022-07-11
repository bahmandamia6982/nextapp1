import { NextApiRequest, NextApiResponse } from 'next';
import 'colors'; // ! Used for terminal text colors
import Cors from 'micro-cors';
import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageDisabled, Context, ContextFunction } from 'apollo-server-core';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mongoose from 'mongoose';
import { isDevMode } from '../../source/Utils/helpers';
import { authDirective } from '../../source/Directives/Auth.directive';
import { uppercaseDirective } from '../../source/Directives/Uppercase.directive';
import { TypeDefs, Resolvers } from '../../source/SchemaDefs';
import '../../source/Utils/i18n';
import { MicroRequest } from 'apollo-server-micro/dist/types';

const cors = Cors({
  allowCredentials: false
});
const connect = mongoose.connect(process.env.MONGO_URL || '');

let schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(TypeDefs),
  resolvers: mergeResolvers(Resolvers),
});
schema = authDirective(schema, 'auth');
schema = uppercaseDirective(schema, 'uppercase');

const server = new ApolloServer({
  schema,
  introspection: true,
  csrfPrevention: true,
  plugins: [!isDevMode ? ApolloServerPluginLandingPageDisabled() : {}],
  context: ({ req }) => {
    const context: any = {};
    context.token = req.headers.authorization?.split(' ')[1] ?? null;
    context.locale = req.headers?.locale ?? 'en';
    return context;
  },
});

export default cors(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  try {
    await connect;
    console.log('› mongodb is running...'.white.bgGreen);
  } catch (error) {
    console.error('× mongoose connection failed'.bgRed);
  }
  try {
    await server.start();
    console.log('› apollo-server is running...'.white.bgGreen);
  } catch (error) {
    console.error('× apollo-server already started'.bgYellow);
  }
  try {
    await server.createHandler({ path: req.url })(req, res);
    console.log('› apollo-server handler has been created...'.white.bgGreen);
  } catch (error) {
    console.error('× apollo-server handler  creation failed'.bgRed);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
