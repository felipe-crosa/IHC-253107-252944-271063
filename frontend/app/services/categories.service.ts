import axios from '../providers/axios.provider';
import { Category } from '../types/category';

const baseUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/categories`

export const getAll = async () : Promise<Category[]>=> {
    const response = await axios.get(`${baseUrl}`);

    return response.data.data;
}