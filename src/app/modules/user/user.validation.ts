import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: 'name is required' }).trim(),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    role: z.enum(['admin', 'user']).default('user'),
    isBlocked: z.boolean().default(false),
  }),
});

export const userValidation = {
  userValidationSchema,
};
