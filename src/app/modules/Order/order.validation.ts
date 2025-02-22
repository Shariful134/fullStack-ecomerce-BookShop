// import { z } from 'zod';

// //updated validation schema
// const orderValidationSchema = z.object({
//   body: z.object({
//     email: z
//       .string()
//       .email({ message: 'Invalid email format' })
//       .nonempty({ message: 'Email is required' })
//       .trim(),
//     product: z.string().nonempty({ message: 'Please Select a Product' }),
//     quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
//     status: z.enum(['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled']),
//     totalPrice: z
//       .number()
//       .min(0.01, { message: 'Total price cannot be negative or 0' }),
//   }),
// });

// // const orderUpdateValidationSchema = z.object({
// //   body: z.object({
// //     email: z
// //       .string()
// //       .email({ message: 'Invalid email format' })
// //       .nonempty({ message: 'Email is required' })
// //       .trim()
// //       .optional(),
// //     product: z
// //       .string()
// //       .nonempty({ message: 'Please Select a Product' })
// //       .optional(),
// //     quantity: z
// //       .number()
// //       .min(1, { message: 'Quantity must be at least 1' })
// //       .optional(),
// //     status: z
// //       .enum(['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'])
// //       .optional(),
// //     totalPrice: z
// //       .number()
// //       .min(0.01, { message: 'Total price cannot be negative or 0' })
// //       .optional(),
// //   }),
// // });

// export const orderValidationSchemas = {
//   //   orderUpdateValidationSchema,
//   orderValidationSchema,
// };
