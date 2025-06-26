import { User } from "@/app/types/user";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MemberCard } from "./MemberCard";
import { InviteMemberModal } from "./InviteMemberModal";
import React, { useState } from "react";
import { showMessage } from "react-native-flash-message";
import * as invitesService from "@/app/services/invites.service";

interface GroupDetailMembersTabProps {
    members?: User[];
    groupId: number;
    ownerId: number;
}

export const GroupDetailMembersTab = ({ members = [], groupId, ownerId }: GroupDetailMembersTabProps) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const handleInvite = async (email: string) => {
        try {
            await invitesService.create(groupId, { email });
            showMessage({
                message: "Invitation sent successfully!",
                type: "success",
            });
        } catch (error: any) {
            showMessage({
                message: error.response?.data?.message || "Failed to send invitation.",
                type: "danger",
            });
        } finally {
            setModalVisible(false);
        }
    };

    return (
        <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Members ({members.length})</Text>
                <Pressable style={styles.inviteButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="person-add" size={20} color="#8200DB" />
                    <Text style={styles.inviteButtonText}>Invite</Text>
                </Pressable>
            </View>
            
            {members.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="people-outline" size={48} color="#d1d5db" />
                    <Text style={styles.emptyStateTitle}>No members yet</Text>
                    <Text style={styles.emptyStateText}>
                        Start by inviting friends to join your group
                    </Text>
                </View>
            ) : (
                <View style={styles.membersList}>
                    {members.map((member, index) => (
                        <MemberCard 
                            key={`${member.email}-${index}`} 
                            user={member} 
                            isOwner={member.id === ownerId} 
                        />
                    ))}
                </View>
            )}

            <InviteMemberModal 
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onInvite={handleInvite}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    tabContent: {
        padding: 16,
        backgroundColor: 'white',
        width: '100%',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    inviteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    inviteButtonText: {
        color: '#8200DB',
        fontWeight: '600',
        marginLeft: 4,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#374151',
        marginTop: 12,
        marginBottom: 4,
    },
    emptyStateText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 20,
    },
    membersList: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },
})

