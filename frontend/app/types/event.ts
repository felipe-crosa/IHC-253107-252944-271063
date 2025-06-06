import { z } from "zod";
import { createEventSchema, createEventStep1Schema, createEventStep2Schema } from "../schemas/create-event.schema";

export interface Event {
    id: number;
    title: string;
    description: string;
    start_at: Date;
    location: string;
    group_id: number;
    category_id: number;
}

export type CreateEventStep1Data = z.infer<typeof createEventStep1Schema>;
export type CreateEventStep2Data = z.infer<typeof createEventStep2Schema>;
export type CreateEventFormData = z.infer<typeof createEventSchema>;
