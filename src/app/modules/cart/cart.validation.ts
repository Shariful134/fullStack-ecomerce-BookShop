import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

const CartValidationSchema = z.object({
  body: z.object({
    bookId: z.string().refine(isValidObjectId, { message: 'Invalid bookId' }),
    userId: z.string().refine(isValidObjectId, { message: 'Invalid userId' }),
    title: z.string().nonempty('Title is required'),
    author: z.string().nonempty('Author is required'),
    price: z
      .number()
      .min(0, { message: 'Price must be a positive number' })
      .nonnegative()
      .refine((value) => value !== null, { message: 'Price is required' }),
    category: z.enum(
      ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
      {
        required_error: 'Category is required',
      },
    ),

    quantity: z
      .number()
      .int('Quantity must be an integer')
      .min(0, { message: 'Quantity must be a positive number' })
      .refine((value) => value !== null, { message: 'Quantity is required' }),
    imageURL: z.string().nonempty('Image is required'),
  }),
});

//updated shcema
const updateCartValidationShema = z.object({
  body: z.object({
    bookId: z
      .string()
      .refine(isValidObjectId, { message: 'Invalid bookId' })
      .optional(),
    userId: z
      .string()
      .refine(isValidObjectId, { message: 'Invalid userId' })
      .optional(),
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    category: z
      .enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'])
      .optional(),

    quantity: z
      .number()

      .optional(),
    imageURL: z.string().optional(),
  }),
});

export const cartValidationSchemas = {
  CartValidationSchema,
  updateCartValidationShema,
};
