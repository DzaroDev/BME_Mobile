import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { UserContext } from "../provider/UserProvider";
import {
  AccountSettingsStackNavigator,
  AddBussinessStackNavigator,
  CompnayStackNavigator,
  ForumStackNavigator,
  HomeStackNavigator,
  JobStackNavigator,
} from "./StackNavigator";
import NavigationRoute from "./NavigationRoute";

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator({ route, navigation }) {
  const { activePage } = route.params;
  const { userDetails } = React.useContext(UserContext);
  return (
    <Tab.Navigator
      initialRouteName={activePage}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#ADD8E6",
        },
      }}
      initialParams={{ back: false }}
      labelStyle={{ fontSize: 10 }}
    >
      <Tab.Screen
        name="HomeStack"
        initialParams={{ back: false }}
        component={HomeStackNavigator}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={tintColor}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CompanyStack"
        initialParams={{ back: false }}
        component={CompnayStackNavigator}
        options={{
          tabBarLabel: "Companies",
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={"office-building"}
              color={tintColor}
              size={28}
            />
          ),
        }}
      />
      {/* {userDetails.company === null ? (
        <Tab.Screen
          name="AddBusinessStack"
          initialParams={{ back: false }}
          component={AddBussinessStackNavigator}
          options={{
            tabBarLabel: "Add Business",
            tabBarIcon: ({ tintColor, focused }) => (
              <MaterialCommunityIcons
                name={"google-my-business"}
                color={tintColor}
                size={28}
              />
            ),
          }}
        />
      ) : null} */}
      <Tab.Screen
        name="JobStack"
        initialParams={{ back: false }}
        component={JobStackNavigator}
        options={{
          title: "Jobs",
          tabBarLabel: "Jobs",
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "forum" : "forum-outline"}
              color={tintColor}
              size={28}
            />
          ),
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        initialParams={{ back: false }}
        name="ForumStack"
        component={ForumStackNavigator}
        options={{
          tabBarLabel: "Forum",
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "forum" : "forum-outline"}
              color={tintColor}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AccountStack"
        initialParams={{ back: false }}
        component={AccountSettingsStackNavigator}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ tintColor, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-details" : "account-details-outline"}
              color={tintColor}
              size={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
