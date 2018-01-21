import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import * as ProductGQL from './ProductGQL';
import * as OrderGQL from './OrderGQL';

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
      ...ProductGQL.query,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'mutation',
    fields: {
      ...ProductGQL.mutations,
      ...OrderGQL.mutations,
    },
  }),
});

export async function execGQLQuery(query: string) {
  return await graphql(schema, query);
}
