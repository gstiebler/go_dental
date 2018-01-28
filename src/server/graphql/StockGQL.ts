import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
} from 'graphql';
import * as StockService from '../services/StockService';
import { productType, dentalType } from './ProductGQL';

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

const productQtyType = new GraphQLInputObjectType({
  name: 'productQtyType',
  fields: {
    qty: { type: GraphQLFloat },
    productId: { type: GraphQLID },
  },
});

export const query = {
  stockMatrix: {
    type: stockMatrixType,
    args: {
      products: { type: new GraphQLList(productQtyType) },
    },
    resolve: StockService.getStockMatrix,
  },
};
