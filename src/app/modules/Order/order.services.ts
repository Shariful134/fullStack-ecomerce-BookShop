import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { Book } from '../Book/book.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';

//creating order
const createOrderIntoDB = async (payload: TOrder) => {
  const product = await Book.findById(payload.product);

  //checking Product is exists
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product is not Found!');
  }

  const result = await Order.create(payload);
  return result;
};

//update order
const updateOrderIntoDB = async (id: string, payload: TOrder) => {
  const result = await Order.findByIdAndUpdate(id, payload, { new: true });

  //checking Product is exists
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order is not Found!');
  }

  return result;
};

export const orderServices = {
  createOrderIntoDB,
  updateOrderIntoDB,
};
