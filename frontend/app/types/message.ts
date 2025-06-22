import { messageSchema } from "../schemas/message.schema";
import { z } from "zod";

export type Message = z.infer<typeof messageSchema>;