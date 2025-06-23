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
import { EventDiscussionTab } from "@/app/components/custom/EventDiscussionTab";
import { EventPhotosTab } from "@/app/components/custom/EventPhotosTab";

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

export default function EventDetailsPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [event, setEvent] = useState<Event | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [activeTab, setActiveTab] = useState<Tabs>(TABS.Discussion);

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

    const handleSendMessage = async (content: string) => {
        try {
            const response = await messagesService.createMessage(event?.id || 0, content);
            setMessages(prev => [response, ...prev]);
        } catch (error: any) {
            showMessage({
                message: error.message || "An error occurred while sending the message.",
                type: "danger",
            })
        }
    }

    const handleAddPhoto = () => {
        // TODO: Implement image picker logic
        console.log("Add photo pressed");
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
                    <View style={styles.groupIcon}>
                        <Text style={styles.groupIconText}>{ getInitials(event.title) }</Text>
                    </View>
                    <View style={styles.groupDetails}>
                        <Text style={styles.groupName}>{ event.title }</Text>
                        {/* <Text style={styles.groupDetailsLbl}>Created { formatShortDate(group.created_at) }</Text> */}
                    </View>
                </View>
            </View>
            <View style={styles.containerBody}>
                <ScrollView style={styles.tabs}>
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
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {activeTab === TABS.Discussion &&
                        <EventDiscussionTab messages={event.messages || []} onSendMessage={handleSendMessage} />
                    }
                    {activeTab === TABS.Photos && 
                        <EventPhotosTab images={event.images || []} onAddPhoto={handleAddPhoto} />
                    }
                    {activeTab === TABS.Polls && <Text>Polls</Text>}
                </ScrollView>

                </ScrollView>
            

                <View style={styles.aboutSection}>
                    <Text style={styles.aboutTitle}>Event Details</Text>
                    <Text style={styles.aboutText}>
                        A group for weekend adventures and activities! We plan hikes, beach days, game nights, and more. Join us for fun weekend experiences with like-minded people.
                    </Text>
                    <View style={styles.locationSection}>
                        <Ionicons name="location-outline" size={20} color="#364153" />
                        <Text style={styles.aboutText}> {event.location}</Text>
                    </View>
                </View>

            </View>
            
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
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    groupDetailsLbl: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white',
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    containerBody: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: '#f3f4f6',
        marginTop: 190,

    },
    tabs:{
        width: '100%',
        backgroundColor: '#f3f4f6',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
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
})