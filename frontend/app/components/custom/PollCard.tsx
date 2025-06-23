import { View, Text, StyleSheet, Pressable } from "react-native";
import { Poll } from "@/app/types/poll";
import { useMemo } from "react";

interface PollCardProps {
    poll: Poll;
    onVote: (pollId: number, optionId: number) => void;
}

export const PollCard = ({ poll, onVote }: PollCardProps) => {
    const totalVotes = useMemo(() => {
        return poll.options.reduce((sum, option) => sum + option.votes_count, 0);
    }, [poll.options]);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.question}>{poll.question}</Text>
                {poll.duration && <Text style={styles.meta}>Closes in {poll.duration} hours</Text>}
            </View>
            <Text style={styles.meta}>
                {totalVotes} votes
            </Text>

            <View style={styles.optionsContainer}>
                {poll.options.map((option) => {
                    const voteCount = option.votes_count;
                    const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;
                    const isUserVotedFor = option.voted;

                    return (
                        <Pressable key={option.id} style={styles.optionWrapper} onPress={() => onVote(poll.id, option.id)}>
                            <View style={styles.optionHeader}>
                                <Text style={[styles.optionText, isUserVotedFor && styles.votedOptionText]}>{option.name}</Text>
                                <Text style={styles.voteCount}>{voteCount} votes</Text>
                            </View>
                            <View style={styles.progressBarBackground}>
                                <View style={[styles.progressBar, { width: `${percentage}%` }]} />
                            </View>
                            {isUserVotedFor && (
                                <Text style={styles.yourVote}>You voted: {option.name}</Text>
                            )}
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    question: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
        flex: 1,
    },
    meta: {
        fontSize: 12,
        color: '#6b7280',
    },
    optionsContainer: {
        marginTop: 16,
        gap: 12,
    },
    optionWrapper: {
        gap: 8,
    },
    optionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 14,
        color: '#374151',
    },
    votedOptionText: {
        fontWeight: '600',
        color: '#8200DB',
    },
    voteCount: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: '500',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#8200DB',
        borderRadius: 4,
    },
    yourVote: {
        fontSize: 12,
        color: '#8200DB',
        fontWeight: '500',
        marginTop: 4,
    },
}); 