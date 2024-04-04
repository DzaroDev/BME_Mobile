import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  APIMethod,
  APIURL,
  APPSTRING,
  COLORS,
  companyUserTypes,
  userTypes,
} from "../../Constants";
import AppStyles from "../../config/AppStyles";
import Axios from "../../api/Axios";
import Loader from "../../component/Loader";
import RootComponent from "../../component/RootComponent";
import PageTitle from "../../navigation/PageTitle";
import { isEmpty } from "../../config/Validations";
import { useRegisterStateContext } from "../../provider/RegisterStateProvider";

export default function ProfileType({ navigation }) {
  const [isCompanyUser, setIsCompanyUser] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  const [userType, setUserType] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({
    userType: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const {
    user,
    actions: { updateUser },
  } = useRegisterStateContext();

  const [profiles, setProfiles] = useState(
    Object.keys(userTypes).map((key, index) => {
      return {
        value: userTypes[key],
        label: key,
      };
    })
  );
  const [categories, setCategories] = useState();
  // Object.keys(categoryTypes).map((key, index) => {
  //   return {
  //     value: categoryTypes[key],
  //     label: categoryTypes[key],
  //   };
  // }));

  useEffect(() => {
    getAllCategories();
  }, []);

  getAllCategories = () => {
    setLoading(true);
    Axios.request(APIMethod.GET, APIURL.GET_ALL_CATEGORY)
      .then((res) => {
        setLoading(false);
        if (res.status == 200) {
          const contents = res.data.data.map((value, index) => {
            return {
              label: value.name,
              value: value.name,
            };
          });
          setCategories(contents);
        } else {
          navigation.goBack();
          Alert.alert(APPSTRING.App_Name, error.data.message);
        }
      })
      .catch((error) => {
        navigation.goBack();
        setLoading(false);
        Alert.alert(APPSTRING.App_Name, error.data.message);
      });
  };

  useEffect(() => {
    if (companyUserTypes.includes(userType)) {
      setIsCompanyUser(true);
    } else {
      setIsCompanyUser(false);
    }
    setCategory("");
  }, [userType]);

  const registerAPICall = (requestBody) => {
    setLoading(true);
    Axios.requestWithData(APIMethod.POST, APIURL.REGISTER, requestBody)
      .then((res) => {
        if (res.status == 200) {
          navigation.navigate("RegistrationSuccess", { data: res.data.data });
        } else {
          Alert.alert(APPSTRING.App_Name, res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert(APPSTRING.App_Name, error.data.message);
      });
  };

  const validateForm = () => {
    let valid = true;
    const updatedErrors = { ...errors };
    if (isEmpty(userType)) {
      updatedErrors.userType = APPSTRING.Required_Profile;
      valid = false;
    }
    if (isCompanyUser && isEmpty(category)) {
      updatedErrors.category = APPSTRING.Required_Category;
      valid = false;
    }
    setErrors(updatedErrors);
    return valid;
  };
  const onPressContinue = () => {
    if (validateForm()) {
      if (isCompanyUser) {
        updateUser({ category: category, userType: userType });
        navigation.navigate("BusinessInfo");
      } else {
        registerAPICall({ user: { user, userType: userType } });
      }
    }
  };

  return (
    <RootComponent
      style={[AppStyles.container, AppStyles.containerPadding]}
      title={PageTitle.PROFILE_TYPE}
      isScrollrequired={false}
    >
      <Loader loading={loading} />
      <View style={AppStyles.inputMainView}>
        <View style={{ zIndex: 2, gap: 12 }}>
          <Text style={styles.inputLabel}>Select your profile</Text>
          <DropDownPicker
            open={openProfile}
            value={userType}
            items={profiles}
            setOpen={(value) => {
              setErrors({ ...errors, userType: "" });
              setOpenProfile(value);
              setOpenCategories(false);
            }}
            setValue={setUserType}
            setItems={setProfiles}
            placeholder={"Profile"}
          />
        </View>
        {!!errors.userType && (
          <Text style={AppStyles.error}>{errors.userType}</Text>
        )}
      </View>

      {isCompanyUser ? (
        <View style={AppStyles.inputMainView}>
          <View style={{ zIndex: 1, gap: 12 }}>
            <Text style={styles.inputLabel}>Select category</Text>
            <DropDownPicker
              open={openCategories}
              value={category}
              items={categories}
              setOpen={(value) => {
                setErrors({ ...errors, category: "" });
                setOpenCategories(value);
                setOpenProfile(false);
              }}
              setValue={setCategory}
              setItems={setCategories}
              placeholder={"Category"}
              
            />
          </View>
          {!!errors.category && (
            <Text style={AppStyles.error}>{errors.category}</Text>
          )}
        </View>
      ) : null}

      <TouchableOpacity onPress={onPressContinue} style={[AppStyles.continueBtn,{zIndex: -1}]}>
        <Text style={AppStyles.continueText}>CONTINUE</Text>
      </TouchableOpacity>
    </RootComponent>
  );
}

const styles = StyleSheet.create({
  continueBtn: {
    width: "100%",
    backgroundColor: COLORS.DARKBLUE,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 16,
    left: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "800",
  },
});
