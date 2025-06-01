import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authenticationService from '../services/authentication.service';
import axios from '../providers/axios.provider';

// Types
interface User {
  // your user interface
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: User | null };

// Initial state
const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: true, 
        isLoading: false 
      };
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload,
        isLoading: false 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      };
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
} | null>(null);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { access_token } = await authenticationService.login(email, password);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      await AsyncStorage.setItem('token', access_token);
      const user = await authenticationService.profile();
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      console.error('Login failed:', error);
      await AsyncStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      dispatch({ type: 'LOGOUT' });
      throw error;
    }
  };

  const logout = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await AsyncStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout failed:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const initialize = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        dispatch({ type: 'SET_USER', payload: null });
        return;
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      try {
        const user = await authenticationService.profile();
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error: any) {
        if (error?.response?.status === 401) {
          console.log('Token invalid or expired, logging out');
          await AsyncStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
          dispatch({ type: 'LOGOUT' });
        } else {
          console.error('Profile fetch failed:', error);
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      }
    } catch (error) {
      console.error('Initialize failed:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, logout, initialize }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};