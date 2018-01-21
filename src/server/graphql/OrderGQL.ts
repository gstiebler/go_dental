import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLInputObjectType,
} from 'graphql';
import * as OrderService from '../services/OrderService';

const newOrderInputType = new GraphQLInputObjectType({
  name: 'newOrderInputType',
  fields: {
    productId: { type: GraphQLID },
    dentalId: { type: GraphQLID },
    qty: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
  },
});

export const query = {
};

export const mutations = {
  newOrder: {
    type: GraphQLString,
    args: {
      userId: { type: GraphQLID },
      orderDetails: { type: new GraphQLList(newOrderInputType) },
    },
    resolve: OrderService.newOrder,
  },
};
