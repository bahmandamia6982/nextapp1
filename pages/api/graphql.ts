import { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import path from 'path';
import Cors from 'micro-cors';
import { ApolloServer } from 'apollo-server-micro';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mongoose from 'mongoose';
import { typeDefs, resolvers } from '../../app/schema';
import { initializeI18Next } from '../../app/utils/i18n';
import { applyDirectives } from '../../app/directives/apply';

const cors = Cors();
const connectMongoDBAtlasServer = () => mongoose.connect(process.env.MONGO_URL || '');

const schema = makeExecutableSchema({ typeDefs, resolvers });
// TODO: Here we apply all directive on schema
applyDirectives(schema);
const server = new ApolloServer({
  schema,
  introspection: process.env.NODE_ENV == 'development',
  csrfPrevention: true,
  plugins: [
    process.env.NODE_ENV == 'production'
      ? {
          async serverWillStart() {
            return {
              async renderLandingPage() {
                const html = readFileSync(
                  path.join(process.cwd(), 'app/templates/404.html'),
                  'utf-8'
                );
                return { html };
              },
            };
          },
        }
      : {},
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
