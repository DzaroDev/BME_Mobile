import React, { useState, useEffect, createRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Alert,
} from "react-native";
import {
  APIMethod,
  APIURL,
  APPSTRING,
  BME_Logo,
  COLORS,
  LocalStorage,
  LoginType,
  OTPPurpose,
  emailRegex,
  phoneRegex,
} from "../Constants";
import Axios from "../api/Axios";
import { useAuth } from "../provider/AuthProvider";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import Loader from "../component/Loader";
import RootComponent from "../component/RootComponent";
import { UserContext } from "../provider/UserProvider";
import AppStyles from "../config/AppStyles";
import { checkLoginType } from "../config/Utils";
import { isEmpty } from "../config/Validations";
import { useRegisterStateContext } from "../provider/RegisterStateProvider";

const Login = ({ navigation }) => {
  const {
    actions: { updateUser, updateCompany, updateService, setFlowType },
  } = useRegisterStateContext();
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("");
  const inputRef = createRef();
  const passInputRef = createRef();

  const [errors, setErrors] = useState({
    input: "",
    password: "",
  });

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const { setUserDetails } = React.useContext(UserContext);
  const { setItem } = useAsyncStorage(LocalStorage.AccessToken);
  const { login, logout } = useAuth();

  useEffect(() => {
    setLoginType(checkLoginType(input));
  }, [input]);

  const validateForm = () => {
    let valid = true;
    const updatedErrors = { ...errors };
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

  const onPressLogin = () => {
    if (validateForm()) {
      setLoading(true);
      Axios.requestWithData(APIMethod.POST, APIURL.AUTH, {
        [loginType]: input,
        password: password,
      })
        .then(async (res) => {
          setLoading(false);
          if (res.status === 200) {
            setUserDetails(res.data.data);
            const {
              firstName,
              lastName,
              password,
              category,
              userType,
              company,
              service,
              token,
            } = res.data.data;
            updateUser(
              firstName,
              lastName,
              password,
              category,
              userType,
              company,
              [loginType]
            );
            updateCompany(company);
            updateService(service);
            setItem(token);
            login(token);
          } else {
            setItem(null);
            login(null);
            setUserDetails({});
            Alert.alert(APPSTRING.App_Name, res.data.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          setUserDetails({});
          login(null);
          Alert.alert(APPSTRING.App_Name, error.data.message);
        });
    }
  };
  const onPressForgotPassword = () => {
    setItem(null);
    logout();
    setUserDetails({});
    setFlowType(OTPPurpose.FORGOT_PWD);
    navigation.navigate("EnterMobile");
  };

  const onPressSignUp = () => {
    setItem(null);
    logout();
    setUserDetails({});
    setFlowType(OTPPurpose.SIGN_UP);
    // updateUser({
    //   email:'akash@gmail.com',
    //   phone:'',
    //   firstName:'Akash',
    //   lastName:'Jaiswal',
    //   password:'Pass@1234',
    //   category:'',
    //   userType:''
    // })

    // updateCompany( {
    //   name: 'Dzaro',
    //   email: 'atul@dzaro.com',
    //   mobile: '8989898989',
    //   mobileCode: "+91",
    //   registrationId: "12345678",
    //   address1: "Pune",
    //   state: "Mahrastha",
    //   city: "Pune",
    //   description: "Software development",
    //   biomedicalExpertise: "NA",
    // })
    // updateService( {
    //   name: 'Software development',
    //   description1: 'Software development',
    //   description2: 'Consulting',
    //   modelName: '12312',
    //   specification: 'IT',
    //   category: 'Software',
    //   price: '2000',
    // })
    navigation.navigate("EnterMobile");
  };

  const renderUI = () => {
    return (
      <>
        <Loader loading={loading} />
        <Image source={BME_Logo} style={AppStyles.logo} />
        <View style={AppStyles.inputMainView}>
          <View style={styles.inputView}>
            <TextInput
              style={AppStyles.inputText}
              placeholder="Email/Mobile"
              placeholderTextColor={COLORS.PLACEHOLDER}
              onChangeText={(text) => setInput(text)}
              onFocus={() => {
                setErrors({ ...errors, input: "" });
              }}
              keyboardType={"email-address"}
              ref={inputRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                passInputRef.current && passInputRef.current.focus();
              }}
              value={input}
            />
          </View>
          {!!errors.input && (
            <Text style={AppStyles.error}>{errors.input}</Text>
          )}
        </View>

        <View style={AppStyles.inputMainView}>
          <View style={styles.inputView}>
            <TextInput
              style={AppStyles.inputText}
              secureTextEntry
              keyboardType="visible-password"
              placeholder="Password"
              placeholderTextColor={COLORS.PLACEHOLDER}
              onChangeText={(text) => setPassword(text)}
              onFocus={() => {
                setErrors({ ...errors, password: "" });
              }}
              ref={passInputRef}
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
              value={password}
              // icon={isPasswordSecure ? "eye-slash" : "eye"}
              // onIconPress={() => {
              //   setIsPasswordSecure(!isPasswordSecure);
              // }}
            />
          </View>
          {!!errors.password && (
            <Text style={AppStyles.error}>{errors.password}</Text>
          )}
        </View>
        <TouchableOpacity onPress={onPressForgotPassword}>
          <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLogin} style={AppStyles.continueBtn}>
          <Text style={AppStyles.continueText}>LOGIN </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "center" }}
          onPress={onPressSignUp}
        >
          <Text style={{ color: "black" }}>Don't have an Account ? </Text>
          <Text style={styles.forgotAndSignUpText}>Signup</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <RootComponent
      style={styles.container}
      navHeader={false}
      children={renderUI()}
    ></RootComponent>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    justifyContent: "center",
    flexDirection: "column",
    padding: 16,
    gap: 20,
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
