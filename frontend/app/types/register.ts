import { z } from 'zod';
import { registerSchema } from '../schemas/register.schema';

export type RegisterFormData = z.infer<typeof registerSchema>;