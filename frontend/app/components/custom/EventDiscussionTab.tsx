import { getInitials } from "@/helpers/format-text.helper";
import { View, Text, StyleSheet, FlatList, TextInput, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMemo } from "react";
import { useAuthStore } from "@/app/stores/useAuthStore";
import { Message } from "@/app/types/message";

interface EventDiscussionTabProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
}

export const EventDiscussionTab = ({ messages, onSendMessage }: EventDiscussionTabProps) => {
    const { user } = useAuthStore();
    const reversedMessages = useMemo(() => [...messages].reverse(), [messages]);

    const MessageBubble = ({ message }: { message: Message }) => {
        const isMe = message.sender.email === user?.email;
        return (
            <View style={[styles.messageContainer, isMe ? styles.myMessageContainer : styles.theirMessageContainer]}>
                {!isMe && (
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{getInitials(message.sender.name)}</Text>
                    </View>
                )}
                <View style={[styles.messageBubble, isMe ? styles.myMessageBubble : styles.theirMessageBubble]}>
                    <Text style={isMe ? styles.myMessageText : styles.theirMessageText}>{message.content}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={reversedMessages}
                renderItem={({ item }) => <MessageBubble message={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.messageList}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#9ca3af"
                />
                <Pressable style={styles.sendButton} onPress={() => onSendMessage("Hello")}>
                    <Ionicons name="send" size={20} color="white" />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    messageList: {
        padding: 16,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 12,
        maxWidth: '80%',
    },
    myMessageContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row-reverse',
    },
    theirMessageContainer: {
        alignSelf: 'flex-start',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#e5e7eb',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    avatarText: {
        color: '#4b5563',
        fontWeight: '600',
    },
    messageBubble: {
        padding: 12,
        borderRadius: 16,
    },
    myMessageBubble: {
        backgroundColor: '#8200DB',
        borderBottomRightRadius: 0,
    },
    theirMessageBubble: {
        backgroundColor: '#f3f4f6',
        borderBottomLeftRadius: 0,
    },
    myMessageText: {
        color: 'white',
    },
    theirMessageText: {
        color: '#1f2937',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#f3f4f6',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginRight: 8,
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