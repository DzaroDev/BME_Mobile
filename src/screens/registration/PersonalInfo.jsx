import React, { createRef, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import RootComponent from "../../component/RootComponent";
import { APPSTRING, COLORS } from "../../Constants";
import AppStyles from "../../config/AppStyles";
import PageTitle from "../../navigation/PageTitle";
import { isEmpty } from "../../config/Validations";
import { useRegisterStateContext } from "../../provider/RegisterStateProvider";

const PersonalInfo = ({ navigation }) => {
  const {
    user: { firstName, lastName, password },
    actions: { updateUser },
  } = useRegisterStateContext();
  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const passwordInputRef = createRef();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  const validateForm = () => {
    let valid = true;
    const updatedErrors = { ...errors };
    if (isEmpty(firstName)) {
      updatedErrors.firstName = APPSTRING.Required_Firstname;
      valid = false;
    }
    if (isEmpty(lastName)) {
      updatedErrors.lastName = APPSTRING.Required_Lastname;
      valid = false;
    }
    if (isEmpty(password)) {
      updatedErrors.password = APPSTRING.Required_Password;
      valid = false;
    } else if (password.length < 6) {
      updatedErrors.password = APPSTRING.Invalid_Password_Lenght;
      valid = false;
    }

    setErrors(updatedErrors);
    return valid;
  };

  const onPressContinue = () => {
    if (validateForm()) {
      navigation.navigate("ProfileType");
    }
  };

  const renderUI = () => {
    return (
      <>
        <Text style={{ fontWeight: "800", fontSize: 24, alignSelf: "center" }}>
          Let's get started!
        </Text>
        <Text style={{ fontWeight: "400", fontSize: 18, alignSelf: "center" }}>
          First, some details
        </Text>

        <Text style={AppStyles.inputLabel}>First Name</Text>
        <View style={AppStyles.inputMainView}>
          <View style={AppStyles.inputView}>
            <TextInput
              style={AppStyles.inputText}
              placeholder="First Name*"
              placeholderTextColor={COLORS.PLACEHOLDER}
              onChangeText={(text) => updateUser({ firstName: text })}
              ref={firstNameRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                lastNameRef.current && lastNameRef.current.focus()
              }
              value={firstName}
              onFocus={() => {
                setErrors({ ...errors, firstName: "" });
              }}
            />
          </View>
          {!!errors.firstName && (
            <Text style={AppStyles.error}>{errors.firstName}</Text>
          )}
        </View>

        <View style={AppStyles.inputMainView}>
          <Text style={AppStyles.inputLabel}>Last Name</Text>
          <View style={AppStyles.inputView}>
            <TextInput
              style={AppStyles.inputText}
              placeholder="Last Name*"
              placeholderTextColor={COLORS.PLACEHOLDER}
              onChangeText={(text) => updateUser({ lastName: text })}
              onFocus={() => {
                setErrors({ ...errors, lastName: "" });
              }}
              value={lastName}
              ref={lastNameRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
            ></TextInput>
          </View>
          {!!errors.lastName && (
            <Text style={AppStyles.error}>{errors.lastName}</Text>
          )}
        </View>
        <View style={AppStyles.inputMainView}>
          <Text style={AppStyles.inputLabel}>Password</Text>
          <TextInput
            value={password}
            style={AppStyles.inputView}
            onChangeText={(password) => updateUser({ password: password })}
            placeholder="Password"
            keyboardType="visible-password"
            placeholderTextColor={COLORS.PLACEHOLDER}
            ref={passwordInputRef}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
            onFocus={() => {
              setErrors({ ...errors, password: "" });
            }}
          />
          {!!errors.password && (
            <Text style={AppStyles.error}>{errors.password}</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={onPressContinue}
          style={AppStyles.continueBtn}
        >
          <Text style={AppStyles.continueText}>CONTINUE</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <RootComponent
      style={[AppStyles.container, AppStyles.containerPadding]}
      title={PageTitle.PERSONAL_INFO}
      children={renderUI()}
    ></RootComponent>
  );
};
export default PersonalInfo;
