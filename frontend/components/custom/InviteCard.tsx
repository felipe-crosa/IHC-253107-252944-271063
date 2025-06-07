import { Text, StyleSheet, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getInitials } from "@/helpers/format-text.helper";
import { Invite } from "@/app/types/invite";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as invitesService from "@/app/services/invites.service";
import FlashMessage, { showMessage } from "react-native-flash-message";

interface InviteCardProps {
    invite: Invite;
}

export const InviteCard = ({ invite } : InviteCardProps) => {
    const handleAcceptInvite = async (inviteId: number) => {
        try {
            await invitesService.accept(inviteId);
            showMessage({
                message: "Invite accepted successfully.",
                type: "success",
            });

        } catch (error: any) {
            showMessage({
                message: error.message || "An error occurred while accepting the invite.",
                type: "danger",
            });
        }
    };

    const handleRejectInvite = async (inviteId: number) => {
        try {
            await invitesService.reject(inviteId);
            showMessage({
                message: "Invite rejected successfully.",
                type: "success",
            });

        } catch (error: any) {
            showMessage({
                message: error.message || "An error occurred while rejecting the invite.",
                type: "danger",
            });
        }
    };
      
    return (
        <>
        <FlashMessage position="top" />
        <View
            style={styles.container}
                  >
                <View style={styles.groupInfo}>
                    <LinearGradient
                        colors={['#FF8904', '#F54900']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.groupIcon}
                    >
                        <Text style={styles.iconText}>{getInitials(invite.name)}</Text>
                    </LinearGradient>
                    <View style={styles.groupDetails}>
                        <Text style={styles.title}>{invite.name}</Text>
                        <Text style={styles.details}>Details</Text>
                    </View>
                </View>
                <View style={styles.actions}>
                    <Pressable style={styles.rejectBtn} onPress={() => handleAcceptInvite(invite.id)}>
                        <Ionicons name="close-outline" color={'#6A7282'} size={28} />                    
                    </Pressable>
                    <Pressable style={styles.acceptBtn} onPress={() => handleRejectInvite(invite.id)}>
                        <Ionicons name="checkmark-outline" color={'#8200DB'} size={28}/>                    
                    </Pressable>
                </View>  
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5, 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#979797',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    groupIcon: {
        borderRadius: '50%',
        backgroundColor: '#E9D4FF',
        width: 62,
        height: 62,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    },
    groupInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        gap: 10,
    },
    title: {
        fontWeight: '600',
        color: 'black',
        fontSize: 20,
    },
    groupDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    details: {
        fontSize: 14,
        color: '#6A7282',
        fontWeight: '400',
    },
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

})