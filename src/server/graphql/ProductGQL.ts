import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLFloat,
} from 'graphql';
import * as ProductService from '../services/ProductService';

const productTypeaheadType = new GraphQLObjectType({
  name: 'productType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const query = {
  productsTypeahead: {
    type: new GraphQLList(productTypeaheadType),
    args: {
      partialName: { type: GraphQLString },
    },
    resolve: ProductService.productsTypeahead,
  },
};
