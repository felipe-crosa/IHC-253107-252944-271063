import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProfilePhotosTabProps {
    photos: string[];
}

const { width } = Dimensions.get('window');
const photoSize = (width - 60) / 3;

export const ProfilePhotosTab = ({ photos }: ProfilePhotosTabProps) => {
    if (photos.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No photos to display.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {photos.map((photo, index) => (
                <LinearGradient
                    key={index}
                    colors={['#E9D4FF', '#DAB2FF']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.photoThumbnail}
                >
                    <Text style={styles.photoThumbnailText}>Photo {index + 1}</Text>
                </LinearGradient>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 10,
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
    photoThumbnail: {
        width: photoSize,
        height: photoSize,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoThumbnailText: {
        color: '#8200DB',
        fontSize: 14,
        fontWeight: '400',
    },
});