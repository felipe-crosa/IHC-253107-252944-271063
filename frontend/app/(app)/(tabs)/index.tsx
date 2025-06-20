import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Event } from '@/app/types/event';
import { ActionRequiredEventCard } from '@/components/custom/ActionRequiredEventCard';
import { UpcomingEventCard } from '@/components/custom/UpcomingEventCard';
import { RecentEventCard } from '@/components/custom/RecentEventCard';

export default function HomeScreen() {
  const actionRequiredEvents: Event[] = [
    {
      id: 1,
      title: 'Beach Day',
      description: 'Fun day at the beach with games, volleyball, and BBQ. Bring sunscreen and towels!',
      start_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      location: 'Santa Monica Beach',
      group_id: 1,
      category_id: 1,
    },
    {
      id: 2,
      title: 'Movie Night',
      description: 'Watching the latest Marvel movie with popcorn and drinks provided.',
      start_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now (Friday)
      location: 'Downtown Cinema',
      group_id: 2,
      category_id: 2,
    },
  ]

  const upcomingEvents: Event[] = [
    {
      id: 3,
      title: 'Hiking Trip',
      description: 'Morning hike through the beautiful mountain trails. Moderate difficulty level.',
      start_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next Sunday
      location: 'Mountain Trail Park',
      group_id: 3,
      category_id: 3
    },
    {
      id: 4,
      title: "Dinner at Luigi's",
      description: 'Italian cuisine night at the famous Luigi\'s restaurant. Reservations confirmed.',
      start_at: new Date('2024-05-20T19:30:00'), // May 20, 7:30 PM
      location: "Luigi's Italian Restaurant",
      group_id: 4,
      category_id: 4,
    },
  ]
  const recentEvents: Event[] = [
    {
      id: 5,
      title: 'Game Night',
      description: 'Board games and video games tournament with prizes and snacks.',
      start_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Last Friday
      location: 'Community Center',
      group_id: 1,
      category_id: 5,
    },
  ];

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
            {actionRequiredEvents.map((event) => (
              <ActionRequiredEventCard event={event} handleAcceptAction={handleAcceptAction} handleRejectAction={handleRejectAction}/>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>UPCOMING EVENTS</Text>
          <View style={styles.events}>
            {upcomingEvents.map((event) => (
              <UpcomingEventCard event={event} />
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.subtitle}>RECENT EVENTS</Text>
          <View style={styles.events}>
            {recentEvents.map((event) => (
              <RecentEventCard event={event} />
            ))}
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

});
