import { z } from "zod";
import { createEventSchema } from "../schemas/create-event.schema";

export interface Event {
    id: number;
    title: string;
    description: string;
    start_at: Date;
    location: string;
    group_id: number;
    category_id: number;
}

export type CreateEventFormData = z.infer<typeof createEventSchema>;