import { z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email_address: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/, {
        message: "Password must contain at least one letter and one number",
        }),
    password_confirmation: z.string().min(1, { message: 'Password confirmation is required' })
}).refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ["password_confirmation"],
});
