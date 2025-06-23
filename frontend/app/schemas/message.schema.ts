import { z } from "zod";
import { userSchema } from "./user.schema";

export const messageSchema = z.object({
    id: z.number(),
    content: z.string(),
    created_at: z.string(),
    sender: userSchema,
});

export type Message = z.infer<typeof messageSchema>;