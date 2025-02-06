import { Schema, model, Types } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    product: {
      type: Types.ObjectId,
      ref: 'Book',
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
export const Order = model<TOrder>('Order', orderSchema);
