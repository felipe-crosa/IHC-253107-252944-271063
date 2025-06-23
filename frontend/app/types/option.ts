import { z } from "zod";
import { optionSchema } from "../schemas/poll.schema";

export type Option = z.infer<typeof optionSchema>; 

export const optionsArraySchema = z.array(optionSchema);