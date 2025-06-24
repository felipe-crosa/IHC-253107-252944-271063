import React, { useState } from 'react';
import { View, StyleSheet, Pressable, ScrollView, Image, Dimensions, Text, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { PhotoPickerModal } from './PhotoPickerModal';
import * as eventsService from '@/app/services/events.service';
import { Image as ImageType } from '@/app/schemas/imageSchema';
import FlashMessage, { showMessage } from 'react-native-flash-message';

interface EventPhotosTabProps {
    images: ImageType[];
    eventId: number;
    onImageUploaded?: (newImage: ImageType) => void;
}

const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 3;

export const EventPhotosTab = ({ images, eventId, onImageUploaded }: EventPhotosTabProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    console.log('EventPhotosTab - images:', images);
    console.log('EventPhotosTab - images length:', images.length);
    images.forEach((image, index) => {
        console.log(`Image ${index}:`, image);
        console.log(`Image ${index} URL:`, image.url);
    });

    const handleAddPhoto = () => {
        setModalVisible(true);
    };

    const handleImageSelected = async (imageUri: string) => {
        setIsUploading(true);
        try {
            const uploadedImage = await eventsService.uploadImage(eventId, imageUri);
            console.log('Uploaded image:', uploadedImage);
            onImageUploaded?.(uploadedImage);
            showMessage({
                message: 'Photo uploaded successfully!',
                type: 'success',
            });
        } catch (error: any) {
            showMessage({
                message: error.response.data.message || 'Failed to upload photo. Please try again.',
                type: 'danger',
            });
        } finally {
            setIsUploading(false);
        }
    };

    if (images.length === 0) {
        return (
            <>
                <FlashMessage position="top" />
                <View style={styles.emptyContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="camera-outline" size={48} color="#8200DB" />
                    </View>
                    <Text style={styles.emptyTitle}>No photos yet</Text>
                    <Text style={styles.emptySubtitle}>Photos will appear here after the event</Text>
                    <Pressable 
                        style={[styles.addButton, isUploading && styles.addButtonDisabled]} 
                        onPress={handleAddPhoto}
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <ActivityIndicator size="small" color="white" />
                        ) : (
                            <>
                                <Ionicons name="camera-outline" size={20} color="white" />
                                <Text style={styles.addButtonText}>Add Photos</Text>
                            </>
                        )}
                    </Pressable>
                </View>
                <PhotoPickerModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onImageSelected={handleImageSelected}
                />
            </>
        );
    }

    return (
        <>
            <FlashMessage position="top" />
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.photoCount}>{images.length} photo{images.length !== 1 ? 's' : ''}</Text>
                    <Pressable 
                        style={[styles.addButtonSmall, isUploading && styles.addButtonDisabled]} 
                        onPress={handleAddPhoto}
                        disabled={isUploading}
                    >
                        {isUploading ? (
                            <ActivityIndicator size="small" color="#8200DB" />
                        ) : (
                            <Ionicons name="add" size={20} color="#8200DB" />
                        )}
                    </Pressable>
                </View>
                <View style={styles.grid}>
                    {images.map((image, index) => (
                        <Image 
                            key={index} 
                            source={{ uri: image.url }} 
                            style={styles.image}
                            onError={(error) => {
                                console.error(`Error loading image ${index}:`, error.nativeEvent);
                                console.error(`Image URL:`, image.url);
                            }}
                            onLoad={() => {
                                console.log(`Image ${index} loaded successfully:`, image.url);
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
            <PhotoPickerModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onImageSelected={handleImageSelected}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    photoCount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
    },
    addButtonSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f3e8ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    image: {
        width: imageSize,
        height: imageSize,
        borderRadius: 8,
        backgroundColor: '#e5e7eb',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        backgroundColor: 'white',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        minHeight: 300,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E9D4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 8,
        textAlign: 'center',
        marginBottom: 24,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8200DB',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
    },
    addButtonDisabled: {
        opacity: 0.6,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
}); 