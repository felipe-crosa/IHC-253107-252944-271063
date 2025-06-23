import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Switch } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPollSchema, CreatePollFormData } from "../schemas/create-poll.schema";
import * as pollsService from '../services/polls.service';
import Ionicons from "@expo/vector-icons/Ionicons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { useState } from "react";

export default function CreatePollScreen() {
    const router = useRouter();
    const { eventId } = useLocalSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<CreatePollFormData>({
        resolver: zodResolver(createPollSchema),
        defaultValues: {
            question: '',
            options: ['', ''],
            duration: 24,
            multiple_choice: false,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "options" as keyof CreatePollFormData,
    });

    const onSubmit = async (data: CreatePollFormData) => {
        setIsSubmitting(true);
        try {
            await pollsService.createPoll(Number(eventId), data);
            showMessage({ message: "Poll created successfully!", type: "success" });
            router.back();
        } catch (error: any) {
            showMessage({ message: error.message || "Failed to create poll.", type: "danger" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <FlashMessage position="top" />
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#1f2937" />
                </Pressable>
                <Text style={styles.title}>Create Poll</Text>
            </View>

            <ScrollView style={styles.formContainer}>
                <View style={styles.card}>
                    <Text style={styles.label}>Question</Text>
                    <Controller
                        control={control}
                        name="question"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="What should we bring...?"
                            />
                        )}
                    />
                    {errors.question && <Text style={styles.errorText}>{errors.question.message}</Text>}

                    <Text style={styles.label}>Options</Text>
                    {fields.map((field, index) => (
                        <View key={field.id} style={styles.optionInputContainer}>
                            <Controller
                                control={control}
                                name={`options.${index}`}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.optionInput}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder={`Option ${index + 1}`}
                                    />
                                )}
                            />
                            {index > 2 && (
                                <Pressable onPress={() => remove(index)}>
                                    <Ionicons name="trash-outline" size={20} color="#9ca3af" />
                                </Pressable>
                            )}
                        </View>
                    ))}
                    <Pressable style={styles.addOptionButton} onPress={() => append('')}>
                        <Ionicons name="add" size={20} color="#8200DB" />
                        <Text style={styles.addOptionText}>Add Option</Text>
                    </Pressable>

                    {/* Poll Duration and other settings will go here */}
                </View>

                <View style={styles.card}>
                    <View style={styles.switchContainer}>
                        <Text style={styles.label}>Allow multiple selections</Text>
                        <Controller
                            control={control}
                            name="multiple_choice"
                            render={({ field: { onChange, value } }) => (
                                <Switch
                                    trackColor={{ false: "#d1d5db", true: "#a78bfa" }}
                                    thumbColor={value ? "#8200DB" : "#f4f3f4"}
                                    onValueChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <Pressable style={[styles.button, styles.backCta]} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.createCta]} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
                    <Text style={[styles.buttonText, styles.createCtaText]}>
                        {isSubmitting ? 'Creating...' : 'Create Poll'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    formContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 12,
    },
    optionInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    optionInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginRight: 8,
    },
    addOptionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    addOptionText: {
        color: '#8200DB',
        fontWeight: '500',
        marginLeft: 4,
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    footer: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        backgroundColor: 'white',
    },
    button: {
        flex: 1,
        padding: 16,
        borderRadius: 24,
        alignItems: 'center',
    },
    backCta: {
        backgroundColor: '#e5e7eb',
        marginRight: 8,
    },
    createCta: {
        backgroundColor: '#8200DB',
        marginLeft: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    createCtaText: {
        color: 'white',
    }
}); 