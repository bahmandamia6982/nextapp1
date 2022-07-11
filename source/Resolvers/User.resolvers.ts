import { sign } from 'jsonwebtoken';
import { UserNotFoundError } from '../Errors/UserNotFoundError.error';
import User from '../Models/User';

export const UserResolvers = {
  Query: {
    // getUser: async (parent, args, context) => {
    //   const name = new RegExp(args.name, 'i');
    //   const user = await User.findOne({ name });
    //   if (!user) {
    //     throw new UserNotFoundError('this user not found or not exist');
    //   }
    //   return user;
    // },
  },

  Mutation: {
    // createUser: async (parent, { fields }, context) => {
    //   const user = {
    //     name: fields.name,
    //     age: fields.age,
    //   };

    //   const newUser = new User(user);
    //   await newUser.save();

    //   return newUser;
    // },
  },
};
