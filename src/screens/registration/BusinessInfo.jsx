import React, { useState, createRef, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import Loader from "../../component/Loader";
import RootComponent from "../../component/RootComponent";
import AppStyles from "../../config/AppStyles";
import { APIMethod, APIURL, APPSTRING, COLORS } from "../../Constants";
import Axios from "../../api/Axios";
import PageTitle from "../../navigation/PageTitle";
import { isEmpty } from "../../config/Validations";
import { useRegisterStateContext } from "../../provider/RegisterStateProvider";
import ImagePickerComponent from "../../component/ImagePickerComponent";

const BusinessInfo = ({ route, navigation }) => {
  const BusinessInfoFields = {
    Name: "name",
    Email: "email",
    Mobile: "mobile",
    RegistrationId: "registrationId",
    Address: "address1",
    City: "city",
    State: "state",
    Description: "description",
    BiomedicalExpertise: "biomedicalExpertise",
  };
  const {
    user,
    company,
    actions: { updateCompany },
  } = useRegisterStateContext();
  const {
    name,
    email,
    mobile,
    registrationId,
    address1,
    city,
    state,
    description,
    biomedicalExpertise,
  } = company;

  const nameRef = createRef();
  const emailInputRef = createRef();
  const mobileInputRef = createRef();
  const registartionIdInputRef = createRef();
  const addressIdInputRef = createRef();
  const cityInputRef = createRef();
  const stateInputRef = createRef();
  const descriptionInputRef = createRef();
  const biomedicalExpertiseInputRef = createRef();

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    registrationId: "",
    address1: "",
    city: "",
    state: "",
    description: "",
    biomedicalExpertise: "",
  });

  const [loading, setLoading] = useState(false);

  const registerWithoutBusinessInfoCall = (requestBody) => {
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
    let input = "";
    let inputError = "";
    Object.keys(BusinessInfoFields).forEach((key, index) => {
      switch (BusinessInfoFields[key]) {
        case BusinessInfoFields.Name:
          input = name;
          inputError = APPSTRING.Required_Buisness_Name;
          break;
        case BusinessInfoFields.Email:
          input = email;
          inputError = APPSTRING.Required_Buisness_Email;
          break;
        case BusinessInfoFields.Mobile:
          input = mobile;
          inputError = APPSTRING.Required_Buisness_Mobile;
          break;
        case BusinessInfoFields.RegistrationId:
          input = registrationId;
          inputError = APPSTRING.Required_Buisness_RegistrationId;
          break;
        case BusinessInfoFields.Address:
          input = address1;
          inputError = APPSTRING.Required_Buisness_Address;
          break;
        case BusinessInfoFields.City:
          input = city;
          inputError = APPSTRING.Required_Buisness_City;
          break;
        case BusinessInfoFields.State:
          input = state;
          inputError = APPSTRING.Required_Buisness_State;
          break;
        case BusinessInfoFields.Description:
          input = description;
          inputError = APPSTRING.Required_Buisness_Description;
          break;
        case BusinessInfoFields.BiomedicalExpertise:
          input = biomedicalExpertise;
          inputError = APPSTRING.Required_Buisness_BiomedicalExpertise;
          break;
      }
      if (isEmpty(input)) {
        updatedErrors[BusinessInfoFields[key]] = inputError;
        valid = false;
      }
    });

    setErrors(updatedErrors);
    return valid;
  };

  const handleSubmitButton = () => {
    if (validateForm()) {
      navigation.navigate("ProductInfo");
    }
  };
  const handleSkipButton = () => {
    registerWithoutBusinessInfoCall({ user });
  };

  renderTextField = (
    inputLabel,
    placeholder,
    id,
    inputRef,
    nextInputRef,
    returnKeyType,
    keyboardType
  ) => {
    return (
      <View style={AppStyles.inputMainView}>
        <Text style={AppStyles.inputLabel}>{inputLabel}</Text>
        <TextInput
          value={company[id]}
          style={AppStyles.inputView}
          onChangeText={(value) => {
            updateCompany({ [id]: value });
          }}
          placeholder={placeholder}
          placeholderTextColor={COLORS.PLACEHOLDER}
          keyboardType={keyboardType}
          ref={inputRef}
          returnKeyType={returnKeyType}
          onSubmitEditing={() =>
            nextInputRef.current && nextInputRef.current.focus()
          }
          onFocus={() => {
            setErrors({ ...errors, id: "" });
          }}
        />
        {!!errors[id] && <Text style={AppStyles.error}>{errors[id]}</Text>}
      </View>
    );
  };

  useEffect(() => {
    updateCompany({ mobileCode: "+91" });
  }, []);

  return (
    <RootComponent
      style={[AppStyles.container, AppStyles.containerPadding]}
      title={PageTitle.COMPANY_INFO}
    >
      <Loader loading={loading} />
      {<ImagePickerComponent onSelect={(data)=>{
        console.log(data)
      }}/>}
      {renderTextField(
        "Company Name",
        "Company Name",
        BusinessInfoFields.Name,
        nameRef,
        emailInputRef,
        "next"
      )}
      {renderTextField(
        "Email",
        "Email",
        BusinessInfoFields.Email,
        emailInputRef,
        mobileInputRef,
        "next",
        "email-address"
      )}
      {renderTextField(
        "Mobile No",
        "Mobile No",
        BusinessInfoFields.Mobile,
        mobileInputRef,
        registartionIdInputRef,
        "next",
        "phone-pad"
      )}
      {renderTextField(
        "Registration ID",
        "Registration ID",
        BusinessInfoFields.RegistrationId,
        registartionIdInputRef,
        mobileInputRef,
        "next"
      )}
      {renderTextField(
        "Address",
        "Address",
        BusinessInfoFields.Address,
        addressIdInputRef,
        cityInputRef,
        "next"
      )}
      {renderTextField(
        "City",
        "City",
        BusinessInfoFields.City,
        cityInputRef,
        stateInputRef,
        "next"
      )}
      {renderTextField(
        "State",
        "State",
        BusinessInfoFields.State,
        stateInputRef,
        descriptionInputRef,
        "next"
      )}

      <View style={AppStyles.inputMainView}>
        <Text style={AppStyles.inputLabel}>Description</Text>

        <TextInput
          style={AppStyles.inputView}
          onChangeText={(description) =>
            updateCompany({ description: description })
          }
          value={description}
          placeholder="Description"
          placeholderTextColor={COLORS.PLACEHOLDER}
          autoCapitalize="sentences"
          ref={descriptionInputRef}
          returnKeyType="next"
          onFocus={() => {
            setErrors({ ...errors, description: "" });
          }}
          onSubmitEditing={() => {
            biomedicalExpertiseInputRef.current &&
              biomedicalExpertiseInputRef.current.focus();
          }}
          blurOnSubmit={false}
        />
        {!!errors[BusinessInfoFields.Description] && (
          <Text style={AppStyles.error}>
            {errors[BusinessInfoFields.Description]}
          </Text>
        )}
      </View>
      <View style={AppStyles.inputMainView}>
        <Text style={AppStyles.inputLabel}>Biomedical Expertise</Text>
        <TextInput
          style={AppStyles.inputView}
          onChangeText={(value) =>
            updateCompany({ biomedicalExpertise: value })
          }
          value={biomedicalExpertise}
          placeholder="Biomedical Expertise"
          placeholderTextColor={COLORS.PLACEHOLDER}
          autoCapitalize="sentences"
          ref={biomedicalExpertiseInputRef}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          onFocus={() => {
            setErrors({ ...errors, biomedicalExpertise: "" });
          }}
        />
        {!!errors[BusinessInfoFields.BiomedicalExpertise] && (
          <Text style={AppStyles.error}>
            {errors[BusinessInfoFields.BiomedicalExpertise]}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={AppStyles.continueBtn}
        activeOpacity={0.5}
        onPress={handleSubmitButton}
      >
        <Text style={AppStyles.continueText}>CONTINUE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={AppStyles.continueBtn}
        activeOpacity={0.5}
        onPress={handleSkipButton}
      >
        <Text style={AppStyles.continueText}>SKIP</Text>
      </TouchableOpacity>
    </RootComponent>
  );
};
export default BusinessInfo;
