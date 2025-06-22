import { User } from "@/app/types/user";
import { getInitials } from "@/helpers/format-text.helper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface MemberCardProps {
    user: User;
    isOwner: boolean;
}

export const MemberCard = ({ user, isOwner }: MemberCardProps ) => (
    <View style={styles.memberCard}>
        <View style={styles.memberAvatar}>
            <Text style={styles.memberAvatarText}>{getInitials(user.name)}</Text>
        </View>
        <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{user.name}</Text>
            <Text style={styles.memberEmail}>{user.email}</Text>
        </View>
        {isOwner && (
            <View style={styles.ownerBadge}>
                <Text style={styles.ownerText}>Owner</Text>
            </View>
        )}
    </View>
);

const styles = StyleSheet.create({
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    memberAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8200DB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    memberAvatarText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    memberInfo: {
        flex: 1,
        flexDirection: 'column',
        gap: 2,
    },
    memberName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
    },
    memberEmail: {
        fontSize: 14,
        color: '#6b7280',
    },
    ownerBadge: {
        backgroundColor: '#fef3c7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    ownerText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#92400e',
    },
})