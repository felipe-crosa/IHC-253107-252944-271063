import axios from '../providers/axios.provider';

const baseUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/notifications`;

export const getAllNotifications = async () => {
  const response = await axios.get(baseUrl);
  return response.data.data;
};

export const markAllRead = async () => {
  const response = await axios.post(`${baseUrl}/read`);
  return response.data;
};

export const getUnreadNotifications = async () => {
  const response = await axios.get(`${baseUrl}/unread`);
  return response.data.data;
};
