import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidationSchemas } from '../Book/book.validation';
import { cartController } from './cart.controllers';
import { cartValidationSchemas } from './cart.validation';

const router = express.Router();

//create Book
router.post(
  '/create-cart',

  validateRequest(cartValidationSchemas.CartValidationSchema),
  cartController.createCart,
);
//get cart
router.get('/get-cart', cartController.getAllCart);
router.get('/get-cart/:id', cartController.getSingleCart);

//update cart
//create Book
router.put(
  '/update-cart/:id',

  validateRequest(cartValidationSchemas.updateCartValidationShema),
  cartController.updateCart,
);
// router.put(
//   '/book/:id',
//   auth(USER_ROLE.admin),
//   validateRequest(BookValidationSchemas.updateValidationShema),
//   bookController.updateBook,
// );
// //delete Bocart
// router.delete(
//   '/delete-book/:id',
//   auth(USER_ROLE.admin),
//   bookController.deleteBook,
// );
export const cartRoutes = router;
