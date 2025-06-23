import React from 'react';
import { View, StyleSheet, Pressable, ScrollView, Image, Dimensions, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface EventPhotosTabProps {
    images: string[];
    onAddPhoto: () => void;
}

const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 3; // 16px padding on each side, 8px gap on each side

export const EventPhotosTab = ({ images, onAddPhoto }: EventPhotosTabProps) => {
    if (images.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons name="camera-outline" size={48} color="#8200DB" />
                </View>
                <Text style={styles.emptyTitle}>No photos yet</Text>
                <Text style={styles.emptySubtitle}>Photos will appear here after the event</Text>
                <Pressable style={styles.addButton} onPress={onAddPhoto}>
                    <Ionicons name="camera-outline" size={20} color="white" />
                    <Text style={styles.addButtonText}>Add Photos</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.grid}>
                {images.map((uri, index) => (
                    <Image key={index} source={{ uri }} style={styles.image} />
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
}); 