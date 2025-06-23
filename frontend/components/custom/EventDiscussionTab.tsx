import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { Message } from '@/app/types/message';
import Ionicons from '@expo/vector-icons/Ionicons';
import { User } from '@/app/types/user';

interface EventDiscussionTabProps {
    messages: Message[];
    onSendMessage: (content: string) => void;
}

export const EventDiscussionTab = ({ messages, onSendMessage }: EventDiscussionTabProps) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage.trim());
            setNewMessage('');
        }
    };

    const renderMessage = ({ item }: { item: Message }) => (
        <View style={styles.messageContainer}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{(item.sender)?.name.charAt(0)}</Text>
            </View>
            <View style={styles.messageContent}>
                <Text style={styles.userName}>{(item.sender)?.name}</Text>
                <Text style={styles.messageText}>{item.content}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id.toString()}
                inverted
                style={styles.messagesList}
                contentContainerStyle={{ flexDirection: 'column-reverse' }}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                    placeholderTextColor="#9ca3af"
                />
                <Pressable onPress={handleSend} style={styles.sendButton}>
                    <Ionicons name="send" size={24} color="white" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
    messagesList: {
        paddingHorizontal: 16,
    },
    messageContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8200DB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    avatarText: {
        color: 'white',
        fontWeight: 'bold',
    },
    messageContent: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#f3f4f6',
        borderRadius: 20,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8200DB',
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 