import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, View, StyleSheet } from "react-native";

interface ActionButtonsProps {
    handleAccept: () => void;
    handleReject: () => void;
}

export const ActionButtons = ( { handleAccept, handleReject } : ActionButtonsProps) => {
    return (
        <View style={styles.actions}>
            <Pressable style={styles.rejectBtn} onPress={handleReject}>
                <Ionicons name="close-outline" color={'#6A7282'} size={26} />                    
            </Pressable>
            <Pressable style={styles.acceptBtn} onPress={handleAccept}>
                <Ionicons name="checkmark-outline" color={'#8200DB'} size={26}/>                    
            </Pressable>
        </View>  
    )
}

const styles = StyleSheet.create({
    actions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    acceptBtn: {
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#F3E8FF',
    }, 
    rejectBtn: {
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: '#F3F4F6',
    }
});