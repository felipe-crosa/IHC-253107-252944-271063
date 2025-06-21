import { CreateEventFormData } from "../types/event";
import axios from "../providers/axios.provider";

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