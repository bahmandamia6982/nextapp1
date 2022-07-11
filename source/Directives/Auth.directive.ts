import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server-core';
import { defaultFieldResolver } from 'graphql';
import { NotAdminError } from '../Errors/NotAdminError.error';

export const authDirective = (schema, directive) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (config) => {
      const auth = getDirective(schema, config, directive)?.[0];
      if (auth) {
        const { resolve = defaultFieldResolver } = config;
        config.resolve = async (source, args, context, info) => {
          const result = await resolve(source, args, context, info);
          const token = context.token;
          if (token != 'bahman') {
            throw new AuthenticationError('Login first baby');
          } else if (auth.role != 'admin') {
            throw new NotAdminError('Your are not admin');
          } else {
            return result;
          }
        };
        return config;
      }
    },
  });
};
