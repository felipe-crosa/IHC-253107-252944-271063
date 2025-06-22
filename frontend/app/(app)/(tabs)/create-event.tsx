import { CreateEventStep1Data } from '@/app/types/event';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { createEventStep1Schema } from '@/app/schemas/create-event.schema';
import { DateTime } from '@/components/custom/DateTime';
import { useRouter } from 'expo-router';
import { useEventStore } from '@/app/stores/useEventStore';
import { CategorySelector } from '@/components/custom/CategorySelector';
import { Category } from '@/app/types/category';
import { useEffect, useState } from 'react';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import * as categoriesService from '@/app/services/categories.service';

export default function CreateEventScreen() {
    const router = useRouter();
    const { updateEventData, nextStep, eventData } = useEventStore();
    const [categories, setCategories] = useState<Category[]>([])

    const getCategories = async () => {
        try {
            const response = await categoriesService.getAll(); 
            setCategories(response);
        } catch (error: any) {
            showMessage({
                message: error.message || "An error occurred while fetching categories.",
                type: "danger",
            });        
        }
    }

    useEffect(() => {   
        getCategories();
    }
    , []);
    
    const {
            control,
            handleSubmit,
            formState: { errors },
        } = useForm<CreateEventStep1Data>({
            resolver: zodResolver(createEventStep1Schema),
            defaultValues: eventData
    });
    
    const onSubmit = async (data: CreateEventStep1Data) => {
        updateEventData(data);
        nextStep();
        router.push('/select-group');
    }
        
  return (
    <>
    <FlashMessage position="top" />
    <View style={styles.container}>
        <View style={styles.header}> 
            <Text style={styles.title}>Create Event</Text>
            <View style={styles.stages}>
                <View style={styles.currentStage} />
                <View style={styles.stage} />
                <View style={styles.stage} />
            </View>
        </View>
        <ScrollView>
            <View style={styles.form}>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Title</Text>
                <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, value }}) => (
                        <TextInput
                            style={styles.inputValue}
                            placeholder="Give your event a name"
                            placeholderTextColor="#99A1AF"
                            onChangeText={onChange}
                            value={value}
                        />
                            
                    )}
                />
                {errors.title && <Text style={styles.fieldError}>{errors.title.message}</Text>}
            </View>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Date & Time</Text>
                <Controller
                    control={control}
                    name="start_at"
                    render={({ field: { onChange, value } }) => (
                        <DateTime
                            value={value}
                            onChange={onChange}
                            placeholder="Select event date & time"
                            style={styles.inputValue}
                        />
                    )}
                />
                {errors.start_at && <Text style={styles.fieldError}>{errors.start_at.message}</Text>}
            </View>
            <View style={styles.categoryInput}>
                <Text style={styles.inputLabel}>Category</Text>
                <Controller
                    control={control}
                    name="category_id"
                    render={({ field: { onChange, value }}) => (
                        <CategorySelector
                            categories={categories}
                            onChange={onChange}
                            value={value}
                        />   
                    )}
                />
                {errors.category_id && <Text style={styles.fieldError}>{errors.category_id.message}</Text>}
            </View>
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Description</Text>
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, value }}) => (
                        <TextInput
                            style={styles.inputTextArea}
                            placeholder="Tell people what this event is about..."
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
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Location</Text>
                <Controller
                    control={control}
                    name="location"
                    render={({ field: { onChange, value }}) => (
                        <TextInput
                            style={styles.inputValue}
                            placeholder="Add a location"
                            placeholderTextColor="#99A1AF"
                            onChangeText={onChange}
                            value={value}
                        />   
                    )}
                />
                {errors.location && <Text style={styles.fieldError}>{errors.location.message}</Text>}
            </View>
        </View>
        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Next: Select Group</Text>
        </Pressable>

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
        width: '100%',
        gap: 20,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
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
        padding: 10,
        borderRadius: 10,
    },
    input: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '100%',
        gap: 10,
      },
      categoryInput: {
        display: 'flex',
        flexDirection: 'column',
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
      button: {
        marginTop: 20, 
        backgroundColor: '#8200DB',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
      },

});
