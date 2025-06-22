import { z } from "zod";
import { userSchema } from "./user.schema";
import { eventSchema } from "./event.schema";

export const groupSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    owner_id: z.number(),
    invites: z.array(userSchema),
    created_at: z.string(),
    events: z.array(eventSchema),
    members: z.array(userSchema),
});