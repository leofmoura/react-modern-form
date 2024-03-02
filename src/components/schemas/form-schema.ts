import { z } from 'zod';

export const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Name should not be that short.')
    .refine(
      (val) => val && val.length && Number.isNaN(Number.parseInt(val[0])),
      {
        message: 'Username should not start by number',
      }
    ),
  email: z.string().email('Email is invalid.').or(z.literal('')),
  password: z.string({}).min(12, 'Password should have at least 12 of lenght'),
  tags: z.array(z.object({ value: z.string().max(10, 'Max lenght is 10.') })),
});
