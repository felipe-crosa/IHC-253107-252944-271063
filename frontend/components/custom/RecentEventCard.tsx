import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Event } from "@/app/types/event";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

interface RecentEventCardProps {
    event: Event;
}

export const RecentEventCard = ({ event } : RecentEventCardProps) => {
    const router = useRouter();
    return (
        <Pressable key={event.id} style={styles.recentEventItem} onPress={() => router.push(`/events/${event.id}`)}>
            <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDetails}>
                    {event.group_id} • {event.start_at}
                </Text>
            </View>
            <View style={styles.photoSection}>
                <View style={styles.photoGrid}>
                    {[1, 2, 3, 4].map((_, index) => (
                        <LinearGradient  
                            colors={['#E9D4FF', '#DAB2FF']}
                            start={{ x: 1, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.photoThumbnail} />))}
                </View>
                <Pressable>
                    <Text style={styles.viewPhotosText}>View all 24 photos</Text>
                </Pressable>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    eventContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    eventDetails: {
        fontSize: 14,
        color: '#6B7280',
    },
    recentEventItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    photoSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },
    photoGrid: {
        flexDirection: 'row',
        gap: 8,
    },
    photoThumbnail: {
        width: 60,
        height: 60,
        backgroundColor: '#C4B5FD',
        borderRadius: 8,
    },
    viewPhotosText: {
        fontSize: 14,
        color: '#8200DB',
        fontWeight: '500',
    },
})