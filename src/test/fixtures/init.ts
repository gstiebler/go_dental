import * as mongoose from 'mongoose';
import { User } from '../../server/db/schemas/User';
import { Product } from '../../server/db/schemas/Product';
import { Dental } from '../../server/db/schemas/Dental';
import { Stock } from '../../server/db/schemas/Stock';
import UserFixtures from './Users';
import DentalFixtures from './DentalFixtures';
import ProductFixtures from './ProductFixtures';
import StockFixtures from './StockFixtures';

export async function idByValue(model: mongoose.Model<mongoose.Document>,
    fieldName: string,
    value: any): Promise<string> {
  const record = await model.findOne({ [fieldName]: value });
  return record._id;
}

export async function initFixtures() {
  await User.remove({});
  await Dental.remove({});
  await Product.remove({});
  await Stock.remove({});

  await User.insertMany(UserFixtures);
  await Dental.insertMany(await DentalFixtures());
  await Product.insertMany(await ProductFixtures());
  await Stock.insertMany(await StockFixtures());
}
