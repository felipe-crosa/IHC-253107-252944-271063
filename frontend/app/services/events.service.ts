import { CreateEventFormData, eventsArraySchema, eventSchema } from "../types/event";
import axios from "../providers/axios.provider";
import { Event } from "../types/event";

const baseUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/events`

export const create = async (data: CreateEventFormData) : Promise<Event> => {
    const response = await axios.post(`${baseUrl}`, {
        ...data
    });

    return response.data.data;
}

export const getAll = async () : Promise<Event[]> => {
    const response = await axios.get(`${baseUrl}`);
    const rawData = response.data.data;
    return eventsArraySchema.parse(rawData);
}

export const getById = async (id: number) : Promise<Event> => {
    const response = await axios.get(`${baseUrl}/${id}`);
    const rawData = response.data.data;
    return eventSchema.parse(rawData);
}