import express from 'express';

import { authValidations } from './auth.validation';
import validateRequest from '../../middlewares/validateRequest';
import { authContarollers } from './auth.contarollers';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidations.loginValidationschema),
  authContarollers.loginUser,
);

export const authRoutes = router;
