import { User } from "@/app/types/user";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { getInitials } from "@/helpers/format-text.helper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MemberCard } from "./MemberCard";

interface GroupDetailMembersTabProps {
    members?: User[]
}

export const GroupDetailMembersTab = ({ members = [] } : GroupDetailMembersTabProps) => {
    const isOwner = (user: User) => {
        // For now, show the first user as owner
        return members.indexOf(user) === 0;
    };

    return (
        <View style={styles.tabContent}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Members ({members.length})</Text>
                <Pressable style={styles.inviteButton}>
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
                            isOwner={isOwner(member)} 
                        />
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    tabContent: {
        padding: 16,
        backgroundColor: 'white',
        width: '100%',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
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

