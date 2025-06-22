import { z } from "zod";
import { createEventSchema, createEventStep1Schema, createEventStep2Schema } from "../schemas/create-event.schema";
import { eventSchema } from "../schemas/event.schema";

export type Event = z.infer<typeof eventSchema>;

export const eventsArraySchema = z.array(eventSchema);

export type CreateEventStep1Data = z.infer<typeof createEventStep1Schema>;
export type CreateEventStep2Data = z.infer<typeof createEventStep2Schema>;
export type CreateEventFormData = z.infer<typeof createEventSchema>;
