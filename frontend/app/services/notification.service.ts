import axios from '../providers/axios.provider';
import { Notification } from '../types/notification';

const baseUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/notifications`

export const getAll = async () : Promise<Notification[]> => {
    const response = await axios.get(`${baseUrl}`);

    return response.data.notifications;
}
export const getRead = async () : Promise<Notification[]> => {
    const response = await axios.get(`${baseUrl}/read`);

    return response.data.notifications;
}
export const getUnread = async () : Promise<Notification[]> => {
    const response = await axios.get(`${baseUrl}/unread`);

    return response.data.notifications;
}