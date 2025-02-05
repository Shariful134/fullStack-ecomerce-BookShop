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
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'User Blocked successfully!',
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

//get All Books
const getAllBooks: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await bookServices.getAllBooksIntoDB();
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
  const result = await bookServices.updateBookIntoDB(id);
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
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
};
