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

//get orders
const getOrdersOrderIntoDB = async () => {
  const order = await Order.find();

  //checking Product is exists
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order is not Found!');
  }

  return order;
};

const getSingleOrderIntoDB = async (id: string) => {
  const order = await Order.findById(id);

  //checking Product is exists
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order is not Found!');
  }

  return order;
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

//delete order
const deleteOrderIntoDB = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);

  //checking Product is exists
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order is not Found!');
  }

  return result;
};

export const orderServices = {
  createOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderIntoDB,
  getOrdersOrderIntoDB,
  getSingleOrderIntoDB,
};
