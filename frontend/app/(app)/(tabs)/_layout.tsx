import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#8200DB',
      headerShown: false,
      tabBarStyle: {
        display: 'flex',
      },
      tabBarItemStyle: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 1, 
      },
      tabBarLabelStyle: {
        fontSize: 11,   
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={23} name="home-outline" color={color} />
          ,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <Ionicons size={23} name="people-outline" color={color} />
          ,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => <Ionicons size={23} name="add-circle-outline" color={color} />
          ,
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color }) => <Ionicons size={23} name="notifications-outline" color={color} />
          ,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={23} name="person-outline" color={color} />
          ,
        }}
      />
    </Tabs>
  );
}
