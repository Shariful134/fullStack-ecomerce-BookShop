import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    //if the token is sent to the client side
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Your are not Authorized!');
    }

    //new add token verify
    const decoded = jwt.verify(token, config.jwt_access_secret as string);

    const role = (decoded as JwtPayload)?.data?.role;
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Your are not Authorized!');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
