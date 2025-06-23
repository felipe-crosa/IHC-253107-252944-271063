import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationCard from '@/components/custom/NotificationCard';
import { Notification } from '@/app/types/notification';
import { useRouter } from 'expo-router';
import * as notificationsService from '@/app/services/notification.service';
import { showMessage } from 'react-native-flash-message';

export default function AlertsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getNotifications = async () => {
    try {
      setLoading(true);
      const notifications = await notificationsService.getAll();
      setNotifications(notifications);
    } catch (error: any) {
      showMessage({
        message: error.message || "An error occurred while fetching notifications.",
        type: "danger",
      });
    }
  }
  useEffect(() => {
    getNotifications();
    setLoading(false);

  }, []);

  const handleNotificationPress = (notification: Notification) => {
//     if (notification.type.startsWith('event')) {
//       router.push(`/events/${notification.meta?.event_id}`);
//     } else if (notification.type === 'image_uploaded' || notification.type === 'new_comment') {
//       router.push(`/groups/${notification.meta?.group_id}`);
//     }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Notifications</Text>
      </View>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : (
        <ScrollView>
          {notifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              onPress={() => handleNotificationPress(notification)}
            >
              <NotificationCard notification={notification} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 15,
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
});
