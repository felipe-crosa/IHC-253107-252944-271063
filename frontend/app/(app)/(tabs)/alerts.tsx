import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { NotificationCard } from '@/components/custom/NotificationCard';
import * as notificationsService from '@/app/services/notifications.service';

export default function AlertsTab() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await notificationsService.getAllNotifications();
      setNotifications(data);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllRead = async () => {
    await notificationsService.markAllRead();
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  const sortedNotifications = [...notifications].sort((a, b) => {
    const dateA = new Date(a.created_at || a.time_ago || 0).getTime();
    const dateB = new Date(b.created_at || b.time_ago || 0).getTime();
    return dateB - dateA;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.headerRow}>
        <Text style={styles.header}>Notifications</Text>
        <Pressable onPress={handleMarkAllRead}>
          <Text style={styles.markAll}>Mark all read</Text>
        </Pressable>
      </View>
      {sortedNotifications.length === 0 && !loading && (
        <Text style={{ color: '#6b7280', textAlign: 'center', marginTop: 40 }}>No notifications</Text>
      )}
      {sortedNotifications.map((n: any) => (
        <NotificationCard
          key={n.id}
          type={n.type}
          title={n.title}
          description={n.body || n.description}
          time={n.created_at || n.time_ago}
          unread={!n.read_at}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { padding: 20, paddingBottom: 40 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  header: { fontSize: 26, fontWeight: '700', color: '#111' },
  markAll: { color: '#8200DB', fontWeight: '700', fontSize: 15 },
});
