import { Group } from '@/app/types/group';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as groupsService from '@/app/services/groups.service';
import { GroupCard } from '@/components/GroupCard';
import { useRouter } from 'expo-router';

export default function GroupsScreen() {
  const [groups, setGroups] = useState<Group[]>([]);
  const router = useRouter();

  const getGroups = async () => {
    try {
      const groups = await groupsService.getAll();
      setGroups(groups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
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

          </View>
        </View>
      </ScrollView>

    </View>
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
