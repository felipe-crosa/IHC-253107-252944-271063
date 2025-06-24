import { View, Text, StyleSheet, Pressable } from "react-native"
import { Event } from "@/app/types/event"
import { ActionButtons } from "./ActionButtons";
import { useRouter } from "expo-router";

interface ActionRequiredEventCardProps {
    event: Event;
    handleAcceptAction: (eventId: number) => void;
    handleRejectAction: (eventId: number) => void;
}

export const ActionRequiredEventCard = ({ event, handleAcceptAction, handleRejectAction} : ActionRequiredEventCardProps) => {
  const router = useRouter();
    return (
        <Pressable key={event.id} style={styles.actionEventItem} onPress={() => router.push(`/events/${event.id}`)}>
            <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDetails}>
                {event.group_id} • {event.start_at}
                </Text>
            </View>
            <ActionButtons handleAccept={() => handleAcceptAction(event.id)} handleReject={() => handleRejectAction(event.id)} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    actionEventItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#FF6900',
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
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

});