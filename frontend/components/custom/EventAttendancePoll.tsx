import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Event } from '@/app/types/event';
import { User } from '@/app/types/user';
import * as eventsService from '@/app/services/events.service';

interface EventAttendancePollProps {
  event: Event;
  user: User;
  onVoted: () => void;
}

const OPTIONS = [
  { key: 'yes', label: 'Sí', color: '#22c55e', bg: '#e6faed' },
  { key: 'maybe', label: 'Tal vez', color: '#6b7280', bg: '#f3f4f6' },
  { key: 'no', label: 'No', color: '#ef4444', bg: '#fde8e8' },
];

export const EventAttendancePoll = ({ event, user, onVoted }: EventAttendancePollProps) => {
  const [loading, setLoading] = useState(false);

  const isPending = event.pending_attendees.some((u) => u.id === user.id);
  const total = event.confirmed_attendees.length + event.pending_attendees.length + event.cancelled_attendees.length;

  const counts = {
    yes: event.confirmed_attendees.length,
    maybe: event.pending_attendees.length,
    no: event.cancelled_attendees.length,
  };

  const percentages = {
    yes: total ? Math.round((counts.yes / total) * 100) : 0,
    maybe: total ? Math.round((counts.maybe / total) * 100) : 0,
    no: total ? Math.round((counts.no / total) * 100) : 0,
  };

  const handleVote = async (option: 'yes' | 'maybe' | 'no') => {
    setLoading(true);
    try {
      if (option === 'yes') await eventsService.acceptEvent(event.id);
      else if (option === 'no') await eventsService.rejectEvent(event.id);
      // else if (option === 'maybe') await eventsService.setMaybeEvent(event.id); // Remove for now
      onVoted();
    } catch (e) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {!isPending ? null : <Text style={styles.question}>¿Asistirás?</Text>}
        <Text style={styles.responses}>{total} respuestas</Text>
      </View>
      {isPending ? (
        <View style={styles.optionsRow}>
          {OPTIONS.map((opt) => (
            <Pressable
              key={opt.key}
              style={[styles.optionBtn, { backgroundColor: opt.bg, borderColor: opt.color }]}
              onPress={() => handleVote(opt.key as any)}
              disabled={loading || opt.key === 'maybe'}
            >
              <Text style={[styles.optionText, { color: opt.color }]}>{opt.label}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
      <View style={styles.resultsSection}>
        <PollBar label={`Asistirán (${counts.yes})`} color="#22c55e" value={percentages.yes} />
        <PollBar label={`Tal vez (${counts.maybe})`} color="#6b7280" value={percentages.maybe} />
        <PollBar label={`No asistirán (${counts.no})`} color="#ef4444" value={percentages.no} />
      </View>
    </View>
  );
};

function PollBar({ label, color, value }: { label: string; color: string; value: number }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
        <Text style={{ color, fontWeight: '600' }}>{label}</Text>
        <Text style={{ color: '#6b7280', fontWeight: '500' }}>{value}%</Text>
      </View>
      <View style={{ height: 8, backgroundColor: '#f3f4f6', borderRadius: 4, overflow: 'hidden' }}>
        <View style={{ width: `${value}%`, height: 8, backgroundColor: color, borderRadius: 4 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  question: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },
  responses: {
    color: '#6b7280',
    fontWeight: '500',
    fontSize: 15,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    gap: 8,
  },
  optionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  optionText: {
    fontWeight: '700',
    fontSize: 16,
  },
  resultsSection: {
    marginTop: 4,
  },
}); 