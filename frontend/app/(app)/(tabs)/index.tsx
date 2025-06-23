import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Event } from '@/app/types/event';
import { ActionRequiredEventCard } from '@/components/custom/ActionRequiredEventCard';
import { UpcomingEventCard } from '@/components/custom/UpcomingEventCard';
import { RecentEventCard } from '@/components/custom/RecentEventCard';
import * as eventsService from '@/app/services/events.service';
import { useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { getPastEvents, getUpcomingEvents } from '@/helpers/event-status.helper';

export default function HomeScreen() {
  const [actionRequiredEvents, setActionRequiredEvents] = useState<Event[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [recentEvents, setRecentEvents] = useState<Event[]>([]);

  const getEvents = async () => {
    try {
      const [allEvents, pendingEvents] = await Promise.all([
        eventsService.getAll(),
        eventsService.getPendingEvents(),
      ]);

      const upcoming = getUpcomingEvents(allEvents).filter(
        (e) => !pendingEvents.some((p) => p.id === e.id)
      );
      const past = getPastEvents(allEvents);

      setActionRequiredEvents(pendingEvents);
      setUpcomingEvents(upcoming);
      setRecentEvents(past);
    } catch (error: any) {
      showMessage({
        message: error.message || "An error occurred while fetching events.",
        type: "danger",
      });
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleAcceptAction = (eventId: number) => {
    console.log(`Accepted action for event ID: ${eventId}`);
    // Implement the logic to handle accepting the action for the event
  };

  const handleRejectAction = (eventId: number) => {
    console.log(`Rejected action for event ID: ${eventId}`);
    // Implement the logic to handle rejecting the action for the event
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>Home</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.subtitle}>ACTION REQUIRED</Text>
          <View style={styles.events}>
            {actionRequiredEvents.length > 0 ? (
              actionRequiredEvents.map((event) => (
                <ActionRequiredEventCard key={event.id} event={event} handleAcceptAction={handleAcceptAction} handleRejectAction={handleRejectAction}/>
              ))
            ) : (
              <Text style={styles.emptyListText}>No actions required at the moment.</Text>
            )}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>UPCOMING EVENTS</Text>
          <View style={styles.events}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <UpcomingEventCard key={event.id} event={event} />
              ))
            ) : (
              <Text style={styles.emptyListText}>No upcoming events scheduled.</Text>
            )}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>RECENT EVENTS</Text>
          <View style={styles.events}>
            {recentEvents.length > 0 ? (
              recentEvents.map((event) => (
                <RecentEventCard key={event.id} event={event} />
              ))
            ) : (
              <Text style={styles.emptyListText}>No recent events to show.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
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
  content: {
    flex: 1,
  },
  createBtn: {
    backgroundColor: '#8200DB',
    padding: 5,
    borderRadius: 50,
  },
  subtitle: {
    marginTop: 20,
    color: '#6A7282',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,

  }, 
  events: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,

  },
  emptyListText: {
    color: '#6A7282',
    marginTop: 10,
    fontSize: 14,
  },
});
