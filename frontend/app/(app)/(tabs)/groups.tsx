import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AlertsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.title}>My Groups</Text>
        <Pressable style={styles.createBtn} onPress={() => console.log('Create Group')}>
          <Ionicons size={30} name="add-circle-outline" color={'white'}/>
        </Pressable>
      </View>
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
  createBtn: {
    backgroundColor: '#8200DB',
    padding: 5,
    borderRadius: 50,
  }

});
