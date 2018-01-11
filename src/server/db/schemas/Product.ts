import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  code: { type: String, required: true, index: true },
  description: { type: String, index: true },
  imageURL: { type: String },
  dateAdded: { type: Date, required: true, default: new Date() },
});

export const Product = mongoose.model('Product', productSchema);
