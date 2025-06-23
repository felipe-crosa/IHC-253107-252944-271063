import { useAuthStore } from '@/app/stores/useAuthStore';
import { Group } from '@/app/types/group';
import { ProfileEventsTab } from '@/components/custom/ProfileEventsTab';
import { ProfileGroupsTab } from '@/components/custom/ProfileGroupsTab';
import { ProfileInfoTab } from '@/components/custom/ProfileInfoTab';
import { UserStats } from '@/components/custom/UserStats';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { getInitials } from '@/helpers/format-text.helper';
import * as groupsService from '@/app/services/groups.service';
import * as eventsService from '@/app/services/events.service';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { Event } from '@/app/types/event';
import { ProfilePhotosTab } from '@/components/custom/ProfilePhotosTab';

const TABS = {
    EVENTS: 'Events',
    GROUPS: 'Groups',
    INFO: 'Info',
} as const;

type TabType = (typeof TABS)[keyof typeof TABS];

export default function ProfileScreen() {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState<TabType>(TABS.EVENTS);
    const [groups, setGroups] = useState<Group[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const photos = events.flatMap(event => event.images || []);

    const getGroups = async () => {
        setIsLoading(true);
        try {
            const response = await groupsService.getAll();
            setGroups(response);
        } catch (error) {
            showMessage({
                message: 'Error fetching groups',
                type: 'danger',
            });
        } finally {
            setIsLoading(false);
        }
    }

    const getEvents = async () => {
        setIsLoading(true);
        try {
            const response = await eventsService.getAll();
            setEvents(response);
        } catch (error) {
            showMessage({
                message: 'Error fetching events',
                type: 'danger',
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getGroups();
        getEvents();
    }, []);

    if (isLoading || !user) {
        return (
            <View style={[styles.container, styles.centered]}>
                <ActivityIndicator size="large" color="#8200DB" />
            </View>
        );
    }

    return (
        <>
        <FlashMessage position="top" />
        <View style={styles.container}>
            <View style={styles.blockHeading}/>
            <View style={styles.profileImage}>
                <Text style={styles.profileImageText}>{getInitials(user.name)}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.userNameSection}>
                    <Text style={styles.userNameLbl}>{user.name}</Text>
                    <Text style={styles.userEmailLbl}>{user.email}</Text>
                </View>
                <UserStats
                    eventsCount={events.length || 0}
                    groupsCount={groups.length || 0}
                    photosCount={87}
                />
                <ScrollView style={styles.tabContainer}>
                    <View style={styles.tabHeadings}>
                        {Object.values(TABS).map((tab) => (
                            <Pressable
                                key={tab}
                                style={[styles.tab, activeTab === tab && styles.activeTab]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                    {tab}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                    <ScrollView style={styles.scrollView} >
                        {activeTab === TABS.EVENTS && <ProfilePhotosTab photos={photos || []}/>}
                        {activeTab === TABS.GROUPS && <ProfileGroupsTab groups={groups || []} />}
                        {activeTab === TABS.INFO && <ProfileInfoTab user={user} />}
                    </ScrollView>  
                </ScrollView>
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
        paddingTop: 250,
        flex: 1,
    },
    centered: {
        paddingTop: 0,
        justifyContent: 'center',
    },
    blockHeading: {
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: '#8200DB',
        height: 160,
    },
    profileImage: {
        borderRadius: '50%',
        backgroundColor: '#E9D4FF',
        width: 150,
        height: 150,
        borderWidth: 4,
        borderColor: '#FFFFFF',
        position: 'absolute',
        top: 85,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#8200DB',
    },
    userNameSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
    }, 
    userNameLbl: {
        fontSize: 24,
        fontWeight: '700',
    },
    userEmailLbl: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6A7282',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: '100%',
        paddingHorizontal: 20,
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    tabHeadings: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
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
        color: '#6B7280',
        fontWeight: '500',
      },
      activeTabText: {
        color: '#8200DB',
        fontWeight: '600',
      },
      scrollView: {
        flex: 1,
        display: 'flex',
      },
      tabContent: {
        padding: 20,
      },
      logoutButton: {
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#D1D5DC',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 32,
      },
      logoutButtonText: {
        color: '#6A7282',
        fontWeight: '600',
        fontSize: 16,
      },
});
