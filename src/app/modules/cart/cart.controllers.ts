import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { cartServices } from './cart.services';

//create cart
const createCart = catchAsync(async (req, res, next) => {
  const result = await cartServices.createCartIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Cart Created successfully!',
    data: result,
  });
});

//get cart
const getAllCart = catchAsync(async (req, res, next) => {
  const result = await cartServices.getCartIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Cart Retrived successfully!',
    data: result,
  });
});

const getSingleCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await cartServices.getSingleCartIntoDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Cart Retrived successfully!',
    data: result,
  });
});

//updated Cart
const updateCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await cartServices.updateCartIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Cart Updated successfully!',
    data: result,
  });
});

//delte Cart
const deleteCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await cartServices.deleteCartIntoBD(id);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Cart Delted  successfully!',
    data: result,
  });
});

export const cartController = {
  createCart,
  getAllCart,
  getSingleCart,
  updateCart,
  deleteCart,
};
