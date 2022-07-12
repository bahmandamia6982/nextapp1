import { t } from 'i18next';
import { sign } from 'jsonwebtoken';
import WPHash from 'wordpress-hash-node';


export const QueryResolvers = {
  Query: {
    token: async () => {
      const token = WPHash.HashPassword('bahman+world+6982');
      return token;
    },
    direction: (parent, args, context) => {
      return t('direction', { lng: context.language });
    },
  },
};
