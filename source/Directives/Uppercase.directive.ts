import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';

export const uppercaseDirective = (schema, directive) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (config) => {
      const uppercase = getDirective(schema, config, directive)?.[0];
      if (uppercase) {
        const { resolve = defaultFieldResolver } = config;
        config.resolve = async (source, args, context, info) => {
          const result = await resolve(source, args, context, info);
          if (typeof result == 'string') {
            return result.toUpperCase();
          }
          return result;
        };
        return config;
      }
    },
  });
};
