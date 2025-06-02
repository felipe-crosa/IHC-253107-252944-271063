import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from './context/useAuth';
import { SplashScreenController } from './splash/splash';

export default function Root() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { isLoggedIn } = useAuth();

  console.log('isLoggedIn', isLoggedIn);

  return (
    <Stack screenOptions={{
      headerShown: false, 
    }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}