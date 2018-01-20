import * as mongoose from 'mongoose';
import { DentalPayment } from './DentalPayment';
import { UserPayment } from './UserPayment';
const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User', index: true },
  status: { type: String, enum: ['PENDING', 'DELIVED', 'CANCELED'], default: 'PENDING', index: true },
  products: [{
    product: { type: ObjectId, ref: 'Product', index: true },
    dental: { type: ObjectId, ref: 'Dental', index: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
  }],
  dateAdded: { type: Date, required: true, default: new Date() },
});

export const Order = mongoose.model('Order', orderSchema);

orderSchema.pre('save', async function(next){
  try {
    if(this.isNew) {
      const perDental = amountPerDental(this.products);
      let totalSum = 0.0;
      perDental.forEach(async (dentalSum, dentalId) => {
        const dentalPayment = new DentalPayment({
          order: this,
          amount: dentalSum,
          status: 'PENDING',
        });
        await dentalPayment.save();
        totalSum += dentalSum;
      });
      const userPayment = new UserPayment({
        order: this,
        amount: totalSum,
        status: 'PENDING',
      });
      await userPayment.save();
    } else {
      throw new Error('Pedido não pode ser alterado');
    }
    next();
  } catch(err) {
    next(err);
  }
});

function amountPerDental(products): Map<string, number> {
  const perDental = new Map<string, number>();
  for (const product of products) {
    const dentalStr = product.dental.toString();
    const dentalSum = perDental.get(dentalStr) || 0.0;
    const totalPriceProduct = product.price * product.qty;
    perDental.set(dentalStr, dentalSum + totalPriceProduct);
  }
  return perDental;
}
