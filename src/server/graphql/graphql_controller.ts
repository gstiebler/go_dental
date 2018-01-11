import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { bunnyQuery } from './ProductGQL';

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
      ...bunnyQuery,
    },
  }),
});

export async function execGQLQuery(query: string) {
  return await graphql(schema, query);
}
