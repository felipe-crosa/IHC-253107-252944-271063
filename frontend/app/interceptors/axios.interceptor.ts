import { AxiosInstance } from 'axios';

export function setupAxiosInterceptors(
  axiosInstance: AxiosInstance,
  getToken: () => string | null
) {
  axiosInstance.interceptors.request.use((config) => {
    const token = getToken?.();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn('Token expired or unauthorized - consider redirect');
      }
      return Promise.reject(error);
    }
  );
}
