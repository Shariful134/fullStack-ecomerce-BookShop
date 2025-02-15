import { ObjectId } from 'mongoose';

export type TCart = {
  userId: ObjectId;
  bookId: ObjectId;
  title: string;
  author: string;
  price: number;
  category: string;
  quantity: number;
  imageURL: string;
};
