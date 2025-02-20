import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TCart } from './cart.interface';
import { Cart } from './cart.model';

const createCartIntoDB = async (payload: TCart) => {
  const result = await Cart.create(payload);

  return result;
};
const getCartIntoDB = async () => {
  const result = await Cart.find().populate('bookId').populate('userId');
  if (result?.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cart is not found');
  }
  return result;
};

const getSingleCartIntoDB = async (id: string) => {
  const result = await Cart.findById(id).populate('bookId').populate('userId');
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cart is not found');
  }
  return result;
};

//updated cart
const updateCartIntoDB = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const result = await Cart.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cart is not found');
  }
  return result;
};

//delete cart
const deleteCartIntoBD = async (id: string) => {
  const result = await Cart.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Cart is not found');
  }
  return result;
};

export const cartServices = {
  createCartIntoDB,
  getCartIntoDB,
  getSingleCartIntoDB,
  updateCartIntoDB,
  deleteCartIntoBD,
};
