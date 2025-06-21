import { z } from 'zod';

export const createEventStep1Schema = z.object({
    title: z.string().min(1, { message: 'Event name is required' }),
    description: z.string().min(1, { message: 'Event description is required' }),
    start_at: z.date(),
    category_id: z.string().min(1, { message: 'Category ID is required' }),
    location: z.string().min(1, { message: 'Event description is required' }),
});
  
export const createEventStep2Schema = z.object({
    group_id: z.number().min(1, { message: 'Group ID is required' }),
});

export const createEventSchema = createEventStep1Schema
  .merge(createEventStep2Schema);

  