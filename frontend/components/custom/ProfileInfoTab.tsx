import { User } from '@/app/types/user';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ProfileInfoCard } from './ProfileInfoCard';
import { useAuthStore } from '@/app/stores/useAuthStore';

interface ProfileInfoTabProps {
    user: User;
}

export const ProfileInfoTab = ({ user } : ProfileInfoTabProps) => {
    const { signOut } = useAuthStore();
    return (
        <View style={styles.tabContent}>
            <Pressable style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
            </Pressable>

            <View style={styles.infoSection}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Contact Information</Text>
                </View>
                <View style={styles.detailsSection}>
                    <ProfileInfoCard title={'Email'} value={user.email} hasEdit={true} hasArrow={false} />
                    <ProfileInfoCard title={'Phone'} value={user.phone} hasEdit={true} hasArrow={false} />
                </View>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Preferences</Text>
                </View>
                <View style={styles.detailsSection}>
                    <ProfileInfoCard value={user.email} hasEdit={false} hasArrow={true} />
                </View>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Account</Text>
                </View>
                <View style={styles.detailsSection}>
                    <ProfileInfoCard title={'Change Password'} hasEdit={false} hasArrow={true} />
                    <ProfileInfoCard title={'Linked Accounts'} hasEdit={false} hasArrow={true} />
                </View>

            </View>

            <Pressable style={styles.logoutButton} onPress={() => useAuthStore.getState().signOut()}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    tabContent: {
        padding: 20,
        gap: 20,
    },
    editProfileButton: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#8200DB',
      },
      editProfileText: {
        fontSize: 16,
        color: '#8200DB',
        fontWeight: '400',
      },
      infoSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
      },
      titleSection: {
        backgroundColor: '#F9FAFB',
        padding: 10,
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      },
      title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
      },
      detailsSection: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        gap: 16,
      },
      logoutButton: {
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#D1D5DC',
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
      },
      logoutButtonText: {
        color: '#6A7282',
        fontWeight: '600',
        fontSize: 16,
      },
});