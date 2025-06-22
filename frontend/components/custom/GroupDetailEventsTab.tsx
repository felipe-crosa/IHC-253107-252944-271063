import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { GroupDetailEventCard } from "./GroupDetailEventCard";
import { Event } from "@/app/types/event";
import { useRouter } from "expo-router";

interface GroupDetailEventsTabProps {
    upcomingEvents: Event[]; 
    pastEvents: Event[];
}

export const GroupDetailEventsTab = ({ upcomingEvents, pastEvents } : GroupDetailEventsTabProps ) => {
    const router = useRouter();
    
    return (
        <View style={styles.tabContent}>
            <View style={styles.eventsSection}>
                <View style={styles.sectionHeader}> 
                    <Text style={styles.sectionTitle}>Upcoming Events</Text>
                    <Pressable style={styles.createButton} onPress={() => router.push('/create-event')}>
                        <Ionicons name="add" size={20} color="#8200DB" />
                        <Text style={styles.createButtonText}>Create</Text>
                    </Pressable>
                </View>
                {upcomingEvents.length === 0 && (
                    <Text style={styles.noDataLabel}>No upcoming events</Text>
                )}
                {upcomingEvents.length > 0 && upcomingEvents.map(event => { 
                    return <GroupDetailEventCard event={event} isUpcoming={true} />
                })}
            </View>
           
            <View style={styles.eventsSection}>
                <Text style={styles.sectionTitle}>Past Events</Text>
                {pastEvents.length === 0 && (
                    <Text style={styles.noDataLabel}>No past events</Text>
                )}
                {pastEvents.map(event => { 
                    return <GroupDetailEventCard event={event} isUpcoming={false} />
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    tabContent: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        width: '100%',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    eventsSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,

    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    createButtonText: {
        color: '#8200DB',
        fontWeight: '600',
        marginLeft: 4,
    },
    noDataLabel: {
        color: '#6B7280', 
        fontSize: 16 
    }
    

})