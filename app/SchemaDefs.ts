import { QueryTypeDefs } from './TypeDefs/Query.typeDefs';
import { QueryResolvers } from './Resolvers/Query.resolvers';
import { UserTypeDefs } from './TypeDefs/User.typeDefs';
import { UserResolvers } from './Resolvers/User.resolvers';

/**
 *
 * Add your typeDefs to this list to merging with graphql schema
 */
export const TypeDefs = [QueryTypeDefs, UserTypeDefs];
/**
 *
 * Add your resolvers to this list to merging with graphql schema
 */
export const Resolvers = [QueryResolvers, UserResolvers];
