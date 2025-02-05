import { Schema, model, Types } from 'mongoose';

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    product: {
      type: Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, 'Total price cannot be negative or 0'],
    },
  },
  { timestamps: true },
);

// Exporting the Order model
const Order = model('Order', OrderSchema);

// Exporting the type
export type OrderType = {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
};

export default Order;
