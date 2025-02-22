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
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      min: [11, 'Number must be at least 11'],
      requried: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      date_time: String,
      method: String,
      sp_message: String,
      sp_code: String,
      bank_status: String,
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
