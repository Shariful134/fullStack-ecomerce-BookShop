import { z } from 'zod';

const loginValidationschema = z.object({
  body: z.object({
    password: z.string({ required_error: 'Password is required' }),
    email: z.string({ required_error: 'Password is required' }),
  }),
});

export const authValidations = {
  loginValidationschema,
};
