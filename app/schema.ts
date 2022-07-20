import { QueryResolvers } from './resolvers/query';
import { UserResolvers } from './resolvers/user';
import { mergeResolvers } from '@graphql-tools/merge';
// @ts-ignore
import SchemaDefinitions from './schema.graphql';
import { PostResolvers } from './resolvers/post';

export const typeDefs = SchemaDefinitions;
export const resolvers = mergeResolvers([QueryResolvers, UserResolvers, PostResolvers]);
