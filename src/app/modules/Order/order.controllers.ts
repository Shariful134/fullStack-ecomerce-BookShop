import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { orderServices } from './order.services';

//create ordaer
const createOrder: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await orderServices.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order Successful',
    data: result,
  });
});

//get orders
const getOrders: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await orderServices.getOrdersIntoDB();
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order Retrieved Successful',
    data: result,
  });
});

const getSingleOrder: RequestHandler = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const result = await orderServices.getSingleOrderIntoDB(orderId);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order Retrieved Successful',
    data: result,
  });
});

//update order
const updateOrder: RequestHandler = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const result = await orderServices.updateOrderIntoDB(orderId, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order updated Successfully',
    data: result,
  });
});

//delete order
const deleteOrder: RequestHandler = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;
  const result = await orderServices.deleteOrderIntoDB(orderId);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order Deleted Successfully',
    data: result,
  });
});

// calculatePrice from the order

const calculatePrice: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await orderServices.calculateAllPrice();
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order Reveneu Successfully',
    data: result,
  });
});

export const orderControllers = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getSingleOrder,
  calculatePrice,
};
