import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface UserStatsProps {
  eventsCount: number;
  groupsCount: number;
  photosCount: number;
  onEventsPress?: () => void;
  onGroupsPress?: () => void;
  onPhotosPress?: () => void;
}

export const UserStats = ({
  eventsCount,
  groupsCount,
  photosCount,
  onEventsPress,
  onGroupsPress,
  onPhotosPress,
}: UserStatsProps) => {
  const StatItem = ({ 
    count, 
    label, 
    onPress 
  }: { 
    count: number; 
    label: string; 
    onPress?: () => void;
  }) => {
    const content = (
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{count}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    );

    // if (onPress) {
    //   return (
    //     <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
    //       {content}
    //     </TouchableOpacity>
    //   );
    // }

    return content;
  };

  return (
    <View style={styles.statsContainer}>
      <StatItem 
        count={eventsCount} 
        label="Events" 
        onPress={onEventsPress}
      />
      <StatItem 
        count={groupsCount} 
        label="Groups" 
        onPress={onGroupsPress}
      />
      <StatItem 
        count={photosCount} 
        label="Photos" 
        onPress={onPhotosPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F9FAFB',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 35,
    },
    statItem: {
        display: 'flex',   
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1F2937',
    },
    statLabel: {
      fontSize: 14,
      color: '#6A7282',
      fontWeight: '400',
    },
  });