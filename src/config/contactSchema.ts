import { z } from 'zod';

export const contactFormSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  interest: z.enum(['real-estate', 'cars', 'metals', 'yachts', 'jets'], {
    errorMap: () => ({ message: 'Please select an area of interest' }),
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  recaptchaToken: z.string(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;