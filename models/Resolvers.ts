import { queryResolvers } from "./Query/Query.resolvers";
import { userResolvers } from "./User/User.resolvers";

/**
 * 
 * 
 * 
 * 
 * Add your resolvers to this list to merging with graphql schema
 */
export default [
    queryResolvers,
    userResolvers
]