import * as mongoose from 'mongoose';

const bunnySchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true },
  dateAdded: { type: Date, required: true, default: new Date() },
});

export const Bunny = mongoose.model('Bunny', bunnySchema);
