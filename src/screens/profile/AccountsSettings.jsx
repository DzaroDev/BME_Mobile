import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RootComponent from "../../component/RootComponent";
import AppStyles from "../../config/AppStyles";
import { UserContext } from "../../provider/UserProvider";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useAuth } from "../../provider/AuthProvider";
import { LocalStorage } from "../../Constants";
import PageTitle from "../../navigation/PageTitle";
import NavigationRoute from "../../navigation/NavigationRoute";

const AccountsSettings = ({ navigation }) => {
  const { setUserDetails } = useContext(UserContext);
  const { setItem } = useAsyncStorage(LocalStorage.AccessToken);
  const { logout } = useAuth();
  return (
    <RootComponent
      style={AppStyles.container}
      title={PageTitle.ACCOUNT_SETTINGS}
      back={false}
    >
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate(NavigationRoute.EDIT_PROFILE)}
      >
        <Text>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("NotificationSettings")}
      >
        <Text>Notification Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          setItem(null);
          logout();
          setUserDetails({});
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
      {/* Add more settings options as needed */}
    </RootComponent>
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 10,
    paddingHorizontal: 10,
    height: 50,
    borderBottomWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
});

export default AccountsSettings;
