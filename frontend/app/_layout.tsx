import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useAuthStore } from './context/useAuth';

export default function Layout() {
  useEffect(() => {
    useAuthStore.getState().initialize();
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


