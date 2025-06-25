import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { useEffect } from 'react';
import { useAuthStore } from './stores/useAuthStore';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [loaded, error] = useFonts({
        ...Ionicons.font,
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    useEffect(() => {
        useAuthStore.getState().initialize();
    }, []);

    if (!loaded && !error) {
        return null;
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Slot />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});


