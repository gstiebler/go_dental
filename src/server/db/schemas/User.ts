import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String },
  dateAdded: { type: Date, required: true, default: new Date() }
});

export const User = mongoose.model('User', userSchema);
