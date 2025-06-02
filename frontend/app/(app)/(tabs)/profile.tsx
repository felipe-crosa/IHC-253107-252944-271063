import { useAuthStore } from '@/app/context/useAuth';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AlertsScreen() {
    const { user } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.blockHeading}/>
        <View style={styles.profileImage}>
            <Text style={styles.profileImageText}>JD</Text>
        </View>
        <View style={styles.userNameSection}>
            <Text style={styles.userNameLbl}>{user!.name}</Text>
            <Text style={styles.userEmailLbl}>{user!.email}</Text>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 250,
        flex: 1,
    },
    blockHeading: {
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: '#8200DB',
        height: 160,
    },
    profileImage: {
        borderRadius: '50%',
        backgroundColor: '#E9D4FF',
        width: 150,
        height: 150,
        borderWidth: 4,
        borderColor: '#FFFFFF',
        position: 'absolute',
        top: 85,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImageText: {
        fontSize: 36,
        fontWeight: '700',
        color: '#8200DB',
    },
    userNameSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
    }, 
    userNameLbl: {
        fontSize: 24,
        fontWeight: '700',
    },
    userEmailLbl: {
        fontSize: 16,
        fontWeight: '500',
        color: '#6A7282',
    }
});
