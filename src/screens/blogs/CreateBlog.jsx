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
import { APIMethod, APIURL, APPSTRING, COLORS, Regex } from "../../Constants";
import Loader from "../../component/Loader";
import Axios from "../../api/Axios";
import PageTitle from "../../navigation/PageTitle";
import { dateStringToUTC } from "../../Utils";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";

const CreateBlog = ({ navigation }) => {
  const createJobFields = [
    {
      title: "Title",
      placeholder: "Title",
      fieldName: "titleText",
      type: "text",
      regex: Regex.emptyStringRegex,
      keyboardType: "text",
      returnKeyType: "next",
    },
    {
      title: "Main Text",
      placeholder: "Main Text",
      fieldName: "mainText",
      type: "html",
      regex: Regex.emptyStringRegex,
      keyboardType: "text",
      returnKeyType: "next",
    },
    {
      title: "Summary Text",
      placeholder: "Summary Text",
      fieldName: "summaryText",
      type: "html",
      regex: Regex.emptyStringRegex,
      keyboardType: "text",
      returnKeyType: "next",
    },
    {
      title: "Status",
      placeholder: "Status",
      fieldName: "status",
      type: "numeric",
      regex: Regex.emptyStringRegex,
      keyboardType: "numeric",
      returnKeyType: "next",
    },
    {
      title: "Category",
      placeholder: "Category",
      fieldName: "category",
      type: "text",
      regex: Regex.emptyStringRegex,
      keyboardType: "text",
      returnKeyType: "done",
    },
  ];

  const [formData, setFormData] = useState({
    titleText: "",
    mainText: "",
    summaryText: "",
    status: null,
    category: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    mainText: "",
    summaryText: "",
    status: "",
    category: "",
  });

  const inputRefs = {
    title: useRef(null),
    mainText: useRef(null),
    summaryText: useRef(null),
    status: useRef(null),
    category: useRef(null),
  };

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const updatedErrors = { ...errors };

    createJobFields.forEach((createBlogInfo, index) => {
      switch (createBlogInfo.fieldName) {
        case "jobStartDate":
          if (Regex.emptyStringRegex.test(formData[createBlogInfo.fieldName])) {
            updatedErrors[
              createBlogInfo.fieldName
            ] = `${createBlogInfo.title} can't be empty`;
            valid = false;
          } else if (
            !Regex.dateFormatRegex.test(formData[createBlogInfo.fieldName])
          ) {
            updatedErrors[createBlogInfo.fieldName] = `Invalid date`;
            valid = false;
          } else {
            updatedErrors[createBlogInfo.fieldName] = "";
          }
          break;
        case "status":
          if (
            !formData[createBlogInfo.fieldName] &&
            !formData[createBlogInfo.fieldName] !== 0
          ) {
            updatedErrors[
              createBlogInfo.fieldName
            ] = `${createBlogInfo.title} can't be empty`;
            valid = false;
          } else {
            updatedErrors[createBlogInfo.fieldName] = "";
          }
          break;

        default:
          if (createBlogInfo.regex.test(formData[createBlogInfo.fieldName])) {
            updatedErrors[
              createBlogInfo.fieldName
            ] = `${createBlogInfo.title} can't be empty`;
            valid = false;
          } else {
            updatedErrors[createBlogInfo.fieldName] = "";
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
            const number = parseFloat(value);
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

  renderHTMLEditor = (
    inputLabel,
    placeholder,
    inputField,
    nextInputRef,
    returnKeyType,
    keyboardType
  ) => {
    return (
      <View style={[AppStyles.inputMainView, { zIndex: 120 }]}>
        <Text style={AppStyles.inputLabel}>{inputLabel}</Text>
        <View style={styles.toolbarContainer}>
          <RichToolbar
            style={styles.toolbar}
            editor={inputRefs[inputField]}
            disabled={false}
            onPressAddImage={() => console.log("add image")}
          />
        </View>
        <View style={styles.editorContainer}>
          <RichEditor
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            style={styles.editor}
            ref={inputRefs[inputField]}
            placeholder={placeholder}
            placeholderTextColor={COLORS.PLACEHOLDER}
            onChange={(value) => {
              setFormData({ ...formData, [inputField]: value });
            }}
            initialContentHTML={formData[inputField]}
            onSubmitEditing={() => {
              if (nextInputRef) {
                nextInputRef.current && nextInputRef.current.focus();
              } else {
                Keyboard.dismiss();
              }
            }}
          />
        </View>
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
      };
      Axios.requestWithData(APIMethod.POST, APIURL.CREATE_BLOG, reqBody)
        .then(async (res) => {
          setLoading(false);
          if (res.status == 200) {
            navigation.goBack();
            Alert.alert(APPSTRING.App_Name, "Blog created successfully.");
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
        {createJobFields.map((createBlogInfo, index) => {
          switch (createBlogInfo.type) {
            case "html":
              return renderHTMLEditor(
                createBlogInfo.title,
                createBlogInfo.placeholder,
                createBlogInfo.fieldName,
                createJobFields.length - 1 === index
                  ? undefined
                  : inputRefs[createJobFields[index + 1].fieldName],
                createBlogInfo.returnKeyType,
                createBlogInfo.keyboardType
              );
            case "numeric":
              return renderNumberField(
                createBlogInfo.title,
                createBlogInfo.placeholder,
                createBlogInfo.fieldName,
                createJobFields.length - 1 === index
                  ? undefined
                  : inputRefs[createJobFields[index + 1].fieldName],
                createBlogInfo.returnKeyType,
                createBlogInfo.keyboardType
              );
            default:
              return renderTextField(
                createBlogInfo.title,
                createBlogInfo.placeholder,
                createBlogInfo.fieldName,
                createJobFields.length - 1 === index
                  ? undefined
                  : inputRefs[createJobFields[index + 1].fieldName],
                createBlogInfo.returnKeyType,
                createBlogInfo.keyboardType
              );
          }
        })}
        <TouchableOpacity
          onPress={onPressContinue}
          style={AppStyles.continueBtn}
        >
          <Text style={AppStyles.continueText}>CREATE BLOG</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <RootComponent
      style={[AppStyles.container, AppStyles.containerPadding]}
      title={PageTitle.CREATE_BLOG}
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
  toolbarContainer: {
    flex: 1,
  },
  toolbar: {
    flex: 1,
  },
  editorContainer: {
    flex: 1,
  },
  editor: {
    borderColor: "gray",
    borderWidth: 1,
    minHeight: 40,
    borderRadius: 5,
  },
});
export default CreateBlog;
