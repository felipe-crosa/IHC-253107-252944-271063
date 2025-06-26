import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const ICONS = {
  message_uploaded: { name: 'chatbubble-ellipses-outline', color: '#22c55e', bg: '#e6faed', label: 'New message' },
  event_created: { name: 'calendar-outline', color: '#a259ff', bg: '#f6f0ff', label: 'Event created' },
  group_invite: { name: 'people-outline', color: '#3b82f6', bg: '#f0f7ff', label: 'Group invite' },
  poll_created: { name: 'stats-chart-outline', color: '#ff9900', bg: '#fff7e6', label: 'Poll created' },
  image_uploaded: { name: 'image-outline', color: '#ef4444', bg: '#fde8e8', label: 'Image uploaded' },
  default: { name: 'notifications-outline', color: '#6b7280', bg: '#f3f4f6', label: 'Notification' },
};

interface NotificationCardProps {
  type: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

function formatDateWithoutTimezone(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const NotificationCard = ({ type, title, description, time, unread } : NotificationCardProps) => {
  const icon = ICONS[type as keyof typeof ICONS] || ICONS.default
  return (
    <View style={[
      styles.card,
      unread && { borderLeftColor: '#8200DB', borderLeftWidth: 4 },
    ]}>
      <View style={styles.row}>
        <View style={[styles.iconCircle, { backgroundColor: icon.bg }]}> 
          <Ionicons name={icon.name as any} size={22} color={icon.color} />
        </View>
        <View style={styles.textSection}>
          <Text
            style={[
              styles.title,
              unread ? { color: '#3c0366' } : { color: '#111' }
            ]}
          >
            {title || icon.label}
          </Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.time}>{formatDateWithoutTimezone(time)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    backgroundColor: 'white',
    marginBottom: 14,
    padding: 14,
    borderLeftWidth: 0,
    borderLeftColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  iconCircle: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  textSection: { flex: 1 },
  title: { fontWeight: '700', fontSize: 15, marginBottom: 2 },
  description: { color: '#222', fontSize: 14, marginBottom: 2 },
  time: { color: '#6b7280', fontSize: 12, marginTop: 2 },
}); 