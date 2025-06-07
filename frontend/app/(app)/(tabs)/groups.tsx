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
      <View style={styles.searchInput}>
          <Ionicons size={20} name="search-outline" color={'#99A1AF'} />
          <TextInput
            placeholder="Search groups..."
            placeholderTextColor={'#99A1AF'} 
            style={styles.searchInputText}/>
        </View>
      <ScrollView style={styles.scrollContent}>
   
        <View style={styles.groupCards}>
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </View>
        <View style={styles.invitationsSection}>
          <Text style={styles.invitationTitle}>Invitations</Text>
          <View style={styles.invitationCards}>
            {invites.length > 0 && invites.map((invite) => (
              <InviteCard key={`${invite.id}-invite`} invite={invite} />
            ))}
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
  }
});
