import { z } from "zod";
import { createEventSchema, createEventStep1Schema, createEventStep2Schema } from "../schemas/create-event.schema";

export const eventSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),    
    start_at: z.string(),    
    location: z.string(),
    group_id: z.number(),
    category_id: z.number(),
});

export type Event = z.infer<typeof eventSchema>;

export const eventsArraySchema = z.array(eventSchema);

export type CreateEventStep1Data = z.infer<typeof createEventStep1Schema>;
export type CreateEventStep2Data = z.infer<typeof createEventStep2Schema>;
export type CreateEventFormData = z.infer<typeof createEventSchema>;
