import { PrismaClient } from '@prisma/client';

export const UserResolvers = {
  Query: {
    getUser: async (parent, args, context) => {
      const prisma = new PrismaClient();
      const user = await prisma.user.findFirst({ where: { name: { contains: args.name, mode: 'insensitive' } } });
      return user;
    },
  },

  Mutation: {
    createUser: async (parent, { fields }, context) => {
      const prisma = new PrismaClient();
      const user = await prisma.user.create({ data: fields });
      return user;
    },
  },
};
