import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { initializeAxiosInterceptor, useAuthStore } from './context/useAuth';
import { useEffect } from 'react';

export default function Layout() {
  useEffect(() => {
    initializeAxiosInterceptor();
  }, []);


  return (
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', 
  },
});
