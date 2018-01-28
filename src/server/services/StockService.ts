import { Product } from '../db/schemas/Product';
import { Dental } from '../db/schemas/Dental';
import { Stock } from '../db/schemas/Stock';

export async function getStockMatrix(root, { products }) {
  const productIds = products.map(p => p.productId);
  const productsInDB = await Product.find({ _id: { $in: productIds } }).sort({ name: 1 });
  const dentals = await Dental.find().sort({ name: 1 });
  const productOrQueries = products.map(p => ({
    $and: [
      { product: p.productId },
      { qty: { $gte: p.qty } },
    ],
  }));
  const stockItems = await Stock.find({
    $or: productOrQueries,
    dental: { $in: dentals.map(d => d._id) },
  });
  return {
    products: productsInDB,
    dentals,
    stockItems,
  };
}
