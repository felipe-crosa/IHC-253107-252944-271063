import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEventDetailStore } from "@/app/stores/useEventDetailStore";
import { useEffect, useState, useCallback } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Event } from "@/app/types/event";
import * as eventsService from '@/app/services/events.service';
import * as pollsService from '@/app/services/polls.service';
import { Poll } from "@/app/types/poll";
import { PollCard } from "@/components/custom/PollCard";

export const EventPollsTab = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { event, setEvent } = useEventDetailStore();
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchEvent = useCallback(async () => {
        try {
            const eventData = await eventsService.getById(Number(id));
            setEvent(eventData as Event);
        } catch (error) {
            console.error("Failed to fetch event details:", error);
        } finally {
            setIsLoading(false);
        }
    }, [id, setEvent]);

    useEffect(() => {
        fetchEvent();
    }, [fetchEvent]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchEvent();
        setRefreshing(false);
    }, [fetchEvent]);

    const handleVote = async (pollId: number, optionId: number) => {
        try {
            await pollsService.voteInPoll(pollId, optionId);
            await onRefresh();
        } catch (error) {
            console.error("Failed to cast vote", error);
        }
    };


    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#8200DB" />
            </View>
        );
    }

    if (!event) {
        return (
            <View style={styles.centered}>
                <Text>Event not found.</Text>
            </View>
        );
    }

    const activePolls = event.polls?.filter((p: Poll) => p.is_active);

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {activePolls && activePolls.map((poll: Poll) => (
                <PollCard key={poll.id} poll={poll} onVote={handleVote} />
            ))}

            <View style={styles.noPollsContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons name="stats-chart" size={48} color="#8200DB" />
                </View>
                <Text style={styles.noPollsTitle}>No more active polls</Text>
                <Text style={styles.noPollsSubtitle}>Create a poll to gather opinions</Text>
                <Pressable style={styles.createPollButton} onPress={() => router.push(`/create-poll?eventId=${id}`)}>
                    <Ionicons name="add" size={24} color="white" />
                    <Text style={styles.createPollButtonText}>Create Poll</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    noPollsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E9D4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    noPollsTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1f2937',
        textAlign: 'center',
    },
    noPollsSubtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 8,
        textAlign: 'center',
        marginBottom: 24,
    },
    createPollButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8200DB',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
    },
    createPollButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    }
}); 