import { Order, preSave } from '../db/schemas/Order';
import { User } from '../db/schemas/User';
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export async function newOrder(root, { userId, orderDetails }) {
  console.log(orderDetails);
  orderDetails = orderDetails.map((p) => {
    return {
      product: ObjectId(p.productId),
      dental: ObjectId(p.dentalId),
      ...p,
    };
  });
  const user: any = User.findOne();
  const order = new Order({
    user: user._id, // TODO userId
    products: orderDetails,
  });
  await preSave(order);
  await order.save();
  console.log('order saved');
  return 'OK';
}
