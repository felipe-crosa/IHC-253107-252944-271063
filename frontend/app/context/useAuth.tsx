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
  isLoading: boolean;
  isLoggedIn: boolean;
  
  signIn: (data: LoginFormData) => Promise<void>;
  signOut: () => void;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: true, 
      isLoggedIn: false,

      signIn: async (data: LoginFormData) => {
        set({ isLoading: true });
        try {
          const { token_type, access_token } = await authenticationService.login(data.email, data.password);
          const authToken = `${token_type} ${access_token}`;
          axios.defaults.headers.common['Authorization'] = authToken;
          const userProfile = await authenticationService.profile();
        
          set({ 
            user: userProfile, 
            token: authToken,
            isLoggedIn: true,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signOut: async () => {
        set({ 
          user: null, 
          token: null, 
          isLoggedIn: false,
          isLoading: false
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      initialize: () => {
        const { token, user } = get();
      
        if (token) {
          axios.defaults.headers.common['Authorization'] = token;
          initializeAxiosInterceptor(); 
        }
      
        set({ 
          isLoggedIn: !!(token && user), 
          isLoading: false 
        });
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.initialize();
        }
      },
    }
  )
);

let interceptorSetup = false;

export const initializeAxiosInterceptor = () => {
  if (!interceptorSetup) {
    setupAxiosInterceptors(axios, () => useAuthStore.getState().token);
    interceptorSetup = true;
  }
};