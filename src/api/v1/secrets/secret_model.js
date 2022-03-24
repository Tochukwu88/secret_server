import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const secretSchema = new Schema(
  {
    secretText: {
      type: String,
      required: true,
    },
    iv: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
   
  },
  {
    timestamps: true,
  },
);

export default model('secrets', secretSchema);
