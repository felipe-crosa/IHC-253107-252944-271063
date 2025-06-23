import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PollCard } from "./PollCard";
import { Poll } from "@/app/types/poll";

interface EventPollsTabProps {
    polls: Poll[];
    onVote: (pollId: number, optionId: number) => void;
    onCreatePoll: () => void;
}

export const EventPollsTab = ({ polls, onVote, onCreatePoll }: EventPollsTabProps) => {
    return (
        <ScrollView style={styles.container}>
            {polls.map((poll) => (
                <PollCard key={poll.id} poll={poll} onVote={onVote} />
            ))}

            <View style={styles.emptyContainer}>
                <View style={styles.emptyIcon}>
                    <Ionicons name="stats-chart" size={24} color="#8200DB" />
                </View>
                <Text style={styles.emptyTitle}>No more active polls</Text>
                <Text style={styles.emptyText}>
                    Create a poll to gather opinions
                </Text>
                <Pressable style={styles.createButton} onPress={onCreatePoll}>
                    <Ionicons name="add" size={20} color="white" />
                    <Text style={styles.createButtonText}>Create Poll</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 24,
        gap: 12,
    },
    emptyIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f3e8ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        marginTop: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
    },
    createButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8200DB',
        borderRadius: 24,
        paddingVertical: 12,
        paddingHorizontal: 24,
        marginTop: 8,
    },
    createButtonText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 8,
        fontSize: 16,
    },
}); 