import { Group } from '@/app/types/group';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ProfileGroupCard } from './ProfileGroupCard';

interface ProfileGroupsTabProps {
    groups: Group[]; 
}

export const ProfileGroupsTab = ({ groups } : ProfileGroupsTabProps) => {
    return (
        <View style={styles.tabContent}>
            {!groups || groups.length === 0 && (
                <Text style={styles.noGroupsText}>
                    You haven't joined any groups yet.
                </Text>)}
            {groups && groups.length > 0 && 
                <View style={styles.groupList}>
                    {groups.map((group) => {
                        return <ProfileGroupCard group={group}/>
                    })}
                </View>}
            <Pressable style={styles.createGroupButton}>
                <Ionicons name="add" size={20} color="#8200DB" />
                <Text style={styles.createGroupText}>Create New Group</Text>
            </Pressable>
      </View>
    );
}

const styles = StyleSheet.create({
    tabContent: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
      createGroupButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#8200DB',
        gap: 8,
      },
      createGroupText: {
        fontSize: 16,
        color: '#8200DB',
        fontWeight: '400',
      },
      noGroupsText: { 
        textAlign: 'center', 
        color: '#6B7280', 
        fontSize: 16, 
        marginTop: 20 
    },
    groupList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10,
    }
});