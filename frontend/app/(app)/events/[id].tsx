import { getInitials } from "@/helpers/format-text.helper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { Event } from "@/app/types/event";
import * as eventsService from "@/app/services/events.service";
import * as messagesService from "@/app/services/messages.service";
import { Message } from "@/app/types/message";
import { EventPollsTab } from "@/components/custom/EventPollsTab";
import { EventDiscussionTab } from "@/components/custom/EventDiscussionTab";
import { EventPhotosTab } from "@/components/custom/EventPhotosTab";
import { Image as ImageType } from "@/app/schemas/imageSchema";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { EventAttendancePoll } from "@/components/custom/EventAttendancePoll";
import * as groupsService from "@/app/services/groups.service";
import { Group } from "@/app/types/group";
import { format, isToday, isTomorrow } from 'date-fns';

const TABS = {
    Discussion: 'Discussion',
    Photos: 'Photos',
    Polls: 'Polls',
} as const;

type Tabs = (typeof TABS)[keyof typeof TABS];

const mockEvent = {
    id: 1,
    title: 'Beach Day',
    description: 'Fun day at the beach with games and BBQ',
    start_at: new Date(Date.now() + 24 * 60 * 60 * 1000), 
    location: 'Santa Monica Beach',
    group_id: 2,
    category_id: 1,
}

function formatEventDate(dateString: string) {
    const date = new Date(dateString);
    if (isToday(date)) {
        return `Today, ${format(date, 'h:mm a')}`;
    } else if (isTomorrow(date)) {
        return `Tomorrow, ${format(date, 'h:mm a')}`;
    } else {
        return format(date, 'MMM d, h:mm a');
    }
}

export default function EventDetailsPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [activeTab, setActiveTab] = useState<Tabs>(TABS.Discussion);
    const { user } = useAuthStore();
    const [group, setGroup] = useState<Group | null>(null);

    const getEvent = async (id: number) => {
        try {
            const response = await eventsService.getById(id);
            setEvent(response);
        } catch (error: any) {
            showMessage({
                message: error.message || "An error occurred while fetching event details.",
                type: "danger",
            })
        }
    }

    useEffect(() => {
        if (!event?.group_id) return;
        const fetchGroup = async () => {
            const response = await groupsService.getById(event.group_id.toString());
            setGroup(response);
        };
        fetchGroup();
    }, [event?.group_id]);

    const handleSendMessage = async (content: string) => {
        try {
            const response = await messagesService.createMessage(event?.id || 0, content);
        
            const messageWithSender = {
                id: response.id || Date.now(),
                sender_id: response.sender_id || user?.id || 0,
                event_id: response.event_id || event?.id || 0,
                content: response.content || content,
                created_at: response.created_at || new Date().toISOString(),
                sender: response.sender || user || { id: 0, name: 'Unknown User' }
            };
                        
            setMessages(prev => [...prev, messageWithSender]);
            
            if (event) {
                setEvent({
                    ...event,
                    messages: [...(event.messages || []), messageWithSender]
                });
            }
        } catch (error: any) {
            console.error('Error sending message:', error);
            showMessage({
                message: error.message || "An error occurred while sending the message.",
                type: "danger",
            })
        }
    }

    const handleImageUploaded = (newImage: ImageType) => {
        if (event) {
            setEvent({
                ...event,
                images: [...(event.images || []), newImage]
            });
        }
    }

    useEffect(() => {
        if (!id) return;
        getEvent(parseInt(id as string));
        setMessages(event?.messages || []);
    }, [id]);

    if (!id || !event) {
        return <Text>Loading...</Text>;
    }

    return (
        <>
        <FlashMessage position="top" />
        <View style={styles.container}>
            <View style={styles.blockHeading}>
                <View style={styles.heading}>
                    <Pressable style={styles.backBtn} onPress={() => router.back()}>
                        <Ionicons size={20} name="chevron-back-outline" color={'white'} /> 
                    </Pressable>
                    <Text style={styles.title}>Event Details</Text>
                </View>
                <View style={styles.groupHeading}>
                    <View style={styles.groupDetails}>
                        <Text style={styles.groupName}>{event.title}</Text>
                        <View style={styles.groupMetaRow}>
                            <Text style={styles.groupMetaText}>{group?.name}</Text>
                            <Text style={[styles.groupMetaText, styles.dot]}>•</Text>
                            <Text style={styles.groupMetaText}>{formatEventDate(event.start_at)}</Text>
                        </View>
                        <View style={styles.headerInfoRow}>
                            <View style={styles.categoryPill}>
                                <Text style={styles.categoryText}>{event.category?.name || 'Category'}</Text>
                            </View>
                            <Text style={styles.goingText}>{event.confirmed_attendees?.length || 0} going</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.containerBody}>
                    <EventAttendancePoll event={event} user={user!} onVoted={() => getEvent(event.id)} />
                    
                    <View style={styles.tabsWrapper}>
                        <View style={styles.tabContainer}>
                            <Pressable
                                style={[styles.tab, activeTab === TABS.Discussion && styles.activeTab]}
                                onPress={() => setActiveTab(TABS.Discussion)}>
                                    <Text style={[styles.tabText, activeTab === TABS.Discussion && styles.activeTabText]}>
                                        Discussion
                                    </Text>
                            </Pressable>
                            <Pressable
                                    style={[styles.tab, activeTab === TABS.Photos && styles.activeTab]}
                                    onPress={() => setActiveTab(TABS.Photos)}
                                >
                                    <Text style={[styles.tabText, activeTab === TABS.Photos && styles.activeTabText]}>
                                        Photos
                                    </Text>
                            </Pressable>
                            <Pressable
                                    style={[styles.tab, activeTab === TABS.Polls && styles.activeTab]}
                                    onPress={() => setActiveTab(TABS.Polls)}
                                >
                                    <Text style={[styles.tabText, activeTab === TABS.Polls && styles.activeTabText]}>
                                        Polls
                                    </Text>
                            </Pressable>
                        </View>
                        
                        <View style={styles.tabContent}>
                            {activeTab === TABS.Discussion &&
                                <EventDiscussionTab messages={event.messages || []} onSendMessage={handleSendMessage} />
                            }
                            {activeTab === TABS.Photos && 
                                <EventPhotosTab 
                                    images={event.images || []} 
                                    eventId={event.id}
                                    onImageUploaded={handleImageUploaded}
                                />
                            }
                            {activeTab === TABS.Polls &&
                                <EventPollsTab />
                            }
                        </View>
                    </View>

                    <View style={styles.aboutSection}>
                        <Text style={styles.aboutTitle}>Event Details</Text>
                        <Text style={styles.aboutText}>
                            { event.description }
                        </Text>
                        <View style={styles.locationSection}>
                            <Ionicons name="location-outline" size={20} color="#364153" />
                            <Text style={styles.aboutText}> {event.location}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    blockHeading: {
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: '#8200DB',
        height: 180,
        display: 'flex',
        padding: 15,
        gap: 20,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    backBtn: {
        padding: 5,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    },
    groupHeading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    groupIcon: {
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: 80,
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupIconText: {
        fontSize: 26,
        fontWeight: '700',
        color: 'white',
    },
    groupName: {
        fontSize: 26,
        fontWeight: '700',
        color: 'white',
    },
    groupDetails: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 10,
    },
    groupDetailsLbl: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white',
    },
    tabsWrapper: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 8,
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
        marginTop: 180,
    },
    containerBody: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#f3f4f6',
        paddingTop: 20,
    },
    tabContent: {
        width: '100%',
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#8200DB',
    },
    tabText: {
        fontSize: 16,
        color: '#6b7280',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#8200DB',
        fontWeight: '600',
    },
    aboutSection: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',  
        gap: 8,
        marginBottom: 15,
    },
    aboutTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#364153',
    },
    aboutText: {
        fontSize: 14,
        color: '#364153',
        lineHeight: 20,
    },
    locationSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    headerInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    categoryPill: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 4,
    },
    categoryText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 14,
    },
    goingText: {
        color: 'white',
        fontWeight: '400',
        fontSize: 14,
    },
    groupMetaRow: {
        display: 'flex',
        gap: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    groupMetaText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '400',
    },
    dot: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        lineHeight: 20,
    },
})