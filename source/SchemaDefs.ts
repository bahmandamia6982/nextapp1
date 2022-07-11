import { QueryTypeDefs } from './TypeDefs/Query.typedefs';
import { QueryResolvers } from './Resolvers/Query.resolvers';
import { UserTypeDefs } from './TypeDefs/User.typedef';
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
