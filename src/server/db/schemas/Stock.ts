import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const stockSchema = new mongoose.Schema({
  product: { type: ObjectId, ref: 'Product', index: true },
  dental: { type: ObjectId, ref: 'Dental', index: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const Stock = mongoose.model('Stock', stockSchema);
