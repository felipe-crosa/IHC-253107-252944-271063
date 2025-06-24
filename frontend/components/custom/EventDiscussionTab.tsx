import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { Message } from '@/app/types/message';
import Ionicons from '@expo/vector-icons/Ionicons';
import { User } from '@/app/types/user';
import { useAuthStore } from '@/app/stores/useAuthStore';

interface EventDiscussionTabProps {
    messages: Message[];
    onSendMessage: (content: string) => void;
}

export const EventDiscussionTab = ({ messages, onSendMessage }: EventDiscussionTabProps) => {
    const [newMessage, setNewMessage] = useState('');
    const { user } = useAuthStore();

    const handleSend = () => {
        if (newMessage.trim()) {
            onSendMessage(newMessage.trim());
            setNewMessage('');
        }
    };

    const renderMessage = ({ item }: { item: Message }) => {
        if (!item || !item.sender) {
            console.warn('Invalid message or sender:', item);
            return null;
        }
        
        if (!user) {
            console.warn('No user available for message comparison');
            return null;
        }
        
        const isMyMessage = item.sender?.id === user?.id;
        const senderName = item.sender?.name || 'Unknown User';
        const senderInitial = senderName.charAt(0) || '?';

        return (
            <View style={[styles.messageRow, isMyMessage ? styles.myMessageRow : styles.otherMessageRow]}>
                {!isMyMessage && (
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{senderInitial}</Text>
                    </View>
                )}
                <View style={[styles.messageContainer, isMyMessage ? styles.myMessageContainer : styles.otherMessageContainer]}>
                    {!isMyMessage && <Text style={styles.userName}>{senderName}</Text>}
                    <Text style={styles.messageText}>{item.content}</Text>
                    <Text style={styles.messageTime}>{new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
                {isMyMessage && (
                     <View style={[styles.avatar, styles.myAvatar]}>
                        <Text style={styles.myAvatarText}>Me</Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
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
                    <Ionicons name="paper-plane-outline" size={20} color="white" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    messagesList: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    messageRow: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'flex-end',
    },
    myMessageRow: {
        justifyContent: 'flex-end',
    },
    otherMessageRow: {
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myAvatar: {
        backgroundColor: '#F3E8FF',
        marginLeft: 8,
    },
    avatarText: {
        color: '#4b5563',
        fontWeight: 'bold',
    },
    myAvatarText: {
        color: '#8200DB',
    },
    messageContainer: {
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 12,
        maxWidth: '75%',
    },
    myMessageContainer: {
        backgroundColor: '#F3E8FF',
    },
    otherMessageContainer: {
        backgroundColor: '#f3f4f6',
        marginLeft: 10,
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#1f2937',
    },
    messageText: {
        fontSize: 16,
        color: '#1f2937',
    },
    messageTime: {
        fontSize: 10,
        color: '#6b7280',
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
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