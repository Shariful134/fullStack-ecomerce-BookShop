import { ObjectId } from 'mongoose';

export type TOrder = {
  email: string;
  product: ObjectId;
  quantity: number;
  address: string;
  phone: string;
  transaction: {
    id: string;
    transactionStatus: string;
    date_time: string;
    method: string;
    sp_message: string;
    sp_code: string;
    bank_status: string;
  };
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  totalPrice: number;
};
