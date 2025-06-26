import { z } from "zod";
import { userSchema } from "./user.schema";
import { eventSchema } from "./event.schema";
import { inviteSchema } from "./invite.schema";

export const groupSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    owner_id: z.number(),
    members: z.array(z.lazy(() => userSchema)).optional(),
    events: z.array(z.lazy(() => eventSchema)).optional(),
    invites: z.array(z.lazy(() => inviteSchema)).optional(),
    created_at: z.string().optional(),
});