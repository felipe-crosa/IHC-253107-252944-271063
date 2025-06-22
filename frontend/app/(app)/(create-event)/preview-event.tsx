import { StyleSheet, View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useEventStore } from '@/app/stores/useEventStore';

export default function SelectGroupScreen() {
    const router = useRouter();
    const { prevStep, setCurrentStep, eventData, submitEvent } = useEventStore();

    const { title, description, start_at, location, group_id, category_id } = eventData;
    console.log(start_at)

    const handleGoBack = () => {
        prevStep();
        router.push('/select-group');
    }

    const handleCancel = () => {
        setCurrentStep(1);
        router.push('/create-event');
    }

    const handleSubmit = async () => {
        try {
          await submitEvent();
          router.push('/');
        } catch (error: any) {
            showMessage({
                message: error.message || "An error occurred while creating the event.",
                type: "danger",
            });
        }
    }

    const formatDate = (date: Date) : string => {
        return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
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
                    <Text style={styles.title}>Preview Event</Text>
            </View>
             <View style={styles.stages}>
                <View style={styles.stage} />
                <View style={styles.stage} />
                <View style={styles.currentStage} />
            </View>
        </View>
    
        <ScrollView>
            <View style={styles.content}>
              <View style={styles.contentHeader}>
                <View style={styles.contentHeaderDetails}>
                  <Text style={styles.eventTitle}>{ title }</Text>
                  <Text style={styles.eventDate}> { formatDate(start_at) } </Text>
                </View>
                <View style={styles.eventCategoryWrapper}>
                  <Text style={styles.eventCategory}>{category_id}</Text>
                </View>
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.description}>{ description }</Text>
                <View style={styles.location}>
                  <Ionicons name="location-outline" size={24} color="#364153" />
                  <Text style={styles.locationText}>{ location }</Text>
                </View>
                <View style={styles.group}>
                  <Ionicons name="people-outline" size={24} color="#364153" />
                  <Text style={styles.groupName}>{ group_id }</Text>
                </View>
              </View>
            </View>
            <View style={styles.warningSection}>
                <Text style={styles.warningText}>This is how your event will appear to group members.</Text>
                <Text style={styles.warningDescription}>Members will receive a notification and can accept or decline your invitation. You'll need to confirm the event once enough people have accepted.</Text>
            </View>
             <View style={styles.actions}>
                <Pressable
                    onPress={() => handleCancel()}
                    style={styles.cancelBtn}>
                    <Text style={styles.cancelLbl}>Cancel</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleSubmit()}
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
    content: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingBottom: 15,
    },
    contentHeader: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        backgroundColor: '#8200DB',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 15,
    },
    contentHeaderDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },
    eventTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: 'white',
    },
    eventDate: {
        fontSize: 16,
        fontWeight: '500',
        color: 'white',
    },
    eventCategoryWrapper: {
      alignSelf: 'flex-start',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 15,
    },
    eventCategory: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
    },
    groupInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        paddingHorizontal: 15,
    },
    description: {
        fontSize: 16,
        fontWeight: '500',
        color: '#364153',
        lineHeight: 25,
    },
    location: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    locationText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#364153',
    },
    group: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    groupName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#364153',
    },
    warningSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6',
        padding: 15,
        borderRadius: 10,
        gap: 5,
        marginTop: 20,
    },
    warningText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
        lineHeight: 25,
    },
    warningDescription: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6A7282',
        marginTop: 5,
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
