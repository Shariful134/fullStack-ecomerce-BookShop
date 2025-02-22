import express from 'express';
import { orderControllers } from './order.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post(
  '/create-order',
  auth(USER_ROLE.user),
  orderControllers.createOrder,
);

///paymentVerify
router.get('/', auth(USER_ROLE.user), orderControllers.verifyPament);

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
router.get(
  '/getOrder/:userEmail',
  auth(USER_ROLE.user, USER_ROLE.admin),
  orderControllers.getSingleOrderForEmail,
);

//update order
router.put(
  '/update-order/:orderId',
  auth(USER_ROLE.user),

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
