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

//get Orders
router.get(
  '/getOrders',
  auth(USER_ROLE.user, USER_ROLE.admin),
  orderControllers.getOrders,
);

router.get(
  '/getOrder/:orderId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  orderControllers.getSingleOrder,
);

//update order
router.put(
  '/update-order/:orderId',
  auth(USER_ROLE.user),
  validateRequest(orderValidationSchemas.orderUpdateValidationSchema),
  orderControllers.updateOrder,
);

//delete order
router.delete(
  '/delete-order/:orderId',
  auth(USER_ROLE.user),
  orderControllers.deleteOrder,
);

router.get(
  '/revenue',
  auth(USER_ROLE.user, USER_ROLE.admin),
  orderControllers.calculatePrice,
);
export const OrderRoutes = router;
