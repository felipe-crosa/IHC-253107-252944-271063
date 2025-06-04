import { z } from 'zod';

export const Category = {
    SOCIAL: 'social',
    SPORTS: 'sports',
    FOOD: 'food',
    MUSIC: 'music',
    TRAVEL: 'travel',
    MOVIES: 'movies',
    GAMES: 'games',
    OTHER: 'other',
} as const;

export type Category = (typeof Category)[keyof typeof Category];

export const categorySchema = z.nativeEnum(Category);

export const createEventSchema = z.object({
    title: z.string().min(1, { message: 'Event name is required' }),
    description: z.string().min(1, { message: 'Event description is required' }),
    start_at: z.date().refine(date => date > new Date(), {
        message: 'Event start date must be in the future',
    }),
    category: categorySchema,
    location: z.string().min(1, { message: 'Event description is required' }),
    group_id: z.number().min(1, { message: 'Group ID is required' }),
    category_id: z.number().min(1, { message: 'Category ID is required' }),
});