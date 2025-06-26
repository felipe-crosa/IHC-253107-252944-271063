import { View, Text, StyleSheet } from "react-native";

interface ProfileInfoCardProps {
    title?: string;
    value?: string;
}

export const ProfileInfoCard = ({ title, value } : ProfileInfoCardProps) => {
    return (
        <View style={styles.infoItem}>
            <View style={styles.infoContent}>
                {title && <Text style={styles.infoTitle}>{title}</Text>}
                {value && <Text style={styles.infoValue}>{value}</Text>}
            </View>
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