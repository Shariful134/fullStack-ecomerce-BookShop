import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidationSchemas } from './order.validation';
import { orderControllers } from './order.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post(
  '/create-order',
  auth(USER_ROLE.user),
  validateRequest(orderValidationSchemas.orderValidationSchema),
  orderControllers.createOrder,
);

//update order
router.put(
  '/product/:orderId',
  auth(USER_ROLE.user),
  validateRequest(orderValidationSchemas.orderUpdateValidationSchema),
  orderControllers.updateOrder,
);

export const OrderRoutes = router;
