
import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Jobs from '../screens/Jobs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator(props) {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBarOptions={{
        activeTintColor: '#000',
        showIcon: true
      }}
      inactiveColor='gray'
      labelStyle={{ fontSize: 10 }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={tintColor}
              size={28}
            />
          )
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          tabBarLabel: 'Jobs',
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "forum" : "forum-outline"}
              color={tintColor}
              size={28}
            />
          )
        }}
      />

      <Tab.Screen
        name="Add Business"
        component={Jobs}
        options={{
          tabBarLabel: 'Add Business',
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "forum" : "forum-outline"}
              color={tintColor}
              size={28}
            />
          )
        }}
      />
      <Tab.Screen
        name="Forum"
        component={Settings}
        options={{
          tabBarLabel: 'Forum',
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "forum" : "forum-outline"}
              color={tintColor}
              size={28}
            />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Settings}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-details" : "account-details-outline"}
              color={tintColor}
              size={28}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}