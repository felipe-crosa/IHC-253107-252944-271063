import { Group } from '@/app/types/group';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { GroupCard } from '@/components/custom/GroupCard';
import { useRouter } from 'expo-router';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import * as groupsService from '@/app/services/groups.service';
import * as invitesService from '@/app/services/invites.service';
import { Invite } from '@/app/types/invite';
import { InviteCard } from '@/components/custom/InviteCard';
import React from 'react';


export default function GroupsScreen() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [invites, setInvites] = useState<Invite[]>([]);
  const router = useRouter();

  const getGroups = async () => {
    try {
      const groups = await groupsService.getAll();
      setGroups(groups);
    } catch (error: any) {
      showMessage({
        message: error.message || "An error occurred while fetching groups.",
        type: "danger",
      });
    }
  }

  const getInvites = async () => {
    try {
      const invites = await invitesService.getAll();
      setInvites(invites);
    } catch (error: any) {
      showMessage({
        message: error.message || "An error occurred while fetching groups.",
        type: "danger",
      });
    }
  }

  const handleInviteAccepted = () => {
    getInvites();
    getGroups(); 
  };

  const handleInviteRejected = () => {
    getInvites();
  };

  useEffect(() => {
    getGroups();
    getInvites();
  }, []);

  return (
    <>
    <FlashMessage position="top" />
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>My Groups</Text>
        <Pressable style={styles.createBtn} onPress={() => router.push('/create-group')}>
          <Ionicons size={30} name="add-circle-outline" color={'white'}/>
        </Pressable>
      </View>
     
      <ScrollView style={styles.scrollContent}>
   
        <View style={styles.groupCards}>
          {groups.length > 0 ? (
            groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))
          ) : (
            <Text style={styles.emptyStateText}>You currently belong to no groups.</Text>
          )}
        </View>
        <View style={styles.invitationsSection}>
          <Text style={styles.invitationTitle}>Invitations</Text>
          <View style={styles.invitationCards}>
            {invites.length > 0 ? (
              invites.map((invite) => (
                <InviteCard key={`${invite.id}-invite`} invite={invite} onInviteAccepted={handleInviteAccepted} onInviteRejected={handleInviteRejected} />
              ))
            ) : (
              <Text style={styles.emptyStateText}>You have no invitations.</Text>
            )}
          </View>
        </View>
      </ScrollView>

    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 15,
    gap: 20,
    backgroundColor: '#F9FAFB',
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  createBtn: {
    backgroundColor: '#8200DB',
    padding: 5,
    borderRadius: 50,
  },
  scrollContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 30,
  },
  searchInput: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#D1D5DC',
    backgroundColor: 'white',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  searchInputText: {
    fontSize: 16,
    fontWeight: '400',
  },
  groupCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  invitationsSection: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  invitationTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  invitationCards: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  emptyStateIconWrapper: {
    borderRadius: 999,
    width: 88,
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#23272F',
    marginTop: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#6A7282',
    marginBottom: 8,
  },
  emptyStateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8200DB',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 8,
    gap: 8,
  },
  emptyStateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6A7282',
    marginLeft: 4,
    fontWeight: '500',
  },
});
