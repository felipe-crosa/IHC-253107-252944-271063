const baseUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/groups`
import axios from '../providers/axios.provider';

export const getAll = async () => {
    const response = await axios.get(`${baseUrl}`);

    return response.data;
}