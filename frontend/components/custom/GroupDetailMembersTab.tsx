import { User } from "@/app/types/user";
import { View, Text, StyleSheet } from "react-native";

interface GroupDetailMembersTabProps {
    members?: User[]
}

export const GroupDetailMembersTab = ({ members } : GroupDetailMembersTabProps) => {
    return (
        <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Members (8)</Text>
            {/* Add your members list here */}
            <Text style={styles.placeholderText}>Members list coming soon...</Text>
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 16,
    },
    placeholderText: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        marginTop: 20,
    },
})

