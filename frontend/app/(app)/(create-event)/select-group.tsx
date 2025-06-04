import { CreateEventFormData } from '@/app/types/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { createEventSchema } from '@/app/schemas/create-event.schema';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Group } from '../../types/group';
import { useEffect, useState } from 'react';
import * as groupsService from '../../services/groups.service';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { GroupCard } from '@/components/custom/GroupCard';

export default function SelectGroupScreen() {
    const router = useRouter();
    const [groups, setGroups] = useState<Group[]>([]);

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

    useEffect(() => {
        getGroups();
    }, []);

    const {
            control,
            handleSubmit,
            formState: { errors },
        } = useForm<CreateEventFormData>({
            resolver: zodResolver(createEventSchema),
            defaultValues: {
                title: '',
                description: '',
                start_at: new Date(),
                location: '',
                group_id: 0,
                category_id: 0,
            }
        });
        
  return (
    <>
    <FlashMessage position="top" />
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.heading}>
                    <Pressable onPress={() => router.push('/create-event')} style={styles.backButton}>
                        <Ionicons size={20} name="chevron-back-outline" color={'black'} />
                    </Pressable>
                    <Text style={styles.title}>Select Group</Text>
            </View>
             <View style={styles.stages}>
                <View style={styles.stage} />
                <View style={styles.currentStage} />
                <View style={styles.stage} />
            </View>
        </View>
       
        <View style={styles.searchInput}>
          <Ionicons size={20} name="search-outline" color={'#99A1AF'} />
          <TextInput
            placeholder="Search groups..."
            placeholderTextColor={'#99A1AF'} 
            style={styles.searchInputText}/>
        </View>
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.groups}>
                    {groups.map((group) => (
                        <GroupCard key={group.id} group={group} />))}
                </View>
            </View>
            <Pressable onPress={() => router.push('/create-event')} style={styles.button}>
                <Text style={styles.buttonText}>+ Create New Group</Text>
            </Pressable>
             <View style={styles.actions}>
                <Pressable
                    onPress={() => router.push('/groups')}
                    style={styles.cancelBtn}>
                    <Text style={styles.cancelLbl}>Cancel</Text>
                </Pressable>
                <Pressable
                    onPress={() => router.push('/preview-event')}
                    style={styles.submitBtn} >
                    <Text style={styles.createLbl}>Next: Preview</Text>
                </Pressable>
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
        padding: 15,
        width: '100%',
        height: '100%',
        gap: 25,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
    },
    backButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#F3F4F6',
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
    stages: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    stage: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: '#D9D9D9',
    }, 
    currentStage: {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: '#8200DB',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 20,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
      fieldError: {
        color: 'red',
        fontSize: 12,
        width: '100%',
      },
      button: {
        marginTop: 20, 
        borderColor: '#8200DB',
        borderWidth: 1,
        padding: 12,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: '#8200DB',
        fontSize: 16,
        fontWeight: '500',
      },
      groups: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
      },
      actions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
      },
      cancelBtn: {
        backgroundColor: 'white',
        width: '45%',
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D1D5DC',
        alignItems: 'center',
      }, 
      cancelLbl: {
        color: '#364153',
        fontWeight: '600',
        fontSize: 16,
      },
      submitBtn: {
        backgroundColor: '#8200DB',
        width: '50%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      createLbl: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
      }

});
