import { Pressable, StyleSheet, Text, View } from "react-native";
import { Poll } from "@/app/types/poll";
import { User } from "@/app/types/user";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Option } from "@/app/types/option";
import React from 'react';

export interface PollCardProps {
    poll: Poll;
    onVote: (pollId: number, optionIds: number) => void;
}

export const PollCard: React.FC<PollCardProps> = ({ poll, onVote }) => {
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);

    function handleSelect(optionId: number) {
        if (poll.multiple_choice) {
            setSelectedOptions(prev =>
                prev.includes(optionId)
                    ? prev.filter(id => id !== optionId)
                    : [...prev, optionId]
            );
        } else {
            setSelectedOptions([optionId]);
        }
    }

    const handleVote = async () => {
        if (selectedOptions.length === 0) return;
        setIsSubmitting(true);
        try {
            if (poll.multiple_choice) {
                // For each selected option, call onVote separately
                for (const optionId of selectedOptions) {
                    await onVote(poll.id, optionId);
                }
            } else {
                await onVote(poll.id, selectedOptions[0]);
            }
            setHasVoted(true);
        } catch (error) {
            console.error("Failed to vote:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalVotes = poll.options.reduce((sum: number, option: Option) => sum + option.votes_count, 0);
    const userHasVoted = poll.options.some((o: Option) => o.voted) || hasVoted;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.question}>{poll.question}</Text>
                <Text style={styles.closesText}>Closes in 2 hours</Text>
            </View>
            <Text style={styles.meta}>
                Created by {(poll.user as User)?.name || 'Someone'} • {totalVotes} votes
            </Text>

            <View style={styles.optionsContainer}>
                {userHasVoted ? (
                    // Results view
                    poll.options.map((option: Option) => {
                        const votePercentage = totalVotes > 0 ? (option.votes_count / totalVotes) * 100 : 0;
                        const isUserVote = option.voted;

                        return (
                            <View key={option.id} style={styles.optionResult}>
                                <View style={styles.optionInfo}>
                                    <Text style={styles.optionText}>{option.name}</Text>
                                    <Text style={styles.votesText}>{option.votes_count} votes</Text>
                                </View>
                                <View style={styles.progressBarBackground}>
                                    <View style={[styles.progressBar, { width: `${votePercentage}%`, backgroundColor: isUserVote ? '#8200DB' : '#d1d5db' }]} />
                                </View>
                                {isUserVote && <Text style={styles.youVotedText}>You voted: {option.name}</Text>}
                            </View>
                        );
                    })
                ) : (
                    // Voting view
                    <>
                        {poll.options.map((option: Option) => {
                            const isSelected = selectedOptions.includes(option.id);
                            return (
                                <Pressable
                                    key={option.id}
                                    style={[styles.optionButton, isSelected && styles.selectedOption]}
                                    onPress={() => handleSelect(option.id)}
                                    disabled={isSubmitting || hasVoted}
                                >
                                    <Ionicons
                                        name={
                                            poll.multiple_choice
                                                ? isSelected
                                                    ? 'checkbox'
                                                    : 'square-outline'
                                                : isSelected
                                                    ? 'radio-button-on'
                                                    : 'radio-button-off'
                                        }
                                        size={24}
                                        color={isSelected ? '#8200DB' : '#6b7280'}
                                    />
                                    <Text style={styles.optionButtonText}>{option.name}</Text>
                                </Pressable>
                            );
                        })}
                        <Pressable
                            style={[styles.voteButton, selectedOptions.length === 0 && styles.disabledButton]}
                            onPress={handleVote}
                            disabled={selectedOptions.length === 0 || isSubmitting || hasVoted}
                        >
                            <Text style={styles.voteButtonText}>{isSubmitting ? 'Voting...' : 'Vote'}</Text>
                        </Pressable>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        margin: 16,
        marginVertical: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    question: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        flex: 1,
    },
    closesText: {
        fontSize: 12,
        color: '#6b7280',
    },
    meta: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 16,
    },
    optionsContainer: {
        marginTop: 8,
    },
    optionResult: {
        marginBottom: 16,
    },
    optionInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    optionText: {
        fontSize: 16,
        color: '#1f2937',
    },
    votesText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1f2937',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: 8,
        borderRadius: 4,
    },
    youVotedText: {
        marginTop: 4,
        fontSize: 12,
        color: '#8200DB',
        fontWeight: '500',
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        marginBottom: 8,
    },
    selectedOption: {
        borderColor: '#8200DB',
        backgroundColor: '#f5f3ff',
    },
    optionButtonText: {
        fontSize: 16,
        color: '#1f2937',
        marginLeft: 12,
    },
    voteButton: {
        backgroundColor: '#8200DB',
        padding: 16,
        borderRadius: 24,
        alignItems: 'center',
        marginTop: 8,
    },
    voteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    disabledButton: {
        backgroundColor: '#d1d5db',
    }
}); 