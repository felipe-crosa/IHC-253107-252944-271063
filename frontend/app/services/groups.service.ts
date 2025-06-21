import axios from '../providers/axios.provider';
import { CreateGroupFormData, Group } from '../types/group';

const baseUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/groups`

export const getAll = async () => {
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

    return response.data;
}