import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface InviteMemberModalProps {
    isVisible: boolean;
    onClose: () => void;
    onInvite: (email: string) => void;
}

export const InviteMemberModal = ({ isVisible, onClose, onInvite }: InviteMemberModalProps) => {
    const [email, setEmail] = useState('');

    const handleInvite = () => {
        if (email) {
            onInvite(email);
            setEmail('');
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close-circle" size={24} color="#9ca3af" />
                    </Pressable>
                    <Text style={styles.modalTitle}>Invite Member</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter email address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Pressable
                        style={[styles.inviteButton, !email && styles.disabledButton]}
                        onPress={handleInvite}
                        disabled={!email}
                    >
                        <Text style={styles.inviteButtonText}>Send Invite</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    inviteButton: {
        backgroundColor: '#8200DB',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#d1d5db',
    },
    inviteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 