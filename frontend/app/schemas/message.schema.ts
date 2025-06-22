import { z } from "zod";
import { userSchema } from "./user.schema";

export const messageSchema = z.object({
    id: z.number(),
    sender: userSchema,
    content: z.string(),
    sender_id: z.number(),
    event_id: z.number(),
    created_at: z.string(),
});