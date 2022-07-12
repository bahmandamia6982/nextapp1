import { NextApiRequest, NextApiResponse } from 'next';
import 'colors'; // * Used for terminal text colors and VSCode and Windows 11
import Cors from 'micro-cors';
import { ApolloServer } from 'apollo-server-micro';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mongoose from 'mongoose';
import { authDirective } from '../../app/Directives/Auth.directive';
import { uppercaseDirective } from '../../app/Directives/Uppercase.directive';
import { TypeDefs, Resolvers } from '../../app/SchemaDefs';
import '../../app/Utils/i18n';
import { initializeI18Next } from '../../app/Utils/i18n';
import { readFileSync } from 'fs';
import path from 'path';

const cors = Cors();
const connectMongoDBAtlasServer = () => mongoose.connect(process.env.MONGO_URL || '');

let schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(TypeDefs),
  resolvers: mergeResolvers(Resolvers),
});
schema = authDirective(schema, 'auth');
schema = uppercaseDirective(schema, 'uppercase');

let host: String | null = ""

const server = new ApolloServer({
  schema,
  introspection: false,
  csrfPrevention: true,
  plugins: [
    process.env.NODE_ENV == 'production'
      ? {
          async serverWillStart() {
            return {
              async renderLandingPage() {
                const html = readFileSync(path.join(process.cwd(), 'app/templates/404.html'), 'utf-8');
                return { html };
              },
            };
          },
        }
      : {}
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

  console.warn((req as NextApiRequest).headers.host)

  initializeI18Next();

  await connectMongoDBAtlasServer();

  const handler = await getHandler(req.url);
  await handler(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
