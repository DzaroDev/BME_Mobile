import {
  View,
  Text,
  Keyboard,
  Alert,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import RootComponent from "../../component/RootComponent";
import AppStyles from "../../config/AppStyles";
import { APIMethod, APIURL, APPSTRING, COLORS } from "../../Constants";
import Loader from "../../component/Loader";
import Axios from "../../api/Axios";
import { Calendar, LocaleConfig } from "react-native-calendars";
import PageTitle from "../../navigation/PageTitle";

const PostYourQuestion = ({ route, navigation }) => {
  const postQuestionFields = [
    {
      title: "Question",
      placeholder: "Question",
      fieldName: "content",
      type: "text",
      keyboardType: "text",
      returnKeyType: "done",
    },
  ];

  const [formData, setFormData] = useState({
    content: '',
  });

  const [errors, setErrors] = useState({
    content: '',
  });

  const inputRefs = {
    content: useRef(null),
  };

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    return true;
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
          value={formData[inputField].toString()}
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
      Axios.requestWithData(APIMethod.POST, APIURL.CREATE_FORUM, formData)
        .then(async (res) => {
          setLoading(false);
          if (res.status == 200) {
            navigation.goBack();
            Alert.alert(APPSTRING.App_Name, "Your question successfully submitted.");
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
        {postQuestionFields.map((postField, index) => {
          return renderTextField(
            postField.title,
            postField.placeholder,
            postField.fieldName,
            undefined,
            postField.returnKeyType,
            postField.keyboardType
          );
        })}
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
      title={PageTitle.POST_YOUR_QUESTION}
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
});
export default PostYourQuestion;
