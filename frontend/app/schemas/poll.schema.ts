import { z } from "zod";

const optionSchema = z.object({
    id: z.number(),
    name: z.string(),
    poll_id: z.number(),
    votes_count: z.number(),
    voted: z.boolean(),
});

export const pollSchema = z.object({
    id: z.number(),
    question: z.string(),
    options: z.array(optionSchema),
    duration: z.number(),
    multiple_answers: z.boolean(),
    is_active: z.boolean(),
});