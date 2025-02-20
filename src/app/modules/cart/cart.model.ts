import { model, Schema, Types } from 'mongoose';

import { ObjectId } from 'mongodb';
import { TCart } from './cart.interface';

const cartSchema = new Schema<TCart>(
  {
    bookId: { type: Types.ObjectId, ref: 'Book', required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: {
      type: Number,
      min: [0, 'Price must be a positive number'],
      required: true,
    },
    category: {
      type: String,
      enum: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
      required: true,
    },
    quantity: { type: Number, required: true },
    imageURL: { type: String, required: true },
  },
  { timestamps: true },
);

export const Cart = model<TCart>('Cart', cartSchema);
