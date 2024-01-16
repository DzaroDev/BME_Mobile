import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Jobs from "../screens/Jobs";
import LatestArticle from "../screens/LatestArticle";
import BottomTabNavigator from "./TabNavigator";
import CustomDrawerHeader from "./CustomDrawerHeader";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: 'transparent',
      }}
      drawerType={'slide'}
      overlayColor="transparent"
      drawerContent={props => {
        return <CustomDrawerHeader {...props} />;
      }}>
      <Drawer.Screen name="Main" component={BottomTabNavigator} />
      <Drawer.Screen name="Jobs" component={Jobs} />
      <Drawer.Screen name="Latest Article" component={LatestArticle} />
      <Drawer.Screen name="Post Your Product Requirement" component={Jobs} />
      <Drawer.Screen name="Forum" component={Jobs} />
      <Drawer.Screen name="Subscription" component={Jobs} />
      <Drawer.Screen name="Add/Edit your Business" component={Jobs} />
      <Drawer.Screen name="Account Settings" component={Jobs} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;



