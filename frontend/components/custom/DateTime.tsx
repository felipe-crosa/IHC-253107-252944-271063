import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface DateTimeProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  placeholderTextColor?: string;
}

export const DateTime = ({
  value,
  onChange,
}: DateTimeProps) => {

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      if (value) {
        // If we already have a value, preserve the time
        const updated = new Date(selectedDate);
        updated.setHours(value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds());
        onChange(updated);
      } else {
        // If no existing value, use the selected date with current time
        onChange(selectedDate);
      }
    }
  };

  const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    if (selectedTime) {
      if (value) {
        // If we have an existing value, preserve the date and update time
        const updated = new Date(value);
        updated.setHours(selectedTime.getHours(), selectedTime.getMinutes(), selectedTime.getSeconds(), selectedTime.getMilliseconds());
        onChange(updated);
      } else {
        // If no existing value, use today's date with selected time
        const updated = new Date();
        updated.setHours(selectedTime.getHours(), selectedTime.getMinutes(), selectedTime.getSeconds(), selectedTime.getMilliseconds());
        onChange(updated);
      }
    }
  };

  return (
    <View style={styles.buttonContainer}>
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          onChange={onChangeDate}
        />

        <DateTimePicker
          value={value || new Date()}
          mode="time"
          onChange={onChangeTime}
          is24Hour={true}
        />

    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  singleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E5E9',
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
});