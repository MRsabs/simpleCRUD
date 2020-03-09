import { Schema } from 'mongoose';

const product: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: "unknown"
  },
  barcode: {
    type: Number,
    default: 0
  }
});
export default product;
