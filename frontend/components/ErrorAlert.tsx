import { Pressable, Text, View } from "react-native";
import { StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

interface ErrorAlertProps {
    message: string;
    onClose: () => void;
}

export const ErrorAlert = ({ message, onClose } : ErrorAlertProps) => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.errorMessage}>{ message }</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        padding: 15,
        backgroundColor: '#fef2f2',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        gap: 10,
    }, 
    errorMessage: {
        color: '#c10007',
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
    }
});

