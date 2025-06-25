import React, { useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Alert, Animated, Easing, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

interface PhotoPickerModalProps {
    visible: boolean;
    onClose: () => void;
    onImageSelected: (imageUri: string) => void;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const PhotoPickerModal = ({ visible, onClose, onImageSelected }: PhotoPickerModalProps) => {
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: SCREEN_HEIGHT,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.in(Easing.ease),
            }).start();
        }
    }, [visible]);

    const requestPermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant camera roll permissions to select photos.');
            return false;
        }
        return true;
    };

    const requestCameraPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant camera permissions to take photos.');
            return false;
        }
        return true;
    };

    const takePhoto = async () => {
        const hasPermission = await requestCameraPermissions();
        if (!hasPermission) return;

        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                onImageSelected(result.assets[0].uri);
                onClose();
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to take photo. Please try again.');
        }
    };

    const selectFromGallery = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                onImageSelected(result.assets[0].uri);
                onClose();
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to select photo. Please try again.');
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Animated.View style={[styles.modal, { transform: [{ translateY }] }]}> 
                    <View style={styles.header}>
                        <Text style={styles.title}>Add Photo</Text>
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#6b7280" />
                        </Pressable>
                    </View>
                    
                    <View style={styles.options}>
                        <Pressable style={styles.option} onPress={takePhoto}>
                            <View style={styles.optionIcon}>
                                <Ionicons name="camera" size={32} color="#8200DB" />
                            </View>
                            <Text style={styles.optionText}>Take Photo</Text>
                        </Pressable>
                        
                        <Pressable style={styles.option} onPress={selectFromGallery}>
                            <View style={styles.optionIcon}>
                                <Ionicons name="images" size={32} color="#8200DB" />
                            </View>
                            <Text style={styles.optionText}>Choose from Gallery</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
    },
    closeButton: {
        padding: 5,
    },
    options: {
        gap: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    optionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f3e8ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1f2937',
    },
}); 