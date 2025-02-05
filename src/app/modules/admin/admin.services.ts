import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TBook } from '../Book/book.interface';
import { Book } from '../Book/book.model';
import { User } from '../user/user.model';

///blocked user
const blockedUserByAdminIntoDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not Found!');
  }

  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is Allready Blocked!');
  }

  if (user?.role === 'admin') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid Credentials');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

//create Book
const createBookIntoDB = async (payload: TBook) => {
  const result = await Book.create(payload);
  return result;
};

//Get All Books
const getAllBooksIntoDB = async () => {
  const result = await Book.find();
  return result;
};

//Get Single Book
const getSingleBookIntoDB = async (id: string) => {
  const result = await Book.findById(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Book is not Found!');
  }

  return result;
};

//Get Single Book
const updateBookIntoDB = async (id: string, payload: Record<string, any>) => {
  const result = await Book.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Book is not Found!');
  }

  return result;
};

//delete Book
const deleteBookIntoDB = async (id: string) => {
  const result = await Book.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Book is not found!');
  }
  return result;
};

export const bookServices = {
  blockedUserByAdminIntoDB,
  createBookIntoDB,
  getAllBooksIntoDB,
  getSingleBookIntoDB,
  updateBookIntoDB,
  deleteBookIntoDB,
};
