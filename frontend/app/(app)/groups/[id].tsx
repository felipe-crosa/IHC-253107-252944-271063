import { Group } from "@/app/types/group";
import { formatShortDate, getInitials } from "@/helpers/format-text.helper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import * as groupsService from "@/app/services/groups.service";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { GroupDetailEventsTab } from "@/components/custom/GroupDetailEventsTab";
import { GroupDetailMembersTab } from "@/components/custom/GroupDetailMembersTab";
import { Event } from "@/app/types/event";
import { User } from "@/app/types/user";
import { getPastEvents, getUpcomingEvents } from "@/helpers/event-status.helper";

const TABS = {
    Events: 'Events',
    Members: 'Members',
} as const;

type Tabs = (typeof TABS)[keyof typeof TABS];

export default function GroupDetailsPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [group, setGroup] = useState<Group | null>(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [members, setMembers] = useState<User[]>([]);
    const [activeTab, setActiveTab] = useState<Tabs>(TABS.Events);

    const getGroup = async (id: string) => {
        try {
            const response = await groupsService.getById(id);
            setGroup(response);
        } catch (error: any) {
            showMessage({
                message: error.response?.data?.message || "An error occurred while fetching group details.",
                type: "danger",
            })
        }
    }

    const getEvents = async (id: string) => {
        try {
            const response = await groupsService.getEvents(id);
            setEvents(response);
        } catch (error: any) {
            showMessage({
                message: error.response?.data?.message || "An error occurred while fetching group events.",
                type: "danger",
            })
        }
    }

    const getMembers = async (id: string) => {
        try {
            const response = await groupsService.getMembers(id);
            setMembers(response);
        } catch (error: any) {
            showMessage({
                message: error.response?.data?.message || "An error occurred while fetching group members.",
                type: "danger",
            })
        }
    }

    useEffect(() => {
        if (typeof id !== 'string') {
            return;
        }
        getGroup(id);
        getEvents(id);
        getMembers(id);
    }, [id]);

    const handleLeaveGroup = async () => {
        try {
            await groupsService.leave(id as string);
            router.push('/groups');
        } catch (error: any) {
            showMessage({
                message: error.response?.data?.message || "An error occurred while leaving the group.",
                type: "danger",
            })
        }
    }

    if (!id || !group) {
        return <Text>Loading...</Text>;
    }

    return (
        <>
        <FlashMessage position="top" />
        <View style={styles.container}>
            <View style={styles.blockHeading}>
                <View style={styles.heading}>
                    <Pressable style={styles.backBtn} onPress={() => router.push('/groups')}>
                        <Ionicons size={20} name="chevron-back-outline" color={'white'} /> 
                    </Pressable>
                    <Text style={styles.title}>Group Details</Text>
                </View>
                <View style={styles.groupHeading}>
                    <View style={styles.groupIcon}>
                        <Text style={styles.groupIconText}>{ getInitials(group.name) }</Text>
                    </View>
                    <View style={styles.groupDetails}>
                        <Text style={styles.groupName}>{ group.name }</Text>
                        <Text style={styles.groupDetailsLbl}>Created { formatShortDate(group.created_at || '') }</Text>
                    </View>
                </View>
            </View>
            <View style={styles.containerBody}>
                <ScrollView style={styles.tabs}>
                    <View style={styles.tabContainer}>
                        <Pressable
                            style={[styles.tab, activeTab === TABS.Events && styles.activeTab]}
                            onPress={() => setActiveTab(TABS.Events)}>
                                <Text style={[styles.tabText, activeTab === TABS.Events && styles.activeTabText]}>
                                    Events
                                </Text>
                        </Pressable>
                        <Pressable
                                style={[styles.tab, activeTab === TABS.Members && styles.activeTab]}
                                onPress={() => setActiveTab(TABS.Members)}
                            >
                                <Text style={[styles.tabText, activeTab === TABS.Members && styles.activeTabText]}>
                                    Members
                                </Text>
                        </Pressable>
                    </View>
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {activeTab === TABS.Events ? 
                        <GroupDetailEventsTab pastEvents={getPastEvents(events)} upcomingEvents={getUpcomingEvents(events)} /> : 
                        <GroupDetailMembersTab members={members} groupId={group.id} ownerId={group.owner_id} />}
                </ScrollView>

                </ScrollView>
            

                <View style={styles.aboutSection}>
                    <Text style={styles.aboutTitle}>About this group</Text>
                    <Text style={styles.aboutText}>
                        A group for weekend adventures and activities! We plan hikes, beach days, game nights, and more. Join us for fun weekend experiences with like-minded people.
                    </Text>
                    <Pressable style={styles.leaveButton} onPress={handleLeaveGroup}>
                        <Ionicons name="exit-outline" size={20} color="#666" />
                        <Text style={styles.leaveButtonText}>Leave Group</Text>
                    </Pressable>
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
        gap: 6,    
    },
    aboutTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    aboutText: {
        fontSize: 14,
        color: '#6b7280',
        lineHeight: 20,
    },
    leaveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        backgroundColor: 'white',
        width: '100%',
    },
    leaveButtonText: {
        color: '#6b7280',
        fontWeight: '500',
        marginLeft: 8,
    },
})