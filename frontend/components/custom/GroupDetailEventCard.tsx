import { Event } from "@/app/types/event";
import { formatShortDate } from "@/helpers/format-text.helper";
import Ionicons from "@expo/vector-icons/Ionicons"
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"

interface GroupDetailEventCard {
    event: Event;
    isUpcoming: boolean;
}

export const GroupDetailEventCard = ({ event, isUpcoming } : GroupDetailEventCard ) => { 
    console.log(event.start_at);
    console.log(typeof event.start_at);   
    const images = event.images || [];
    return (<View key={event.id} style={styles.eventItem}>
                <View style={styles.eventContent}>
                    <View style={styles.eventInfo}>
                        <View style={[styles.eventIcon, isUpcoming ? styles.upcomingEventIcon : styles.pastEventIcon]}>
                            <Ionicons name="calendar-outline" size={24} color={isUpcoming ? "#8200DB" : "#6A7282"} />
                        </View>
                        <View style={styles.eventDetails}>
                            <Text style={styles.eventTitle}>{event.title}</Text>
                            <Text style={styles.eventDate}>{ event.start_at }</Text>
                        </View>
                    </View>
                    {!isUpcoming && (
                        <View style={styles.photoSection}>
                            {images.length > 0 ? (
                                <>
                                    <View style={styles.photoGrid}>
                                        {[0, 1, 2, 3].map((idx) => (
                                            images[idx] ? (
                                                <Image
                                                    key={`photo-${event.id}-${idx}-${images[idx].url}`}
                                                    source={{ uri: images[idx].url }}
                                                    style={styles.photoThumbnail}
                                                />
                                            ) : (
                                                <LinearGradient  
                                                    key={`placeholder-${event.id}-${idx}`}
                                                    colors={['#E9D4FF', '#DAB2FF']}
                                                    start={{ x: 1, y: 0 }}
                                                    end={{ x: 1, y: 1 }}
                                                    style={styles.photoThumbnail} />
                                            )
                                        ))}
                                    </View>
                                    <TouchableOpacity>
                                        <Text style={styles.viewPhotosText}>
                                            View all {images.length} photos
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <Text style={styles.noPhotosText}>No photos yet</Text>
                            )}
                        </View>
                    )}
                    {/* {isUpcoming && (
                        <Text style={styles.attendeesText}>{event.attendees} going</Text>
                    )} */}
                </View>

        </View>)
}

const styles = StyleSheet.create({
    eventItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
    },
    eventIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 8,
    },
    upcomingEventIcon: {
        backgroundColor: '#F3E8FF',
    },
    pastEventIcon: {
        backgroundColor: '#E5E7EB',
    },
    eventContent: {
        display: 'flex',
        gap: 8,
        flexDirection: 'column',
    },
    eventInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
    },
    eventDetails: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
    },
    eventDate: {
        fontSize: 14,
        color: '#6b7280',
    },
    attendeesText: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 2,
    },
    photoSection: {
        marginTop: 8,
    },
    photoGrid: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    photoThumbnail: {
        width: 60,
        height: 60,
        backgroundColor: '#c4b5fd',
        borderRadius: 8,
        marginRight: 8,
    },
    viewPhotosText: {
        color: '#8200DB',
        fontSize: 14,
        fontWeight: '500',
    },
    noPhotosText: {
        color: '#6B7280',
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 4,
    },
})
