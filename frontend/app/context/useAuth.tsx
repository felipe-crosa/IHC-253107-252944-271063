import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user.interface';
import { LoginFormData } from '../types/login';
import * as authenticationService from '../services/authentication.service';
import axios from '../providers/axios.provider';
import { setupAxiosInterceptors } from '../interceptors/axios.interceptor';

interface AuthState {
  user: User | null;
  token: string | null;
  tokenExpiresAt: number | null;
  isLoading: boolean;
  isLoggedIn: boolean;

  signIn: (data: LoginFormData) => Promise<void>;
  signOut: () => void;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
}

let interceptorSetup = false;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      tokenExpiresAt: null,
      isLoading: true,
      isLoggedIn: false,

      signIn: async (data: LoginFormData) => {
        set({ isLoading: true });
        try {
          const {
            token_type,
            access_token,
            expires_in,
          } = await authenticationService.login(data.email, data.password);

          const authToken = `${token_type} ${access_token}`;
          const tokenExpiresAt = Date.now() + expires_in * 1000;

          set({
            token: authToken,
            tokenExpiresAt,
          });

          setupInterceptorsOnce(() => authToken); // <- 💥 Acá pasás getToken como función

          const userProfile = await authenticationService.profile();

          set({
            user: userProfile,
            isLoggedIn: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signOut: () => {
        delete axios.defaults.headers.common['Authorization'];
        set({
          token: null,
          tokenExpiresAt: null,
          user: null,
          isLoggedIn: false,
          isLoading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      initialize: () => {
        const { token, tokenExpiresAt, user } = get();
        const now = Date.now();

        if (token && tokenExpiresAt && tokenExpiresAt > now && user) {
          axios.defaults.headers.common['Authorization'] = token;
          setupInterceptorsOnce(() => token);
          set({ isLoggedIn: true, isLoading: false });
        } else {
          get().signOut();
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        token: state.token,
        tokenExpiresAt: state.tokenExpiresAt,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.initialize();
      },
    }
  )
);

function setupInterceptorsOnce(getToken: () => string | null) {
  if (!interceptorSetup) {
    setupAxiosInterceptors(axios, getToken);
    interceptorSetup = true;
  }
}

export function initializeAxiosInterceptor() {
  useAuthStore.getState().initialize();
}
