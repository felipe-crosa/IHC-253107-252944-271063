import { AxiosInstance } from 'axios';

export function setupAxiosInterceptors(
  axiosInstance: AxiosInstance,
) {

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        import('../stores/useAuthStore').then(({ useAuthStore }) => {
          useAuthStore.getState().signOut();
        });
      }
      return Promise.reject(error);
    }
  );
}
