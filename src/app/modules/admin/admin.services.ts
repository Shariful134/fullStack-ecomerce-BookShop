import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TBook } from '../Book/book.interface';
import { Book } from '../Book/book.model';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import {
  bookSearchAbleFields,
  userSearchAbleFields,
} from '../Book/book.constant';

///blocked user
const blockedUserByAdminIntoDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not Found!');
  }

  // if (isBlocked) {
  //   throw new AppError(StatusCodes.FORBIDDEN, 'User is Allready Blocked!');
  // }

  if (user?.role === 'admin') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid Credentials');
  }
  const isBlocked = user?.isBlocked;
  let result;
  if (isBlocked) {
    result = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true },
    );
  } else {
    result = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true },
    );
  }

  return result;
};

//Get All Users
const getAllUsersIntoDB = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(User.find({ role: 'user' }), query)
    .search(userSearchAbleFields)
    .filter()
    .sort()
    .exec();

  return result;
};

const getSingleUserIntoDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not Found!');
  }
  return user;
};
const deleteUserIntoDB = async (id: string) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not Found!');
  }
  return user;
};

//create Book
const createBookIntoDB = async (payload: TBook) => {
  const result = await Book.create(payload);
  return result;
};

//Get All Books
const getAllBooksIntoDB = async (query: Record<string, any>) => {
  const blogQuery = new QueryBuilder(Book.find(), query)
    .search(bookSearchAbleFields)
    .filter()
    .sort();
  const result = await blogQuery.modelQuery;
  if (!result.length) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Book is not Found!');
  }
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
  getAllUsersIntoDB,
  getSingleUserIntoDB,
  deleteUserIntoDB,
  createBookIntoDB,
  getAllBooksIntoDB,
  getSingleBookIntoDB,
  updateBookIntoDB,
  deleteBookIntoDB,
};
