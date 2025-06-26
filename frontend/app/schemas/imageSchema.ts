import { z } from "zod";
import { userSchema } from "./user.schema";

export const imageSchema = z.object({
    url: z.string(),
    sender: userSchema,
});

export type Image = z.infer<typeof imageSchema>;