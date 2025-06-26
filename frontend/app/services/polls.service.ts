import axios from '../providers/axios.provider';
import { CreatePollFormData } from '../schemas/create-poll.schema';
import { Poll } from '../types/poll';

const baseUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/polls`;

export const createPoll = async (eventId: number, data: CreatePollFormData) : Promise<Poll> => {
    const response = await axios.post(`/events/${eventId}/polls`, data);
    return response.data.data;
}

export const voteOnPoll = async (pollId: number, optionId: number) : Promise<void> => {
    await axios.post(`${baseUrl}/${pollId}/vote`, { option_id: optionId });
}

export async function voteInPoll(pollId: number, optionId: number): Promise<void> {
    try {
        await axios.post(`${baseUrl}/${pollId}/vote`, { option_id: optionId });
    } catch (error) {
        console.error("Error voting in poll:", error);
        throw new Error("Failed to vote in the poll. Please try again.");
    }
} 