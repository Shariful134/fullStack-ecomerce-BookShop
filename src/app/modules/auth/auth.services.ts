import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TUserLogin } from './auth.interface';
import jwt from 'jsonwebtoken';

import config from '../../config';
import { createToken, verifyToken } from './auth.utils';

//login User
const loginUserIntoDB = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!');
  }

  //checking user is blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is Allready Blocked!');
  }

  //checking if the password is correct or uncorrect
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password does not match!');
  }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string,
  );

  return { accessToken, refreshToken };
};

//login User
const refreshTokenIntoDB = async (token: string) => {
  let decoded;
  try {
    decoded = verifyToken(token, config.jwt_refresh_secret as string);
  } catch {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized');
  }
  const { userEmail, iat } = decoded;
  const user = await User.isUserExistsByEmail(userEmail);

  //checking user is exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!');
  }

  //checking user is blocked
  const isBlocked = user?.isBlocked;
  if (isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is Allready Blocked!');
  }

  // creating a token and sent to the client side
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  //accessToken
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );

  return { accessToken };
};

export const authServices = {
  loginUserIntoDB,
  refreshTokenIntoDB,
};
