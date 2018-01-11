import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLFloat,
} from 'graphql';
import { Product } from '../db/schemas/Product';

export function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

function bunnies(root, {}, source, fieldASTs) {
  const projection = getProjection(fieldASTs);
  return Product.find({}, projection);
}

function getOneBunny(root, { id }, source, fieldASTs) {
  const projection = getProjection(fieldASTs);
  return Product.findOne({ _id: id }, projection);
}

const bunnyType = new GraphQLObjectType({
  name: 'bunnyType',
  fields: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    count: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export const bunnyQuery = {
  bunnies: {
    type: new GraphQLList(bunnyType),
    resolve: bunnies,
  },
  bunny: {
    type: bunnyType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: getOneBunny,
  },
};
