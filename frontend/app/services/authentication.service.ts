import { User } from '../interfaces/user.interface';
import axios from '../providers/axios.provider';
import { RegisterFormData } from '../types/register';

const baseUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth`;

export const login = async (email: string, password: string) : Promise<{token_type: string, access_token: string}> => {
    const response = await axios.post(`${baseUrl}/login`, {
        email,
        password
    });

    return response.data.data;
}

export const register = async (data: RegisterFormData) : Promise<void> => {
    await axios.post(`${baseUrl}/register`, {
        ...data
    });
}

export async function profile() : Promise<User> {
    const response = await axios.get(`${baseUrl}/me`, {});
    return response.data.data;
}

export const logout = () => {

}