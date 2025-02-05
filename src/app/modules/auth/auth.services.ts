import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TUserLogin } from './auth.interface';

//login User
const loginUserIntoDB = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByEmail(payload.email);

  //checking user is exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!');
  }
};

export const authServices = {
  loginUserIntoDB,
};
