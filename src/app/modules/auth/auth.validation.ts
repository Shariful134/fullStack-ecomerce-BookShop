import { z } from 'zod';

const loginValidationschema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Password is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const authValidations = {
  loginValidationschema,
  refreshTokenValidationSchema,
};
