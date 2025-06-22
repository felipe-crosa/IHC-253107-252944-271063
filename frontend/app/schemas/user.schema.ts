import { z } from 'zod';
import { groupSchema } from './group.schema';

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    groups: z.array(groupSchema),
});
