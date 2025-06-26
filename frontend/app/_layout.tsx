import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useEffect } from 'react';
import { useAuthStore } from './stores/useAuthStore';
import { useNotificationStore } from './stores/useNotificationStore';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as SplashScreen from 'expo-splash-screen';
import FlashMessage, { showMessage } from 'react-native-flash-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [loaded, error] = useFonts({
        ...Ionicons.font,
    });
    const { pendingMessage, clearPendingMessage } = useNotificationStore();

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    useEffect(() => {
        useAuthStore.getState().initialize();
    }, []);

    useEffect(() => {
        if (pendingMessage) {
            showMessage(pendingMessage);
            clearPendingMessage();
        }
    }, [pendingMessage, clearPendingMessage]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <Slot />
                </SafeAreaView>
            </View>
            <FlashMessage position="top" />
        </KeyboardAvoidingView>
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


