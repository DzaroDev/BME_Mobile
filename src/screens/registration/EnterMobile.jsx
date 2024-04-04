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
  LoginType,
  OTPPurpose,
  emailRegex,
  phoneRegex,
} from "../../Constants";
import Axios from "../../api/Axios";
import RootComponent from "../../component/RootComponent";
import Loader from "../../component/Loader";
import PageTitle from "../../navigation/PageTitle";
import AppStyles from "../../config/AppStyles";
import { checkLoginType } from "../../config/Utils";
import { isEmpty } from "../../config/Validations";
import { useRegisterStateContext } from "../../provider/RegisterStateProvider";

const EnterMobile = ({ navigation }) => {
  const {
    loginType,
    flowType,
    actions: { setLoginType, updateUser },
  } = useRegisterStateContext();
  const [input, setInput] = useState();
  const [errors, setErrors] = useState({
    input: "",
  });
  const inputRef = createRef();

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const updatedErrors = { errors };
    if (isEmpty(input)) {
      updatedErrors.input = APPSTRING.Required_Email_Or_Mobile;
      valid = false;
    } else if (loginType === LoginType.EMAIL) {
      if (!emailRegex.test(input)) {
        updatedErrors.input = APPSTRING.Invalid_Email;
        valid = false;
      }
    } else if (loginType == LoginType.PHONE) {
      if (!phoneRegex.test(input)) {
        updatedErrors.input = APPSTRING.Invalid_Phone;
        valid = false;
      }
    }
    setErrors(updatedErrors);
    return valid;
  };

  React.useEffect(() => {
    setLoginType(checkLoginType(input));
  }, [input]);

  const onPressContinue = () => {
    if (validateForm()) {
      setLoading(true);
      if (loginType == LoginType.EMAIL) {
        updateUser({ [loginType]: input });
      } else {
        updateUser({ [loginType]: input, mobileCode: "+91" });
      }

      Axios.requestWithData(APIMethod.POST, flowType == OTPPurpose.SIGN_UP? APIURL.SEND_OTP : APIURL.FORGOT_PASSWORD, {
        [loginType]: input,
      })
        .then((res) => {
          if (res.status == 200) {
            navigation.navigate("VerifyOTP", {
              data: { loginType: loginType, inputValue: input },
            });
          } else {
            Alert.alert(res.data.message);
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert(APPSTRING.App_Name, error.data.message);
        });
    }
  };

  const renderUI = () => {
    return (
      <View style={styles.container}>
        <Loader loading={loading} />
        <Image source={BME_Logo} style={AppStyles.logo} />
        <View style={styles.inputMainView}>
          <View style={styles.inputView}>
            <TextInput
              text={input}
              style={styles.inputText}
              placeholder="Email or Mobile Number"
              placeholderTextColor={COLORS.PLACEHOLDER}
              ref={inputRef}
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              value={input}
              onChangeText={(text) => setInput(text)}
              onFocus={() => {
                setErrors({ ...errors, input: "" });
              }}
            />
          </View>
          {!!errors.input && (
            <Text style={AppStyles.error}>{errors.input}</Text>
          )}
        </View>
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
      title={
        flowType === OTPPurpose.SIGN_UP
          ? PageTitle.REGISTRATION
          : PageTitle.FORGOT_PASSWORD
      }
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
export default EnterMobile;
