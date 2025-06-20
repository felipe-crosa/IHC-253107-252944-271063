import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";
import { Event } from "@/app/types/event";

interface UpcomingEventCardProps {
    event: Event;
}

export const UpcomingEventCard = ({ event } : UpcomingEventCardProps) => {
    return (
        <View key={event.id} style={styles.upcomingEventItem}>
            <View style={styles.attendingIcon}>
                <Ionicons name="checkmark" size={16} color="#10B981" />
            </View>
            <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDetails}>
                {event.group_id} • {event.start_at.toDateString()}
                </Text>
            </View>
            <Text style={styles.attendeesText}>8 going</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    upcomingEventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      },
      attendingIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#D1FAE5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
      },
      attendeesText: {
        fontSize: 14,
        color: '#6B7280',
      },
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
        fontWeight: '400',
        color: '#6A7282',
      },

})