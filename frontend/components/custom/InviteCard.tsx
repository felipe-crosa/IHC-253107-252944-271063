import { Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getInitials } from "@/helpers/format-text.helper";
import { Invite } from "@/app/types/invite";

interface InviteCardProps {
    invite: Invite;
}

export const InviteCard = ({ invite } : InviteCardProps) => {
      
    return (
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
                        <Text style={styles.iconText}>{getInitials(invite.group.name)}</Text>
                    </LinearGradient>
                    <View style={styles.groupDetails}>
                        <Text style={styles.title}>{invite.group.name}</Text>
                        <Text style={styles.details}>Details</Text>
                    </View>
                </View>  
        </View>
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

})