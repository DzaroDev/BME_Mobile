import {
  View,
  Text,
  Keyboard,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import RootComponent from "../../component/RootComponent";
import AppStyles from "../../config/AppStyles";
import {
  APIMethod,
  APIURL,
  APPSTRING,
  COLORS,
  DateTimeFormat,
  Regex,
} from "../../Constants";
import Loader from "../../component/Loader";
import Axios from "../../api/Axios";
import PageTitle from "../../navigation/PageTitle";
import { dateStringToUTC } from "../../Utils";

const CreateJob = ({ navigation }) => {
  const createJobFields = [
    {
      title: "Company Name",
      placeholder: "Company Name",
      fieldName: "companyName",
      type: "text",
      regex: Regex.emptyStringRegex,
      keyboardType: "text",
      returnKeyType: "next",
    },
    {
      title: "Company Email",
      placeholder: "Company Email",
      fieldName: "companyEmail",
      type: "text",
      regex: Regex.emptyStringRegex,
      keyboardType: "text",
      returnKeyType: "next",
    },
    {
      title: "Job Title",
      placeholder: "Job Title",
      fieldName: "jobTitle",
      type: "text",
      regex: Regex.emptyStringRegex,
      keyboardType: "text",
      returnKeyType: "next",
    },
    {
      title: "Job Description",
      placeholder: "Job Description",
      fieldName: "jobDescription",
      type: "text",
      regex: Regex.emptyStringRegex,
      keyboardType: "text",
      returnKeyType: "next",
    },
    {
      title: "Employment Type",
      placeholder: "Employment Type",
      fieldName: "employmentType",
      type: "text",
      regex: Regex.emptyStringRegex,
      keyboardType: "text",
      returnKeyType: "next",
    },
    {
      title: "Job Experience",
      placeholder: "Job Experience",
      fieldName: "jobExperience",
      type: "numeric",
      regex: Regex.emptyStringRegex,
      keyboardType: "numeric",
      returnKeyType: "next",
    },
    {
      title: "Job Location",
      placeholder: "Job Location",
      fieldName: "jobLocation",
      type: "text",
      regex: Regex.emptyStringRegex,
      keyboardType: "text",
      returnKeyType: "next",
    },
    {
      title: "Job Start Date",
      placeholder: `Job Start Date (${DateTimeFormat})`,
      fieldName: "jobStartDate",
      type: "calender",
      regex: Regex.dateFormatRegex,
      keyboardType: "text",
      returnKeyType: "next",
    },
    {
      title: "Industry",
      placeholder: "Industry",
      fieldName: "industry",
      type: "text",
      regex: Regex.emptyStringRegex,
      keyboardType: "text",
      returnKeyType: "next",
    },
    {
      title: "Skills",
      placeholder: "Skills",
      fieldName: "skills",
      type: "text",
      regex: Regex.emptyStringRegex,
      keyboardType: "text",
      returnKeyType: "next",
    },
    {
      title: "Salary",
      placeholder: "Salary",
      fieldName: "salary",
      type: "numeric",
      regex: Regex.emptyStringRegex,
      keyboardType: "numeric",
      returnKeyType: "next",
    },
    {
      title: "Total Job Openings",
      placeholder: "Total Job Openings",
      fieldName: "totalJobOpenings",
      type: "numeric",
      regex: Regex.emptyStringRegex,
      keyboardType: "numeric",
      returnKeyType: "done",
    },
  ];

  const [formData, setFormData] = useState({
    companyName: "",
    companyEmail: "",
    jobTitle: "",
    jobDescription: "",
    employmentType: "",
    jobExperience: null,
    jobLocation: "",
    jobStartDate: "",
    industry: "",
    skills: "",
    salary: null,
    totalJobOpenings: null,
  });

  const [errors, setErrors] = useState({
    companyName: "",
    companyEmail: "",
    jobTitle: "",
    jobDescription: "",
    employmentType: "",
    jobExperience: "",
    jobLocation: "",
    jobStartDate: "",
    industry: "",
    skills: "",
    salary: "",
    totalJobOpenings: "",
  });

  const inputRefs = {
    companyName: useRef(null),
    companyEmail: useRef(null),
    jobTitle: useRef(null),
    jobDescription: useRef(null),
    employmentType: useRef(null),
    jobExperience: useRef(null),
    jobLocation: useRef(null),
    jobStartDate: useRef(null),
    industry: useRef(null),
    skills: useRef(null),
    salary: useRef(null),
    totalJobOpenings: useRef(null),
  };

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const updatedErrors = { ...errors };

    createJobFields.forEach((createJobInfo, index) => {
      switch (createJobInfo.type) {
        case "calender":
          if (Regex.emptyStringRegex.test(formData[createJobInfo.fieldName])) {
            updatedErrors[
              createJobInfo.fieldName
            ] = `${createJobInfo.title} can't be empty`;
            valid = false;
          } else if (
            !Regex.dateFormatRegex.test(formData[createJobInfo.fieldName])
          ) {
            updatedErrors[createJobInfo.fieldName] = `Invalid date`;
            valid = false;
          } else {
            updatedErrors[createJobInfo.fieldName] = "";
          }
          break;
        case "numeric":
          if (
            !formData[createJobInfo.fieldName] &&
            !formData[createJobInfo.fieldName] !== 0
          ) {
            updatedErrors[
              createJobInfo.fieldName
            ] = `${createJobInfo.title} can't be empty`;
            valid = false;
          } else {
            updatedErrors[createJobInfo.fieldName] = "";
          }
          break;

        default:
          if (createJobInfo.regex.test(formData[createJobInfo.fieldName])) {
            updatedErrors[
              createJobInfo.fieldName
            ] = `${createJobInfo.title} can't be empty`;
            valid = false;
          } else {
            updatedErrors[createJobInfo.fieldName] = "";
          }
      }
    });
    setErrors(updatedErrors);
    return valid;
  };

  renderNumberField = (
    inputLabel,
    placeholder,
    inputField,
    nextInputRef,
    returnKeyType,
    keyboardType
  ) => {
    return (
      <View style={AppStyles.inputMainView}>
        <Text style={AppStyles.inputLabel}>{inputLabel}</Text>
        <TextInput
          value={formData[inputField]}
          style={AppStyles.inputView}
          onChangeText={(value) => {
            const number = parseFloat(value); // Parse input text as float
            setFormData({
              ...formData,
              [inputField]: isNaN(number) ? null : number,
            });
          }}
          placeholder={placeholder}
          placeholderTextColor={COLORS.PLACEHOLDER}
          keyboardType={keyboardType}
          ref={inputRefs[inputField]}
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
        {!!errors[inputField] && (
          <Text style={AppStyles.error}>{errors[inputField]}</Text>
        )}
      </View>
    );
  };

  renderTextField = (
    inputLabel,
    placeholder,
    inputField,
    nextInputRef,
    returnKeyType,
    keyboardType
  ) => {
    return (
      <View style={AppStyles.inputMainView}>
        <Text style={AppStyles.inputLabel}>{inputLabel}</Text>
        <TextInput
          value={formData[inputField]}
          style={AppStyles.inputView}
          onChangeText={(value) => {
            setFormData({ ...formData, [inputField]: value });
          }}
          placeholder={placeholder}
          placeholderTextColor={COLORS.PLACEHOLDER}
          keyboardType={keyboardType}
          ref={inputRefs[inputField]}
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
        {!!errors[inputField] && (
          <Text style={AppStyles.error}>{errors[inputField]}</Text>
        )}
      </View>
    );
  };

  const onPressContinue = () => {
    if (validateForm()) {
      setLoading(true);
      const reqBody = {
        ...formData,
        hiringOrganization: {
          companyEmail: formData.companyEmail,
          companyName: formData.companyName,
        },
        jobStartDate: dateStringToUTC(formData.jobStartDate),
      };
      delete reqBody.companyName, delete reqBody.companyEmail;
      Axios.requestWithData(APIMethod.POST, APIURL.CREATE_JOB, reqBody)
        .then(async (res) => {
          setLoading(false);
          if (res.status == 200) {
            navigation.goBack();
            Alert.alert(APPSTRING.App_Name, "Job created successfully.");
          } else {
            Alert.alert(APPSTRING.App_Name, res.data.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          Alert.alert(APPSTRING.App_Name, error.data.message);
        });
    }
  };

  const renderUI = () => {
    return (
      <>
        <Loader loading={loading} />
        {createJobFields.map((createJobInfo, index) => {
          if (createJobInfo.type == "numeric") {
            return renderNumberField(
              createJobInfo.title,
              createJobInfo.placeholder,
              createJobInfo.fieldName,
              createJobFields.length - 1 === index
                ? undefined
                : inputRefs[createJobFields[index + 1].fieldName],
              createJobInfo.returnKeyType,
              createJobInfo.keyboardType
            );
          } else {
            return renderTextField(
              createJobInfo.title,
              createJobInfo.placeholder,
              createJobInfo.fieldName,
              createJobFields.length - 1 === index
                ? undefined
                : inputRefs[createJobFields[index + 1].fieldName],
              createJobInfo.returnKeyType,
              createJobInfo.keyboardType
            );
          }
        })}
        <TouchableOpacity
          onPress={onPressContinue}
          style={AppStyles.continueBtn}
        >
          <Text style={AppStyles.continueText}>CREATE JOB</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <RootComponent
      style={[AppStyles.container, AppStyles.containerPadding]}
      title={PageTitle.CREATE_JOB}
      children={renderUI()}
    ></RootComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
});
export default CreateJob;
