import { AxiosInstance } from 'axios';

export function setupAxiosInterceptors(axiosInstance: AxiosInstance,  getToken?: () => string | null) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken?.();
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

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