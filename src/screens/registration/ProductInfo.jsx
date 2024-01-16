// Import React and Component
import React, { useState, createRef } from 'react';
import {
    TextInput,
    View,
    Text,
    Keyboard,
    TouchableOpacity,
    Alert
} from 'react-native';
import Loader from '../../component/Loader';
import RootComponent from '../../component/RootComponent';
import { APIMethod, APIURL, APPSTRING, COLORS } from '../../Constants';
import AppStyles from '../../config/AppStyles';
import axios from '../../api/Axios';


const ProductInfo = ({ route, navigation }) => {
    const [name, setName] = useState();
    const [productInfo, setProductInfo] = useState('');
    const [description, setDescription] = useState('');
    const [modelName, setModelName] = useState('');
    const [specification, setSpecification] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const [nameError, setNameError] = useState('');
    const [productInfoError, setProductInfoError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [modelNameError, setModelNameError] = useState('');
    const [specificationError, setSpecificationError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [priceError, setPriceError] = useState('');

    const nameRef = createRef();
    const productInfoInputRef = createRef();
    const descriptionInputRef = createRef();
    const modelNameInputRef = createRef();
    const specificationInputRef = createRef();
    const categoryInputRef = createRef();
    const priceInputRef = createRef();

    const [loading, setLoading] = useState(false);


    const registerAPICall = (requestBody) => {
        console.log(JSON.stringify(requestBody))
        setLoading(true);
        axios.requestWithData(APIMethod.POST, APIURL.REGISTER, requestBody).then((res) => {
            if (res.status == 200) {
                navigation.navigate('RegistrationSucess', { data: res.data.data });
            } else {
                Alert.alert(APPSTRING.App_Name, res.data.message)
            }
            setLoading(false);
        }).catch((error) => {
            setLoading(false)
            Alert.alert(APPSTRING.App_Name, error.data.message)
        })
    }

    const handleSubmitButton = () => {
        registerAPICall({ ...route.params, service:{ name:name, description1: productInfo, description2: description, modelName: modelName, specification: specification, category: category, price: price} })
    };

    renderTextField = (inputLabel, placeholder, inputState, setInputState, inputRef, nextInputRef, returnKeyType, inputError, keyboardType) => {
        return <View style={AppStyles.inputMainView}>
            <Text style={AppStyles.inputLabel}>{inputLabel}</Text>
            <TextInput
                value={inputState}
                style={AppStyles.inputView}
                onChangeText={(value) => { setInputState(value) }}
                placeholder={placeholder}
                placeholderTextColor={COLORS.PLACEHOLDER}
                keyboardType={keyboardType}
                ref={inputRef}
                returnKeyType={returnKeyType}
                onSubmitEditing={() => {
                    if (nextInputRef) {
                        nextInputRef.current &&
                            nextInputRef.current.focus()
                    } else {
                        Keyboard.dismiss()
                    }
                }

                }
                blurOnSubmit={false}
            />
            {
                !!inputError && (
                    <Text style={AppStyles.error}>
                        {inputError}
                    </Text>
                )
            }
        </View>
    }

    return (
        <RootComponent style={AppStyles.container}>
            <Loader loading={loading} />
            {renderTextField('Name', 'Name', name, setName, nameRef, productInfoInputRef, 'next', nameError)}
            {renderTextField('Product/Service you provide', 'Product/Service you provide', productInfo, setProductInfo, productInfoInputRef, descriptionInputRef, 'next', productInfoError)}
            {renderTextField('Description', 'Description', description, setDescription, descriptionInputRef, modelNameInputRef, 'next', descriptionError)}
            {renderTextField('Model Name', 'Model Name', modelName, setModelName, modelNameInputRef, specificationInputRef, 'next', modelNameError)}
            {renderTextField('Specification', 'Specification', specification, setSpecification, specificationInputRef, categoryInputRef, 'next', specificationError)}
            {renderTextField('Category', 'Category', category, setCategory, categoryInputRef, priceInputRef, 'next', categoryError)}
            {renderTextField('Price', 'Price', price, setPrice, priceInputRef, undefined, 'done', priceError)}
            <TouchableOpacity
                style={AppStyles.continueBtn}
                activeOpacity={0.5}
                onPress={handleSubmitButton}>
                <Text style={AppStyles.continueText}>CONTINUE</Text>
            </TouchableOpacity>
        </RootComponent>
    );
};
export default ProductInfo;
