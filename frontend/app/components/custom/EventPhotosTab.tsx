import { View, Text, StyleSheet, Pressable, Image, ScrollView, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface EventPhotosTabProps {
    images: string[]
    onAddPhoto: () => void;
}

export const EventPhotosTab = ({ images, onAddPhoto }: EventPhotosTabProps) => {
    const { width } = Dimensions.get('window');
    const imageSize = (width - 32 - 16) / 2; // container padding and gap

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Photos ({images.length})</Text>
                <Pressable style={styles.addButton} onPress={onAddPhoto}>
                    <Ionicons name="add" size={20} color="#8200DB" />
                    <Text style={styles.addButtonText}>Add Photo</Text>
                </Pressable>
            </View>

            {images.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="image-outline" size={48} color="#d1d5db" />
                    <Text style={styles.emptyTitle}>No Photos Yet</Text>
                    <Text style={styles.emptyText}>
                        Be the first one to share a photo from this event!
                    </Text>
                </View>
            ) : (
                <View style={styles.photoGrid}>
                    {images.map((image, index) => (
                        <Pressable key={`image-${index}`} style={[styles.photoContainer, { width: imageSize, height: imageSize }]}>
                            <Image source={{ uri: image }} style={styles.photo} />
                        </Pressable>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    addButtonText: {
        color: '#8200DB',
        fontWeight: '600',
        marginLeft: 4,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginTop: 12,
        marginBottom: 4,
    },
    emptyText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 20,
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    photoContainer: {
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f3f4f6',
    },
    photo: {
        width: '100%',
        height: '100%',
    },
}); 