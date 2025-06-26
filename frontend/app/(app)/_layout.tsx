import { Slot, Redirect } from 'expo-router';
import { useAuthStore } from '../stores/useAuthStore';

export default function ProtectedLayout() {
  const { isLoggedIn, user } = useAuthStore();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Slot key={user?.id || 'guest'} />;
}
