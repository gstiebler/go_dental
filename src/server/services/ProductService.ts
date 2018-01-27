import { Product } from '../db/schemas/Product';
import { Dental } from '../db/schemas/Dental';
import * as Interfaces from '../../common/Interfaces';

export function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

export function productsTypeahead(root, { partialName }, source, fieldASTs) {
  const projection = getProjection(fieldASTs);
  const NUM_MAX_PRODS = 5;
  const query = {
    name: {
      $regex: partialName,
      $options: 'i',
    },
  };
  return Product.find(query, projection)
    .sort({ name: 1 })
    .limit(NUM_MAX_PRODS);
}
