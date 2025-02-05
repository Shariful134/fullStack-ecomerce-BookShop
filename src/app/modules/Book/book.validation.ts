import { z } from 'zod';

const BookValidationSchema = z.object({
  body: z.object({
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
    description: z.string().nonempty('Description is required'),
    quantity: z
      .number()
      .int('Quantity must be an integer')
      .min(0, { message: 'Quantity must be a positive number' })
      .refine((value) => value !== null, { message: 'Quantity is required' }),
    inStock: z
      .boolean()
      .refine((value) => value !== null, { message: 'InStock is required' }),
  }),
});

//updated shcema
const updateValidationShema = z.object({
  body: z.object({
    title: z.string().nonempty('Title is required').optional(),
    author: z.string().nonempty('Author is required').optional(),
    price: z
      .number()
      .min(0, { message: 'Price must be a positive number' })
      .nonnegative()
      .refine((value) => value !== null, { message: 'Price is required' })
      .optional(),
    category: z
      .enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'], {
        required_error: 'Category is required',
      })
      .optional(),
    description: z.string().nonempty('Description is required').optional(),
    quantity: z
      .number()
      .int('Quantity must be an integer')
      .min(0, { message: 'Quantity must be a positive number' })
      .refine((value) => value !== null, { message: 'Quantity is required' })
      .optional(),
    inStock: z
      .boolean()
      .refine((value) => value !== null, { message: 'InStock is required' })
      .optional(),
  }),
});

export const BookValidationSchemas = {
  BookValidationSchema,
  updateValidationShema,
};
