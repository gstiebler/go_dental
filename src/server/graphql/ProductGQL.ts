import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
} from 'graphql';
import * as ProductService from '../services/ProductService';

export const productType = new GraphQLObjectType({
  name: 'productType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    imageURL: { type: GraphQLString },
  },
});

export const dentalType = new GraphQLObjectType({
  name: 'dentalType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: GraphQLString },
  },
});

const newOrderInputType = new GraphQLInputObjectType({
  name: 'newOrderInputType',
  fields: {
    productId: { type: GraphQLID },
    dentalId: { type: GraphQLID },
    qty: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
  },
});

export const query = {
  productsTypeahead: {
    type: new GraphQLList(productType),
    args: {
      partialName: { type: GraphQLString },
    },
    resolve: ProductService.productsTypeahead,
  },
};

export const mutations = {
};
