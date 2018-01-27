import * as mongoose from 'mongoose';
import { DentalPayment } from './DentalPayment';
import { UserPayment } from './UserPayment';
import { Stock } from './Stock';
import * as Promise from 'bluebird';
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

orderSchema.pre('save', function() {
  console.log('save');
  /*try {
    if(this.isNew) {
      preSave(this)
    } else {
      throw new Error('Pedido não pode ser alterado');
    }
    next();
  } catch(err) {
    next(err);
  }*/
});

export async function preSave(order) {
  await validate(order.products);
  await updateStock(order.products);
  await createDentalPayments(order);
  await createUserPayment(order);
}

async function validate(products: any[]) {
  for (const product of products) {
    const stock: any = await Stock.findOne({
      product: product.product,
      dental: product.dental,
    });
    if (stock.qty < product.qty) {
      throw new Error(`quantidade inválida: ${stock.qty} < ${product.qty}`);
    }
    if (stock.price !== product.price) {
      console.log('stock: ' + stock);
      throw new Error(`preço inválido: ${stock.price} e ${product.price}`);
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

function amountPerDental(products: any[]): Map<string, number> {
  const perDental = new Map<string, number>();
  for (const product of products) {
    const dentalStr = product.dental.toString();
    const dentalSum = perDental.get(dentalStr) || 0.0;
    const totalPriceProduct = product.price * product.qty;
    perDental.set(dentalStr, dentalSum + totalPriceProduct);
  }
  return perDental;
}

function updateStock(products: any[]) {
  return Promise.map(products, async (product) => {
    const stock: any = await Stock.findOne({
      product: product.product,
      dental: product.dental,
    });
    stock.qty -= product.qty;
    await stock.save();
  });
}
