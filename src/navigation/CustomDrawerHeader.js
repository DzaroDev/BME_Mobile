import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Image, Text, View } from "react-native";
import { UserContext } from "../provider/UserProvider";
import { COLORS, Dummy_Profile } from "../Constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../provider/AuthProvider";

export default function CustomDrawerHeader(props) {
  const { userDetails } = React.useContext(UserContext);
  const { accessToken } = useAuth();

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        {userDetails.profileImage ? (
          <Image
            source={{
              uri: userDetails.profileImage,
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }}
            resizeMode="cover"
            style={{ margin: 15, width: 60, height: 60, borderRadius: 30 }}
          />
        ) : (
          <FontAwesome name="user-circle" color={COLORS.BLACK} size={50} />
        )}
        <View style={{ justifyContent: "center", margin: 8 }}>
          <Text style={{ fontWeight: "700", fontSize: 25, color: "#444" }}>
            {userDetails.fullName}
          </Text>
          <Text style={{ fontWeight: "200", color: "#999" }}>
            {userDetails.email ?? userDetails.mobile}
          </Text>
        </View>
      </View>

      <DrawerItemList
        inactiveBackgroundColor={"transparent"}
        inactiveTintColor={"white"}
        activeBackgroundColor={"#FFFFFF88"}
        activeTintColor={"white"}
        {...props}
      />
    </DrawerContentScrollView>
  );
}
