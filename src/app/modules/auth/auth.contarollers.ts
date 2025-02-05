import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { authServices } from './auth.services';

//login User
const loginUser: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await authServices.loginUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login Successfully!',
    data: result,
  });
});

export const authContarollers = {
  loginUser,
};
