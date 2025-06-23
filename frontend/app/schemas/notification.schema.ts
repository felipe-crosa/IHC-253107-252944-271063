import { z } from 'zod';

export const notificationSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  type: z.enum([
    'invitation',
    'reminder',
    'update',
    'comment',
    'confirmed',
    'image',
  ]),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  read_at: z.string().datetime().nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});