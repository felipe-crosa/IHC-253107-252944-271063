import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Pressable, Text, View, StyleSheet, TextInput } from 'react-native';
import { CreateGroupFormData } from '../types/group';
import { createGroupSchema } from '../schemas/create-group.schema';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import * as groupsService from '../services/groups.service';

export default function CreateGroupScreen() {
    const router = useRouter();

     const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateGroupFormData>({
        resolver: zodResolver(createGroupSchema),
        defaultValues: {
            name: '',
            description: ''
        }
    });

     const onSubmit: SubmitHandler<CreateGroupFormData> = async (data) => {
            try {
                await groupsService.create(data);
                router.push('/groups');
            } catch (err: any) {
              showMessage({
                message: err.message || "An error occurred whilst creating the group.",
                type: "danger",
              });  
            }
        }

    return (
        <>
        <FlashMessage position="top" />
         <View style={styles.container}>
            <View style={styles.heading}>
                <Pressable onPress={() => router.push('/groups')} style={styles.backButton}>
                    <Ionicons size={20} name="chevron-back-outline" color={'black'} />
                </Pressable>
                <Text style={styles.title}>Create Group</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value }}) => (
                            <TextInput
                                style={styles.inputValue}
                                placeholder="Give your group a name"
                                placeholderTextColor="#99A1AF"
                                onChangeText={onChange}
                                value={value}
                            />
                        
                        )}
                    />
                    {errors.name && <Text style={styles.fieldError}>{errors.name.message}</Text>}
                </View>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value }}) => (
                            <TextInput
                                style={styles.inputTextArea}
                                placeholder="What is this group about?"
                                placeholderTextColor="#99A1AF"
                                multiline = {true}
                                numberOfLines = {6}
                                onChangeText={onChange}
                                value={value}
                            />
                        
                        )}
                    />
                    {errors.description && <Text style={styles.fieldError}>{errors.description.message}</Text>}
                </View>
            </View>
            <View style={styles.actions}>
                <Pressable
                    onPress={() => router.push('/groups')}
                    style={styles.cancelBtn}>
                    <Text style={styles.cancelLbl}>Cancel</Text>
                </Pressable>
                <Pressable
                    onPress={handleSubmit(onSubmit)}
                    style={styles.submitBtn} >
                    <Text style={styles.createLbl}>Create Group</Text>
                </Pressable>
            </View>
        </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
    }, 
    heading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 10,
        justifyContent: 'flex-start',
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
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 20,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '100%',
        gap: 10,
      },
      inputLabel: {
        color: '#1F2937',
        fontWeight: '600',
        fontSize: 14,
        width: '100%',
      },
      inputValue: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#D1D5DC',
        borderRadius: 15,
        width: '100%',
      },
      inputTextArea: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#D1D5DC',
        borderRadius: 15,
        width: '100%',
        minHeight: 100,
      },
      fieldError: {
        color: 'red',
        fontSize: 12,
        width: '100%',
      },
      actions: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
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

})