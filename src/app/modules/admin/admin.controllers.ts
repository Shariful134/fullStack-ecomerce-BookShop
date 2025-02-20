import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { RequestHandler } from 'express';
import { bookServices } from './admin.services';

//blocked user
const blockedUserController: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { userId } = req.params;
    const result = await bookServices.blockedUserByAdminIntoDB(userId);
    console.log(result?.isBlocked);
    const isBlocked = result?.isBlocked;
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: isBlocked ? 'Blocked successfully!' : ' Unblocked successfully!',
      data: result,
    });
  },
);

//create Book
const createBook: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await bookServices.createBookIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Book Created successfully!',
    data: result,
  });
});

//get All Users
const getAllUsers: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await bookServices.getAllUsersIntoDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Users Retrived Successfully!',
    data: result,
  });
});

const getSingleUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const result = await bookServices.getSingleUserIntoDB(userId);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Users Retrived Successfully!',
    data: result,
  });
});
const deleteUser: RequestHandler = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const result = await bookServices.deleteUserIntoDB(userId);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User Deleted Successfully!',
    data: result,
  });
});

//get All Books
const getAllBooks: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await bookServices.getAllBooksIntoDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Book Retrived Successfully!',
    data: result,
  });
});

//get Single Book
const getSingleBook: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await bookServices.getSingleBookIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Book Retrived Successfully!',
    data: result,
  });
});

//update Book
const updateBook: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await bookServices.updateBookIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Book updated successfully!',
    data: result,
  });
});

//delete Book
const deleteBook: RequestHandler = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await bookServices.deleteBookIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Book Deleted successfully!',
    data: result,
  });
});

export const bookController = {
  blockedUserController,
  getAllUsers,
  getSingleUser,
  deleteUser,
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
};
