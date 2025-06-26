import axios from 'axios';
import { setupAxiosInterceptors } from '../interceptors/axios.interceptor';

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

setupAxiosInterceptors(instance);

export default instance;