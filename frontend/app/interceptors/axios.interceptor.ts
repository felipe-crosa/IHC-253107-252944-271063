import { AxiosInstance } from 'axios';

export function setupAxiosInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'An unknown error occurred';

      return Promise.reject(new Error(message));
    }
  );
}