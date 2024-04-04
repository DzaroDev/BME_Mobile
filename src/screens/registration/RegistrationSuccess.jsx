import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { BME_Logo, COLORS, LocalStorage } from "../../Constants";
import RootComponent from "../../component/RootComponent";
import { UserContext } from "../../provider/UserProvider";
import { useAuth } from "../../provider/AuthProvider";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import AppStyles from "../../config/AppStyles";
import PageTitle from "../../navigation/PageTitle";

const RegistrationSuccess = ({ route }) => {
  const { setUserDetails } = useContext(UserContext);
  const { login } = useAuth();
  const { setItem } = useAsyncStorage(LocalStorage.AccessToken);

  const { fullName } = route.params.data;

  const onPressContinue = () => {
    setUserDetails(route.params.data);
    login(route.params.data.token);
    setItem(route.params.data.token);
  };

  const renderUI = () => {
    return (
      <>
        <Image source={BME_Logo} style={AppStyles.logo} />
        <View style={styles.inputMainView}>
          <Text style={styles.inputLabel}>Hello, {fullName}</Text>
          <View style={styles.inputView}>
            <Text style={styles.inputLabel}>You're all set</Text>
          </View>
        </View>

        <TouchableOpacity onPress={onPressContinue} style={AppStyles.continueBtn}>
          <Text style={AppStyles.continueText}>CONTINUE</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <RootComponent
      style={[AppStyles.container, AppStyles.containerPadding]}
      title={PageTitle.REGISTRATION_SUCCESS}
      children={renderUI()}
    ></RootComponent>
  );
};

export default RegistrationSuccess;

const styles = StyleSheet.create({
  inputMainView: {
    alignItems: "center",
    flexDirection: "column",
    gap: 12,
  },
  inputView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  inputLabel: {
    fontSize: 24,
    fontWeight: "600",
  },
  forgotAndSignUpText: {
    color: "#49495B",
    fontSize: 12,
    alignSelf: "center",
    textDecorationLine: "underline",
    fontWeight: "400",
  },
});
