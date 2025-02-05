import { ObjectId } from 'mongoose';

export type Order = {
  email: string;
  product: ObjectId;
  quantity: number;
  totalPrice: number;
};
