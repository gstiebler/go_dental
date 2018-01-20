import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const userPaymentSchema = new mongoose.Schema({
  order: { type: ObjectId, ref: 'Order', index: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'PAID', 'CANCELED'], required: true, index: true },
  extPaymentId: { type: String, index: true },
  dateAdded: { type: Date, required: true, default: new Date() },
});

export const UserPayment = mongoose.model('UserPayment', userPaymentSchema);
