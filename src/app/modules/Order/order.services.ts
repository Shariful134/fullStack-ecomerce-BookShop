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
import { orderUtils } from './order.utils';

//creating order
const createOrderIntoDB = async (
  userEmail: string,
  payload: TOrder,
  client_ip: string,
) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not Found!');
  }
  const product = await Book.findById(payload.product);

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

  let totalPrice = 0;
  if (product) {
    totalPrice = product.price * payload.quantity;
  }
  await product.save();
  const payloads = { userEmail, ...payload, totalPrice };

  let order = await Order.create(payloads);

  // Payment integretation
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: payloads.address,
    customer_email: user.email,
    customer_phone: payloads.phone,
    customer_city: 'N/a',
    client_ip,
    customer_state: order._id,
    shipping_address: product.title,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }
  return payment.checkout_url;
};

//verify order
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      { 'transaction.id': order_id },
      {
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.date_time': verifiedPayment[0].date_time,
        'transaction.method': verifiedPayment[0].method,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.bank_status': verifiedPayment[0].bank_status,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
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

const getSingleOrderForEmailIntoDB = async (email: string) => {
  const order = await Order.find({ email: email }).populate('product');

  //checking Product is exists
  if (!order.length) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order is not Found!');
  }

  return order;
};

const getSingleOrderIntoDB = async (orderId: string) => {
  const order = await Order.findOne({ 'transaction.id': orderId }).populate(
    'product',
  );

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
  getSingleOrderForEmailIntoDB,
  createOrderIntoDB,
  verifyPayment,
  updateOrderIntoDB,
  deleteOrderIntoDB,
  getOrdersIntoDB,
  getSingleOrderIntoDB,
  calculateAllPrice,
};
