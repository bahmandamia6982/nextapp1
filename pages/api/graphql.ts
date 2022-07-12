import { NextApiRequest, NextApiResponse } from 'next';
import 'colors'; // * Used for terminal text colors and VSCode and Windows 11
import Cors from 'micro-cors';
import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mongoose from 'mongoose';
import { isDevMode } from '../../app/Utils/helpers';
import { authDirective } from '../../app/Directives/Auth.directive';
import { uppercaseDirective } from '../../app/Directives/Uppercase.directive';
import { TypeDefs, Resolvers } from '../../app/SchemaDefs';
import '../../app/Utils/i18n';
import { initializeI18Next } from '../../app/Utils/i18n';
import { Disposable } from 'graphql-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';

initializeI18Next(); // ! init i18n translations before starting apollo server
console.warn(`i18n initialized now at ${new Date(Date.now()).toDateString()}`);

const cors = Cors();
const connectMongoDBAtlasServer = () => mongoose.connect(process.env.MONGO_URL || '');

let schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(TypeDefs),
  resolvers: mergeResolvers(Resolvers),
});
schema = authDirective(schema, 'auth');
schema = uppercaseDirective(schema, 'uppercase');

const wsServer = new WebSocketServer({ port: 5000 });
let serverCleanup: Disposable | null = null;

const server = new ApolloServer({
  schema,
  introspection: false,
  csrfPrevention: true,
  plugins: [
    ApolloServerPluginLandingPageDisabled(),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup?.dispose();
          },
        };
      },
    },
  ],
  context: ({ req }) => {
    const context: any = {};
    context.token = req.headers.authorization?.split(' ')[1] ?? null;
    context.language = (req as NextApiRequest).headers['accept-language'] ?? 'en';
    return context;
  },
});

const startApolloServer = server.start();
const getHandler = async (url: string) => {
  await startApolloServer;
  return server.createHandler({
    path: url,
  });
};

export default cors(async (req: NextApiRequest | any, res: NextApiResponse | any) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  res.socket.server.ws = wsServer;
  serverCleanup = useServer({ schema }, wsServer);

  await connectMongoDBAtlasServer();

  const handler = await getHandler(req.url);
  await handler(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
