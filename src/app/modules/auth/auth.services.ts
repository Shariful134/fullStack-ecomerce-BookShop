import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TUserLogin } from './auth.interface';
import jwt from 'jsonwebtoken';

import config from '../../config';

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

  // creating a token and sent to the client side
  const jwtUserData = {
    userEmail: user?.email,
    role: user?.role,
  };

  //accessToken
  const accessToken = jwt.sign(
    {
      data: jwtUserData,
    },
    config.jwt_access_secret as string,
    { expiresIn: '7d' },
  );

  const refreshToken = jwt.sign(
    {
      data: jwtUserData,
    },
    config.jwt_access_secret as string,
    { expiresIn: '10d' },
  );

  return { accessToken, refreshToken };
};

export const authServices = {
  loginUserIntoDB,
};
