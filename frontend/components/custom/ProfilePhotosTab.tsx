import React, { useState } from 'react';
import { View, Image, Pressable, Modal, StyleSheet, Dimensions, Text } from 'react-native';
import { Image as ImageType } from '@/app/schemas/imageSchema';

interface ProfilePhotosTabProps {
    photos: (string | ImageType)[];
}

const { width, height } = Dimensions.get('window');
const imageSize = (width - 48) / 3; // 3 per row, 16px padding/gap

export const ProfilePhotosTab = ({ photos }: ProfilePhotosTabProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    if (!photos || photos.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No photos to display.</Text>
            </View>
        );
    }

    const getImageUrl = (photo: string | ImageType): string => {
        return typeof photo === 'string' ? photo : photo.url;
    };

    return (
        <View style={styles.grid}>
            {photos.map((photo, idx) => {
                const imageUrl = getImageUrl(photo);
                return (
                    <Pressable
                        key={imageUrl || idx}
                        onPress={() => {
                            setSelectedImage(imageUrl);
                            setModalVisible(true);
                        }}
                    >
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.thumbnail}
                        />
                    </Pressable>
                );
            })}
            <Modal
                visible={modalVisible}
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <Pressable style={styles.modalBackground} onPress={() => setModalVisible(false)}>
                    {selectedImage && (
                        <Image
                            source={{ uri: selectedImage }}
                            style={styles.fullImage}
                            resizeMode="contain"
                        />
                    )}
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        padding: 16,
        backgroundColor: 'white',
    },
    thumbnail: {
        width: imageSize,
        height: imageSize,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#e5e7eb',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: width * 0.9,
        height: height * 0.7,
        borderRadius: 12,
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: '#6b7280',
        fontSize: 16,
    },
});