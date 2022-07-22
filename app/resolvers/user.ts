// @ts-ignore
import { prisma } from '../utils/prisma';

export const UserResolvers = {
  Query: {
    // TODO: Retrieve first user by name
    getUser: async (parent, args, context) => {
      const user = await prisma.user.findFirst({
        where: { name: { contains: args.name, mode: 'insensitive' } },
      });
      return user;
    },

    // TODO: Retrieve all users
    getUsers: async () => {
      const users = await prisma.user.findMany({
        include: {
          _count: true,
        },
      });
      return users;
    },

    // TODO: Retrieve user by unique id
    //62cdab1a18bb578dde2ec6de
    getUserByID: async (parent, args, context) => {
      const user = await prisma.user.findFirst({ where: { id: args.id } });
      return user;
    },
  },

  // todo: Mutations is here
  Mutation: {
    createUser: async (parent, { fields }, context) => {
      const user = await prisma.user.create({ data: fields });
      return user;
    },
  },
};
