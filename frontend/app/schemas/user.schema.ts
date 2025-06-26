import { z } from 'zod';

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    groups: z.array(z.lazy(() => groupSchema)),
});
