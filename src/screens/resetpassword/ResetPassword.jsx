import React, { useState, createRef, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
} from "react-native";
import {
  APIMethod,
  APIURL,
  APPSTRING,
  BME_Logo,
  COLORS,
} from "../../Constants";
import Axios from "../../api/Axios";
import RootComponent from "../../component/RootComponent";
import Loader from "../../component/Loader";
import PageTitle from "../../navigation/PageTitle";
import AppStyles from "../../config/AppStyles";
import { isEmpty } from "../../config/Validations";
import { useRegisterStateContext } from "../../provider/RegisterStateProvider";
import { StackActions } from "@react-navigation/native";

const ResetPassword = ({ navigation, route }) => {
  const { code } = route.params;
  const {
    user,
    actions: { updateUser },
  } = useRegisterStateContext();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const passwordRef = createRef();
  const confirmPasswordRef = createRef();

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const updatedErrors = { errors };
    if (isEmpty(password)) {
      updatedErrors.password = APPSTRING.Required_Password;
      valid = false;
    } else if (password.length < 6) {
      updatedErrors.password = APPSTRING.Invalid_Password_Lenght;
      valid = false;
    }

    if (isEmpty(confirmPassword)) {
      updatedErrors.confirmPassword = APPSTRING.Required_Confirm_Password;
      valid = false;
    } else if (confirmPassword.length < 6) {
      updatedErrors.confirmPassword = APPSTRING.Invalid_Password_Lenght;
      valid = false;
    }

    if (valid && password != confirmPassword) {
      updatedErrors.confirmPassword = APPSTRING.Password_Not_Matched;
      updatedErrors.password = APPSTRING.Password_Not_Matched;
      valid = false;
    }

    setErrors(updatedErrors);
    return valid;
  };

  const onPressContinue = () => {
    if (validateForm()) {
      setLoading(true);
      Axios.requestWithData(APIMethod.POST, APIURL.RESET_PASSWORD, {
        ...user,
        code,
        password,
      })
        .then((res) => {
          if (res.status == 200) {
            navigation.dispatch(StackActions.popToTop());
            navigation.navigate("Login");
            updateUser({});
          }
          Alert.alert(APPSTRING.App_Name, res.data.message);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert(APPSTRING.App_Name, error.data.message);
        });
    }
  };

  renderTextField = (
    inputLabel,
    placeholder,
    id,
    inputState,
    setInputState,
    inputRef,
    nextInputRef,
    returnKeyType,
    keyboardType
  ) => {
    return (
      <View style={AppStyles.inputMainView}>
        <Text style={AppStyles.inputLabel}>{inputLabel}</Text>
        <TextInput
          value={inputState}
          style={AppStyles.inputView}
          onChangeText={(value) => {
            setInputState(value);
          }}
          placeholder={placeholder}
          placeholderTextColor={COLORS.PLACEHOLDER}
          keyboardType={keyboardType}
          ref={inputRef}
          returnKeyType={returnKeyType}
          onSubmitEditing={() => {
            if (nextInputRef) {
              nextInputRef.current && nextInputRef.current.focus();
            } else {
              Keyboard.dismiss();
            }
          }}
          onFocus={() => {
            setErrors({ ...errors, id: "" });
          }}
        />
        {!!errors[id] && <Text style={AppStyles.error}>{errors[id]}</Text>}
      </View>
    );
  };

  const renderUI = () => {
    return (
      <View style={styles.container}>
        <Loader loading={loading} />
        <Image source={BME_Logo} style={AppStyles.logo} />
        {renderTextField(
          "Password",
          "Password",
          "password",
          password,
          setPassword,
          passwordRef,
          confirmPasswordRef,
          "next",
          "visible-password"
        )}
        {renderTextField(
          "Confirm Password",
          "Confirm Password",
          "confirmPassword",
          confirmPassword,
          setConfirmPassword,
          confirmPasswordRef,
          undefined,
          "done",
          "visible-password"
        )}
        <TouchableOpacity
          onPress={onPressContinue}
          style={AppStyles.continueBtn}
        >
          <Text style={AppStyles.continueText}>CONTINUE </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <RootComponent
      style={styles.container}
      children={renderUI()}
      title={PageTitle.RESET_PASSWORD}
    ></RootComponent>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    justifyContent: "center",
    flexDirection: "column",
    padding: 10,
    gap: 20,
  },
  inputMainView: {
    flexDirection: "column",
    gap: 12,
  },
  inputView: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    borderColor: "#000",
    borderBottomWidth: 1,
  },
  forgotAndSignUpText: {
    color: "#49495B",
    fontSize: 12,
    alignSelf: "center",
    textDecorationLine: "underline",
    fontWeight: "400",
  },
});
export default ResetPassword;
