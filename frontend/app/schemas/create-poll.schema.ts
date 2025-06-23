import { z } from 'zod';

export const createPollSchema = z.object({
    question: z.string().min(1, "Question is required"),
    options: z.array(z.string().min(1, "Option cannot be empty")).min(2, "At least two options are required"),
    duration: z.number().nullable(),
    multiple_choice: z.boolean(),
});

export type CreatePollFormData = z.infer<typeof createPollSchema>; 