import { use, createContext, type PropsWithChildren } from 'react';
import { User } from '../interfaces/user.interface';
import * as authenticationService from '../services/authentication.service';
import { LoginFormData } from '../types/login';
import axios from '../providers/axios.provider';
import { useStorageState } from '@/hooks/useStorageState';

const AuthContext = createContext<{
  signIn: (data: LoginFormData) => void;
  signOut: () => void;
  isLoggedIn: boolean;
  user?: User | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  isLoggedIn: false,
  user: null,
  isLoading: false,
});

export function useAuth() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error('useAuth must be wrapped in a <AuthProvider />');
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, user], setUser] = useStorageState<User>('user');
  const isLoggedIn = !!user;

  return (
    <AuthContext
      value={{
        signIn: async ({ email, password} : LoginFormData) => {
          console.log('hola')
          const { token_type, access_token } = await authenticationService.login(email, password);
          axios.defaults.headers.common['Authorization'] = `${token_type} ${access_token}`;
          const user = await authenticationService.profile();
          setUser(user);
        },
        signOut: async () => {
          axios.defaults.headers.common['Authorization'] = '';
          setUser(null);
        },
        user,
        isLoggedIn,
        isLoading,
      }}>
      {children}
    </AuthContext>
  );
}
