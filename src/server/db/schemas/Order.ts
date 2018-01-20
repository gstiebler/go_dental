import * as mongoose from 'mongoose';
import { DentalPayment } from './DentalPayment';
import { UserPayment } from './UserPayment';
import { Stock } from './Stock';
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
      await validate(this.products);
      await createDentalPayments(this);
      await createUserPayment(this);
    } else {
      throw new Error('Pedido não pode ser alterado');
    }
    next();
  } catch(err) {
    next(err);
  }
});

async function validate(products: any[]) {
  for (const product of products) {
    const stock: any = await Stock.find({
      product: product.product,
      dental: product.dental,
    });
    if (stock.qty < product.qty) {
      throw new Error('quantidade inválida');
    }
    if (stock.price !== product.price) {
      throw new Error('preço inválido');
    }
  }
}

async function createDentalPayments(order) {
  const perDental = amountPerDental(order.products);
  perDental.forEach(async (dentalSum, dentalId) => {
    const dentalPayment = new DentalPayment({
      order: order._id,
      amount: dentalSum,
      status: 'PENDING',
    });
    await dentalPayment.save();
  });
}

async function createUserPayment(order) {
  const totalsPerProduct: number[] = order.products.map(p => p.price * p.qty);
  const totalSum = totalsPerProduct.reduce((p1, p2) => p1 + p2, 0);
  const userPayment = new UserPayment({
    order: order._id,
    amount: totalSum,
    status: 'PENDING',
  });
  await userPayment.save();
}

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
