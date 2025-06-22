import { CreateEventStep2Data } from '@/app/types/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { createEventStep2Schema } from '@/app/schemas/create-event.schema';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Group } from '../../types/group';
import { useEffect, useState } from 'react';
import * as groupsService from '../../services/groups.service';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useEventStore } from '@/app/stores/useEventStore';
import { GroupSelect } from '@/components/custom/GroupSelect';

export default function SelectGroupScreen() {
    const router = useRouter();
    const [groups, setGroups] = useState<Group[]>([]);
    const { updateEventData, nextStep, prevStep, eventData } = useEventStore();

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
        } = useForm<CreateEventStep2Data>({
            resolver: zodResolver(createEventStep2Schema),
            defaultValues: { group_id: eventData.group_id }
        });
    
    const handleGoBack = () => {
        updateEventData({ group_id: 0 });
        prevStep();
        router.push('/create-event');
    }

    const onSubmit = async (data: CreateEventStep2Data) => {
        updateEventData(data);
        nextStep();
        router.push('/preview-event');
    }
        
  return (
    <>
    <FlashMessage position="top" />
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.heading}>
                    <Pressable onPress={() => handleGoBack()} style={styles.backButton}>
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
        <View>
            <View style={styles.form}>
                <View>
                    <Controller
                        control={control}
                        name="group_id"
                        render={({ field }) => (
                            <GroupSelect groups={groups} {...field}/>
                        )} />
                </View>
                {errors.group_id && <Text style={styles.fieldError}>{errors.group_id.message}</Text>}
            </View>
            <Pressable onPress={() => router.push('/create-group')} style={styles.button}>
                <Text style={styles.buttonText}>+ Create New Group</Text>
            </Pressable>
             <View style={styles.actions}>
                <Pressable
                    onPress={() => router.push('/groups')}
                    style={styles.cancelBtn}>
                    <Text style={styles.cancelLbl}>Cancel</Text>
                </Pressable>
                <Pressable
                    onPress={handleSubmit(onSubmit)}
                    style={styles.submitBtn} >
                    <Text style={styles.createLbl}>Next: Preview</Text>
                </Pressable>
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
        padding: 7,
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
