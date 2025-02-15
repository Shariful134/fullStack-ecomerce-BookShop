import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidationSchemas } from '../Book/book.validation';
import { bookController } from './admin.controllers';

const router = express.Router();

//blocked user
router.patch(
  '/user/:userId/block',
  auth(USER_ROLE.admin),
  bookController.blockedUserController,
);

//get all users
router.get(
  '/get-users',
  auth(USER_ROLE.admin),

  bookController.getAllUsers,
);

router.get(
  '/single-user/:userId',
  auth(USER_ROLE.admin),
  bookController.getSingleUser,
);
router.delete(
  '/delete-user/:userId',
  auth(USER_ROLE.admin),
  bookController.deleteUser,
);

//create Book
router.post(
  '/create-book',
  auth(USER_ROLE.admin),
  validateRequest(BookValidationSchemas.BookValidationSchema),
  bookController.createBook,
);

//get Book
router.get('/allbooks', bookController.getAllBooks);
router.get('/book/:id', bookController.getSingleBook);

//update Book
router.put(
  '/book/:id',
  auth(USER_ROLE.admin),
  validateRequest(BookValidationSchemas.updateValidationShema),
  bookController.updateBook,
);
//delete Book
router.delete(
  '/delete-book/:id',
  auth(USER_ROLE.admin),
  bookController.deleteBook,
);
export const adminRoutes = router;
