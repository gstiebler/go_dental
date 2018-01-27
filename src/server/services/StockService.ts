import { Product } from '../db/schemas/Product';
import { Dental } from '../db/schemas/Dental';
import { Stock } from '../db/schemas/Stock';

export async function getStockMatrix(root, { productIds }) {
  const products = await Product.find({ _id: { $in: productIds } }).sort({ name: 1 });
  const dentals = await Dental.find().sort({ name: 1 });
  const stockItems = await Stock.find({
    product: { $in: productIds },
    dental: { $in: dentals.map(d => d._id) },
  });
  return {
    products,
    dentals,
    stockItems,
  };
}
