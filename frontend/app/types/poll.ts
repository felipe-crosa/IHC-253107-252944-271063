import { z } from "zod";
import { pollSchema } from "../schemas/poll.schema";

export type Poll = z.infer<typeof pollSchema>;
