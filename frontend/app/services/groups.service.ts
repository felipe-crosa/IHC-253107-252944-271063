import axios from '../providers/axios.provider';
import { CreateGroupFormData, Group } from '../types/group';
import { Event } from '../types/event';
import { User } from '../types/user';

const baseUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/groups`

export const getAll = async () : Promise<Group[]> => {
    const response = await axios.get(`${baseUrl}`);

    return response.data.data;
}

export const create = async (data: CreateGroupFormData) : Promise<Group> => {
    const response = await axios.post(`${baseUrl}`, {
        ...data
    });

    return response.data.data;

}

export const getById = async (id: string) : Promise<Group> => {
    const response = await axios.get(`${baseUrl}/${id}`);

    return response.data.data;
}

export const getEvents = async (id: string) : Promise<Event[]> => {
    const response = await axios.get(`${baseUrl}/${id}/events`);

    return response.data.data;
}

export const getMembers = async (id: string) : Promise<User[]> => {
    const response = await axios.get(`${baseUrl}/${id}/users`);

    return response.data.data;
}

export const leave = async (id: string) : Promise<void> => {
   await axios.post(`${baseUrl}/${id}/leave`);
}