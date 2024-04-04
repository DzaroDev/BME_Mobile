// Import React and Component
import React, { useState, createRef } from "react";
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
import { APIMethod, APIURL, APPSTRING, COLORS } from "../../Constants";
import AppStyles from "../../config/AppStyles";
import Axios from "../../api/Axios";
import PageTitle from "../../navigation/PageTitle";
import { isEmpty } from "../../config/Validations";
import { useRegisterStateContext } from "../../provider/RegisterStateProvider";

const ProductInfo = ({ route, navigation }) => {
  const ProductInfoFields = {
    Name: "name",
    ProductInfo: "description1",
    Description: "description2",
    ModelName: "modelName",
    Specification: "specification",
    Category: "category",
    Price: "price",
  };

  const {
    service, user, company,
    actions: {  updateService },
  } = useRegisterStateContext();
  const {name,description1,description2, modelName, specification, category,price} = service;

  const nameRef = createRef();
  const productInfoInputRef = createRef();
  const descriptionInputRef = createRef();
  const modelNameInputRef = createRef();
  const specificationInputRef = createRef();
  const categoryInputRef = createRef();
  const priceInputRef = createRef();

  const [errors, setErrors] = useState({
    name: '',
    productInfo: '',
    description: '',
    modelName: '',
    specification: '',
    category: '',
    price: '',
  });

  const [loading, setLoading] = useState(false);

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
    let input = '';
    let inputError = '';
    Object.keys(ProductInfoFields).forEach((key, index) => {
      switch (ProductInfoFields[key]) {
        case ProductInfoFields.Name:
          input = name;
          inputError = APPSTRING.Required_Product_Name;
          break;
        case ProductInfoFields.ProductInfo:
          input = description1;
          inputError = APPSTRING.Required_Product_Service;
          break;
        case ProductInfoFields.Description:
          input = description2;
          inputError = APPSTRING.Required_Product_Description;
          break;
        case ProductInfoFields.ModelName:
          input = modelName;
          inputError = APPSTRING.Required_Product_Model_Name;
          break;
        case ProductInfoFields.Specification:
          input = specification;
          inputError = APPSTRING.Required_Product_Specification;
          break;
        case ProductInfoFields.Category:
          input = category;
          inputError = APPSTRING.Required_Product_Category;
          break;
        case ProductInfoFields.Price:
          input = price;
          inputError = APPSTRING.Required_Product_Price;
          break;
      }
      if (isEmpty(input)) {
        updatedErrors[ProductInfoFields[key]] = inputError;
        valid = false;
      }
    });

    setErrors(updatedErrors);
    return valid;
  };

  const handleSubmitButton = () => {
    if (validateForm()) {
      registerAPICall({
         user, company,service
      });
    }
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
          value={service[id]}
          style={AppStyles.inputView}
          onChangeText={(value) => {
            updateService({[id]: value});
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
          onFocus={() => {
            setErrors({ ...errors, id: '' });
          }}
        />
        {!!errors[id] && <Text style={AppStyles.error}>{errors[id]}</Text>}
      </View>
    );
  };

  return (
    <RootComponent
      style={[AppStyles.container, AppStyles.containerPadding]}
      title={PageTitle.PRODUCT_INFO}
    >
      <Loader loading={loading} />
      {renderTextField(
        "Name",
        "Name",
        ProductInfoFields.Name,
        nameRef,
        productInfoInputRef,
        "next",
      )}
      {renderTextField(
        "Product/Service you provide",
        "Product/Service you provide",
        ProductInfoFields.ProductInfo,
        productInfoInputRef,
        descriptionInputRef,
        "next",
      )}
      {renderTextField(
        "Description",
        "Description",
        ProductInfoFields.Description,
        descriptionInputRef,
        modelNameInputRef,
        "next",
      )}
      {renderTextField(
        "Model Name",
        "Model Name",
        ProductInfoFields.ModelName,
        modelNameInputRef,
        specificationInputRef,
        "next",
      )}
      {renderTextField(
        "Specification",
        "Specification",
        ProductInfoFields.Specification,
        specificationInputRef,
        categoryInputRef,
        "next",
      )}
      {renderTextField(
        "Category",
        "Category",
        ProductInfoFields.Category,
        categoryInputRef,
        priceInputRef,
        "next",
      )}
      {renderTextField(
        "Price",
        "Price",
        ProductInfoFields.Price,
        priceInputRef,
        undefined,
        "done",
      )}
      <TouchableOpacity
        style={AppStyles.continueBtn}
        activeOpacity={0.5}
        onPress={handleSubmitButton}
      >
        <Text style={AppStyles.continueText}>CONTINUE</Text>
      </TouchableOpacity>
    </RootComponent>
  );
};
export default ProductInfo;
