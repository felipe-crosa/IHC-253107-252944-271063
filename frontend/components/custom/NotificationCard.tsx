// components/NotificationCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Notification } from "@/app/types/notification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type Props = {
  notification: Notification;
};

const typeColors: Record<Notification["type"], string> = {
  invitation: "#8B5CF6",
  reminder: "#F97316",
  update: "#3B82F6",
  comment: "#10B981",
  confirmed: "#06B6D4",
  image: "#EF4444",
};

const NotificationCard = ({ notification }: Props) => {
  const timeAgo = dayjs(notification.created_at).fromNow();
  const barColor = typeColors[notification.type] || "#3B82F6";

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={[styles.iconBar, { backgroundColor: barColor }]} />
        <View style={styles.textContent}>
          <Text style={styles.title}>{notification.title}</Text>
          {notification.description && (
            <Text style={styles.description}>{notification.description}</Text>
          )}
          <Text style={styles.time}>{notification.created_at}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconBar: {
    width: 6,
    borderRadius: 4,
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 2,
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
  },
  time: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
  },
});

export default NotificationCard;
