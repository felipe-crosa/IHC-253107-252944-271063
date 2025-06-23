import { z } from "zod";
import { userSchema } from "./user.schema";
import { groupSchema } from "./group.schema";

export const inviteSchema = z.object({
    id: z.number(),
    user: z.lazy(() => userSchema),
    group: z.lazy(() => groupSchema),
}); 