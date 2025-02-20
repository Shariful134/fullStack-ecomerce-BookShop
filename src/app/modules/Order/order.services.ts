import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { Book } from '../Book/book.model';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import QueryBuilder from '../../builder/QueryBuilder';
import {
  bookSearchAbleFields,
  orderSearchAbleFields,
} from '../Book/book.constant';
import { JwtPayload } from 'jsonwebtoken';
import { CustomJwtPayload } from '../../interface';
import { User } from '../user/user.model';

//creating order
const createOrderIntoDB = async (userEmail: string, payload: TOrder) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not Found!');
  }
  const product = await Book.findById(payload.product);
  let totalPrice = 0;
  if (product) {
    totalPrice = product.price * payload.quantity;
  }

  //Inventory management logic
  if (!product) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product is not Found!');
  }

  const inStock = product?.inStock;
  if (!inStock) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Insufficient stock!');
  }

  if (product.quantity < payload.quantity) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      `Only ${product.quantity} Products available!`,
    );
  }

  product.quantity -= payload.quantity;
  if (product.quantity === 0) {
    product.inStock = false;
  }

  await product.save();

  const order = await Order.create(payload);
  return { order, product, totalPrice, user };
};

//get orders
const getOrdersIntoDB = async (query: Record<string, any>) => {
  const blogQuery = new QueryBuilder(Order.find().populate('product'), query)
    .search(orderSearchAbleFields)
    .filter()
    .sort();
  const order = await blogQuery.modelQuery;

  //checking Product is exists
  if (order.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order is not Found!');
  }

  return order;
};

const getSingleOrderIntoDB = async (id: string) => {
  const order = await Order.findById(id).populate('product');

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

// calculate the all order price in database
const calculateAllPrice = async () => {
  const findRevenue = await Order.aggregate([
    {
      $lookup: {
        from: 'books',
        localField: 'product',
        foreignField: '_id',
        as: 'AllbookInfo',
      },
    },
    { $unwind: '$AllbookInfo' },
    {
      $project: {
        price: '$AllbookInfo.price',
        quantity: 1,
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: {
            $multiply: ['$price', '$quantity'],
          },
        },
      },
    },
  ]);

  const totalRevenue = findRevenue.length > 0 ? findRevenue[0].totalRevenue : 0;

  return { totalRevenue };
};

export const orderServices = {
  createOrderIntoDB,
  updateOrderIntoDB,
  deleteOrderIntoDB,
  getOrdersIntoDB,
  getSingleOrderIntoDB,
  calculateAllPrice,
};
