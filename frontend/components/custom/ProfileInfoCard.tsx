import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { View, Text, Pressable, StyleSheet } from "react-native";

interface ProfileInfoCardProps {
    title?: string;
    value?: string;
    hasEdit?: boolean;
    hasArrow?: boolean;
}

export const ProfileInfoCard = ({ title, value, hasEdit, hasArrow } : ProfileInfoCardProps) => {
    return (
        <View style={styles.infoItem}>
            <View style={styles.infoContent}>
                {title && <Text style={styles.infoTitle}>{title}</Text>}
                {value && <Text style={styles.infoValue}>{value}</Text>}
            </View>
            {hasEdit && (
                <Pressable style={styles.editButton}>
                    <SimpleLineIcons name="pencil" size={18} color="#8200DB" />
                </Pressable>
            )}
            {hasArrow && (
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
      },
      infoContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      },
      infoTitle: {
        fontSize: 14,
        fontWeight: '400',
        color: '#6B7280',
      },
      infoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937',
      },
      editButton: {
        padding: 4,
      },
})