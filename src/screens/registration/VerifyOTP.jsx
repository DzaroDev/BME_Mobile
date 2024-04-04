import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import {
  APIMethod,
  APIURL,
  APPSTRING,
  COLORS,
  LoginType,
  OTPPurpose,
  PRIVACY_POLICY,
  TERMS_AND_CONDITION,
} from "../../Constants";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Loader from "../../component/Loader";
import Axios from "../../api/Axios";
import RootComponent from "../../component/RootComponent";
import AppStyles from "../../config/AppStyles";
import PageTitle from "../../navigation/PageTitle";
import { isEmpty } from "../../config/Validations";
import { useRegisterStateContext } from "../../provider/RegisterStateProvider";

const VerifyOTP = ({ navigation }) => {
  const [otp, setOTP] = useState("222666");
  const [loading, setLoading] = useState(false);
  const {
    loginType,
    flowType,
    user: { email, phone },
  } = useRegisterStateContext();

  const [errors, setErrors] = useState({
    otp: "",
  });

  const validateForm = () => {
    let valid = true;
    const updatedErrors = { errors };
    if (isEmpty(otp)) {
      updatedErrors.otp = APPSTRING.Required_OTP;
      valid = false;
    }
    setErrors(updatedErrors);
    return valid;
  };

  const onPressContinue = () => {
    if (validateForm()) {
      if (flowType == OTPPurpose.SIGN_UP) {
        setLoading(true);
        Axios.requestWithData(APIMethod.POST, APIURL.VERIFY_OTP, {
          [loginType]: loginType == LoginType.EMAIL ? email : phone,
          code: otp,
        })
          .then((res) => {
            if (res.status == 200) {
              navigation.navigate("PersonalInfo");
            } else {
              Alert.alert(res.message);
            }
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            Alert.alert(APPSTRING.App_Name, error.data.message);
          });
      } else {
        navigation.navigate("ResetPassword", { code: otp });
      }
    }
  };

  const onPressTermsAndConditions = () => {
    navigation.navigate("MyInAppWebView", {
      url: TERMS_AND_CONDITION,
      title: PageTitle.TERMS_AND_CONDITION,
    });
  };

  const onPressPrivacyPolicy = () => {
    navigation.navigate("MyInAppWebView", {
      url: PRIVACY_POLICY,
      title: PageTitle.PRIVACY_POLICY,
    });
  };

  const renderUI = () => {
    return (
      <>
        <Loader loading={loading} />
        {loginType == LoginType.EMAIL ? (
          <View style={{ alignItems: "center", gap: 15 }}>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>
              Verify your email
            </Text>
            <Text style={{ fontWeight: "400", fontSize: 16 }}>
              Verify the 6-digit OTP sent to
            </Text>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>{email}</Text>
          </View>
        ) : (
          <View style={{ alignItems: "center", gap: 15 }}>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>
              Verify your number
            </Text>
            <Text style={{ fontWeight: "400", fontSize: 16 }}>
              Verify the 6-digit OTP sent to
            </Text>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>{phone}</Text>
          </View>
        )}

        <OTPInputView
          style={{ height: 60, padding: 12 }}
          pinCount={6}
          secureTextEntry
          code={otp}
          onCodeChanged={(code) => {
            setOTP(code);
          }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        {!!errors.otp && <Text style={AppStyles.error}>{errors.otp}</Text>}
        <TouchableOpacity
          onPress={onPressContinue}
          style={AppStyles.continueBtn}
        >
          <Text style={AppStyles.continueText}>CONTINUE </Text>
        </TouchableOpacity>

        <View style={{ alignItems: "center", gap: 8 }}>
          <Text style={{ fontWeight: "400", fontSize: 16 }}>
            By hitting continue you agree to our{" "}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={onPressTermsAndConditions}>
              <Text style={styles.underlineText}>Terms and Conditions</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: "400" }}> and </Text>
            <TouchableOpacity onPress={onPressPrivacyPolicy}>
              <Text style={styles.underlineText}>Privacy policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  return (
    <RootComponent
      title={PageTitle.VERIFY_OTP}
      style={[AppStyles.container, AppStyles.containerPadding]}
      children={renderUI()}
    ></RootComponent>
  );
};
const styles = StyleSheet.create({
  inputMainView: {
    flexDirection: "column",
    gap: 12,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "lightgray",
  },
  underlineStyleHighLighted: {
    borderColor: "#000",
  },
  underlineText: {
    color: "#49495B",
    fontSize: 12,
    alignSelf: "center",
    textDecorationLine: "underline",
    fontWeight: "400",
  },
});
export default VerifyOTP;
