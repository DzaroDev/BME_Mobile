import React, { createRef, useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import RootComponent from "../../component/RootComponent";
import { APIMethod, APIURL, APPSTRING, COLORS } from "../../Constants";
import AppStyles from "../../config/AppStyles";
import { UserContext } from "../../provider/UserProvider";
import { Image } from "react-native-elements";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../../provider/AuthProvider";
import * as ImagePicker from "react-native-image-picker";
import { BottomSheet, ListItem } from "@rneui/themed";
import PageTitle from "../../navigation/PageTitle";
import Axios from "../../api/Axios";
import Loader from "../../component/Loader";
import ImagePickerComponent from "../../component/ImagePickerComponent";

const includeExtra = true;

const EditProfile = () => {
  const { userDetails } = React.useContext(UserContext);

  const [firstName, setFirstName] = useState(userDetails.firstName);
  const [lastName, setLastName] = useState(userDetails.lastName);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(userDetails.email ?? "");
  const [phoneNumber, setPhoneNumber] = useState(userDetails.mobile ?? "");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const passwordInputRef = createRef();
  const emailRef = createRef();
  const phoneRef = createRef();

  const [isVisible, setIsVisible] = useState(false);
  const [response, setResponse] = React.useState({
    uri: userDetails.profileImage,
  });
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const list = [
    {
      title: "Take Image",
      onPress: () =>
        onButtonPress("capture", {
          saveToPhotos: true,
          mediaType: "photo",
          includeBase64: false,
          includeExtra,
          maxHeight: 200,
          maxWidth: 200,
        }),
    },
    {
      title: "Select Image",
      onPress: () =>
        onButtonPress("library", {
          maxHeight: 200,
          maxWidth: 200,
          selectionLimit: 1,
          mediaType: "photo",
          includeBase64: false,
          includeExtra,
        }),
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  const onPressContinue = () => {
    updatePorfile();
  };

  const uploadPorfileImage = (data) => {
    setLoading(true);
    Axios.requestWithFormData(APIMethod.POST, APIURL.UPDATE_PROFILE_IMAGE, data)
      .then(async (res) => {
        setLoading(false);
        if (res.status == 200) {
          Alert.alert(APPSTRING.App_Name, res.data.message);
        } else {
          Alert.alert(APPSTRING.App_Name, res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Alert.alert(APPSTRING.App_Name, error.data.message);
      });
  };

  const updatePorfile = () => {
    setLoading(true);

    Axios.requestWithData(APIMethod.PUT, APIURL.UPDATE_USER_PROFILE, {
      firstName: firstName,
      lastName: lastName,
      // email: email,
      // mobile: phoneNumber,
      // password: password,
      userType: userDetails.userType,
      category: userDetails.category,
    })
      .then(async (res) => {
        setLoading(false);
        if (res.status == 200) {
          Alert.alert(APPSTRING.App_Name, "Profile updated successfully.");
        } else {
          Alert.alert(APPSTRING.App_Name, res.data.message);
        }
      })
      .catch((error) => {
        console.log(error.data);
        setLoading(false);
        Alert.alert(APPSTRING.App_Name, error.data.message);
      });
  };

  const onButtonPress = React.useCallback(async (type, options) => {
    if (type === "capture") {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else {
          const data = response.assets[0];
          setResponse(data);
          uploadPorfileImage(data);
        }
      });
    }
    setIsVisible(false);
  }, []);

  renderTextField = (
    inputLabel,
    placeholder,
    inputState,
    setInputState,
    inputRef,
    nextInputRef,
    returnKeyType,
    inputError,
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
          blurOnSubmit={false}
        />
        {!!inputError && <Text style={AppStyles.error}>{inputError}</Text>}
      </View>
    );
  };

  renderProfileImage = () => {
    return (
      <View style={[AppStyles.inputMainView, { alignItems: "center" }]}>
        <TouchableOpacity
          onPress={() => {
            setIsVisible(true);
          }}
        >
          {response.uri ? (
            <Image
              source={{
                uri: response.uri,
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }}
              resizeMode="cover"
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          ) : (
            <FontAwesome name="user-circle" color={COLORS.BLACK} size={120} />
          )}
          <FontAwesome
            name="edit"
            color={COLORS.BLACK}
            size={24}
            style={{
              position: "absolute",
              bottom: -8,
              right: -8,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderImagePicker = () => {
    return (
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    );
  };

  const renderUI = () => {
    return (
      <>
        <Loader loading={loading} />
        {/* {renderImagePicker()}
        {renderProfileImage()} */}
        {
          <ImagePickerComponent
            uri={response.uri}
            onSelect={(data) => {
              uploadPorfileImage(data);
              setResponse(data);
            }}
          />
        }
        {renderTextField(
          "First Name",
          "First Name",
          firstName,
          setFirstName,
          firstNameRef,
          lastNameRef,
          "next",
          firstNameError
        )}
        {renderTextField(
          "Last Name",
          "Last Name",
          lastName,
          setLastName,
          lastNameRef,
          emailRef,
          "next",
          lastNameError
        )}
        {renderTextField(
          "Email",
          "Email",
          email,
          setEmail,
          emailRef,
          phoneRef,
          "next",
          emailError,
          "email-address"
        )}
        {renderTextField(
          "Mobile No",
          "Mobile No",
          phoneNumber,
          setPhoneNumber,
          phoneRef,
          passwordInputRef,
          "next",
          phoneError,
          "phone-pad"
        )}
        {renderTextField(
          "Password",
          "Password",
          password,
          setPassword,
          passwordInputRef,
          undefined,
          "done",
          passwordError
        )}
        <TouchableOpacity
          onPress={onPressContinue}
          style={AppStyles.continueBtn}
        >
          <Text style={AppStyles.continueText}>UPDATE</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <RootComponent
      style={[AppStyles.container, AppStyles.containerPadding]}
      title={PageTitle.EDIT_PROFILE}
      children={renderUI()}
    ></RootComponent>
  );
};
export default EditProfile;
