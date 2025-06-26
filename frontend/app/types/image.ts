import { z } from "zod";
import { imageSchema } from "../schemas/imageSchema";

export type Image = z.infer<typeof imageSchema>;