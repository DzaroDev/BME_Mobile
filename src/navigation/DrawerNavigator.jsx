import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabNavigator";
import CustomDrawerHeader from "./CustomDrawerHeader";
import SubscriptionList from "../screens/subscription/SubscriptionList";
import {
  AddBussinessStackNavigator,
  BlogStackNavigator,
} from "./StackNavigator";
import { UserContext } from "../provider/UserProvider";
import { companyUserTypes } from "../Constants";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { userDetails } = React.useContext(UserContext);

  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
      drawerStyle={{
        backgroundColor: "transparent",
      }}
      drawerType={"slide"}
      overlayColor="transparent"
      drawerContent={(props) => {
        return <CustomDrawerHeader {...props} />;
      }}
    >
      <Drawer.Screen
        name="Main"
        options={{ title: "Home" }}
        initialParams={{ activePage: "Home" }}
        component={BottomTabNavigator}
      />
      <Drawer.Screen
        name="Jobs"
        options={{ title: "Jobs" }}
        initialParams={{ activePage: "JobStack" }}
        component={BottomTabNavigator}
      />
      <Drawer.Screen name="LatestArticle" options={{ title: "Latest Article" }} component={BlogStackNavigator} />
      <Drawer.Screen
        name="Post Your Product Requirement"
        initialParams={{ activePage: "ForumStack" }}
        component={BottomTabNavigator}
      />
      <Drawer.Screen name="Subscription" component={SubscriptionList} />
      <Drawer.Screen
        name="Add/Edit your Business"
        initialParams={{
          activePage:
          companyUserTypes.includes(userDetails.userType) ? "BusinessInfo" :  "ProfileType"
        }}
        component={AddBussinessStackNavigator}
      />
      <Drawer.Screen
        name="Account Settings"
        initialParams={{ activePage: "AccountStack" }}
        component={BottomTabNavigator}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
