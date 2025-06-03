import { Group } from "@/app/types/group";
import { formatShortDate, getInitials } from "@/helpers/format-text.helper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import * as groupsService from "@/app/services/groups.service";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function GroupDetailsPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [group, setGroup] = useState<Group | null>(null);

    const getGroup = async (id: string) => {
        try {
            const response = await groupsService.getById(id);

            setGroup(response);
        } catch (error: any) {
            showMessage({
                message: error.message || "An error occurred while fetching group details.",
                type: "danger",
            })
        }
    }

    useEffect(() => {
        getGroup(id as string);
    }, [id]);

    if (!id || !group) {
        return <Text>Loading...</Text>;
    }

    return (
        <>
        <FlashMessage position="top" />
        <View style={styles.container}>
            <View style={styles.blockHeading}>
                <View style={styles.heading}>
                    <Pressable style={styles.backBtn} onPress={() => router.push('/groups')}>
                        <Ionicons size={20} name="chevron-back-outline" color={'white'} /> 
                    </Pressable>
                    <Text style={styles.title}>Group Details</Text>
                </View>
                <View style={styles.groupHeading}>
                    <View style={styles.groupIcon}>
                        <Text style={styles.groupIconText}>{ getInitials(group.name) }</Text>
                    </View>
                    <View style={styles.groupDetails}>
                        <Text style={styles.groupName}>{ group.name }</Text>
                        <Text style={styles.groupDetailsLbl}>Created { formatShortDate(group.created_at) }</Text>
                    </View>

                </View>
            </View>
        </View>
        </>
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
        height: 180,
        display: 'flex',
        padding: 15,
        gap: 20,
        justifyContent: 'center',
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },
    backBtn: {
        padding: 5,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
    },
    groupHeading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    groupIcon: {
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: 80,
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    groupIconText: {
        fontSize: 26,
        fontWeight: '700',
        color: 'white',
    },
    groupName: {
        fontSize: 26,
        fontWeight: '700',
        color: 'white',
    },
    groupDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    groupDetailsLbl: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white',
    }

})