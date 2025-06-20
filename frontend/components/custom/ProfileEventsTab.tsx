import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet } from "react-native";

interface ProfileEventsTabProps {}

export const ProfileEventsTab = ({ } : ProfileEventsTabProps) => {
    return (
        <View style={styles.tabContent}>
           <View style={styles.photoGrid}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                <LinearGradient  
                    colors={['#E9D4FF', '#DAB2FF']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.photoThumbnail}>
                        <Text style={styles.photoThumbnailText}>Photo { index }</Text>
                        </LinearGradient>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tabContent: {
        padding: 20,
    },
    photoGrid: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
      },
      photoItem: {
        width: '30%',
        aspectRatio: 1,
        backgroundColor: '#C4B5FD',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      photoLabel: {
        fontSize: 12,
        color: '#8B5CF6',
        fontWeight: '500',
      },
      photoThumbnail: {
        width: 95,
        height: 95,
        backgroundColor: '#c4b5fd',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoThumbnailText: {
        color: '#8200DB',
        fontSize: 14,
        fontWeight: '400',
    },
    
});