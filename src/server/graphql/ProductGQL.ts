import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} from 'graphql';
import * as ProductService from '../services/ProductService';

const productType = new GraphQLObjectType({
  name: 'productType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    imageURL: { type: GraphQLString },
  },
});

const dentalType = new GraphQLObjectType({
  name: 'dentalType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: GraphQLString },
  },
});

const stockItemType = new GraphQLObjectType({
  name: 'stockItemType',
  fields: {
    product: { type: new GraphQLNonNull(GraphQLID) },
    dental: { type: new GraphQLNonNull(GraphQLID) },
    price: { type: GraphQLFloat },
  },
});

const stockMatrixType = new GraphQLObjectType({
  name: 'stockMatrixType',
  fields: {
    stockItems: { type: new GraphQLList(stockItemType) },
    products: { type: new GraphQLList(productType) },
    dentals: { type: new GraphQLList(dentalType) },
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
  stockMatrix: {
    type: stockMatrixType,
    args: {
      productIds: { type: new GraphQLList(GraphQLID) },
    },
    resolve: ProductService.getStockMatrix,
  },
};
