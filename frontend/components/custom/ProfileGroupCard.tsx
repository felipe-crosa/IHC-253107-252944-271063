import { Group } from "@/app/types/group";
import { getInitials } from "@/helpers/format-text.helper";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ProfileGroupCardProps {
    group: Group;
    onPress?: () => void;
}

export const ProfileGroupCard = ({ group, onPress }: ProfileGroupCardProps) => {
    const memberCount = group.members?.length || 0;
    const visibleAvatars = 3;
    const remainingMembers = memberCount - visibleAvatars;

    const CardContent = (
        <View style={styles.groupCard}>
            <View style={styles.groupDetails}>
                <LinearGradient
                    colors={['#C27AFF', '#9810FA']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.groupIcon}>
                        <Text style={styles.groupIconText}>{getInitials(group.name)}</Text>
                </LinearGradient>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.groupMembers}>{memberCount} members</Text>
            </View>
            
            
            <View style={styles.memberAvatars}>
                {Array.from({ length: visibleAvatars }).map((_, index) => (
                    <View key={`member-avatar-${group.id}-${index}`} style={styles.memberAvatar} />
                ))}
                {remainingMembers > 0 && (
                    <View style={styles.remainingMembersIndicator}>
                        <Text style={styles.remainingMembersText}>+{remainingMembers}</Text>
                    </View>
                )}
            </View>
        </View>
    );

    return CardContent;
};

const styles = StyleSheet.create({
    groupCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 12,
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        padding: 16,
        maxWidth: 140,
        height: 170,
    },
    groupIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#8B5CF6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupIconText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    groupDetails: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 6,
        
    },
    groupName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        lineHeight: 20,
    },
    groupMembers: {
        fontSize: 12,
        color: '#6B7280',
    },
    memberAvatars: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    memberAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E5E7EB',
    },
    remainingMembersIndicator: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    remainingMembersText: {
        fontSize: 10,
        color: '#6B7280',
        fontWeight: '500',
    },
});