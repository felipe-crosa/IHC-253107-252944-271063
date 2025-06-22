import { z } from "zod";
import { messageSchema } from "./message.schema";
import { userSchema } from "./user.schema";
import { categorySchema } from "./category.schema";
import { pollSchema } from "./poll.schema";

export const eventSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    start_at: z.string(),
    location: z.string(),
    group_id: z.number(),
    category: categorySchema,
    messages: z.array(messageSchema),
    confirmed_attendees: z.array(userSchema),
    pending_attendees: z.array(userSchema),
    cancelled_attendees: z.array(userSchema),
    images: z.array(z.string()),
    polls: z.array(pollSchema),
});
