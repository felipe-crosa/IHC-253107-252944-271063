import axios from '../providers/axios.provider';
import { Invite } from '../types/invite';

const baseUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/invites`

export const getAll = async () : Promise<Invite[]> => {
    const response = await axios.get(`${baseUrl}`);

    return response.data;
}