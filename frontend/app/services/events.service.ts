import { CreateEventFormData } from "../types/event";
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
    return response.data.data;
}

export const getById = async (id: number) : Promise<Event> => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data.data;
}

export const getPendingEvents = async () : Promise<Event[]> => {
    const response = await axios.get(`${baseUrl}/pending`);

    return response.data.data;
}

export const acceptEvent = async (eventId: number) : Promise<void> => {
    const response = await axios.post(`${baseUrl}/${eventId}/accept`);
}

export const rejectEvent = async (eventId: number) : Promise<void> => {
    const response = await axios.post(`${baseUrl}/${eventId}/reject`);
}