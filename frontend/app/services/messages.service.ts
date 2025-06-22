import axios from '../providers/axios.provider';
import { Message } from '../types/message';

export const createMessage = async (eventId: number, content: string) : Promise<Message> => {
    const response = await axios.post(`/events/${eventId}/messages`, {
        content
    });

    return response.data.data;
} 