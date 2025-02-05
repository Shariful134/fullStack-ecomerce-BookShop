/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, UserModel } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// hashing password and save into DB
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// check user
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

// check password
userSchema.statics.isPasswordMatched = async function (
  planTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(planTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
