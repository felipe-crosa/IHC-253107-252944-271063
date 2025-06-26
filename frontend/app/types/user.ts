import { userSchema } from "../schemas/user.schema";
import { z } from "zod";

export type User = z.infer<typeof userSchema>;