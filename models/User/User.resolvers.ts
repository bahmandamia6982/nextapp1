function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const userResolvers = {
  Query: {
    getUser: (parent, args, context, info) => {
      return { name: "Bahman World", age: randomNumber(5, 8) };
    },
  },
};
