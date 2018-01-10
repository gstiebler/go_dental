import * as mongoose from 'mongoose';

const dentalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  dateAdded: { type: Date, required: true, default: new Date() },
});

export const Dental = mongoose.model('Dental', dentalSchema);
