import * as mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String },
  imageURL: { type: String },
  dateAdded: { type: Date, required: true, default: new Date() },
});

export const Product = mongoose.model('Product', productSchema);
