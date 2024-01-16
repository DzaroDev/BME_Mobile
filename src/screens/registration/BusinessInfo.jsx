import React, { useState, createRef } from 'react';
import {
    TextInput,
    View,
    Text,
    Keyboard,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Loader from '../../component/Loader';
import RootComponent from '../../component/RootComponent';
import AppStyles from '../../config/AppStyles';
import { APIMethod, APIURL, APPSTRING, COLORS } from '../../Constants';
import axios from '../../api/Axios';


const BusinessInfo = ({ route, navigation }) => {
    // const { email } = route.params.user;

    const [name, setName] = useState();
    const [useremail, setUseremail] = useState();
    const [mobile, setMobile] = useState();
    const [registrationId, setRegistrationId] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [biomedicalExpertise, setBiomedicalExpertise] = useState('');

    const [nameError, setNameError] = useState('');
    const [useremailError, setUseremaillError] = useState('');
    const [mobileNoError, setMobileNoError] = useState('');
    const [registartionIdError, setRegistrationIdError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [cityError, setCityError] = useState('');
    const [stateError, setStateError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [biomedicalExpertiseError, setBiomedicalExpertiseError] = useState('');

    const nameRef = createRef();
    const useremailInputRef = createRef();
    const mobileInputRef = createRef();
    const registartionIdInputRef = createRef();
    const addressIdInputRef = createRef();
    const cityInputRef = createRef();
    const stateInputRef = createRef();
    const descriptionInputRef = createRef();
    const biomedicalExpertiseInputRef = createRef();

    const [loading, setLoading] = useState(false);

    const registerWithoutBusinessInfoCall = (requestBody) => {
        setLoading(true);
        console.log(JSON.stringify(requestBody))
        axios.requestWithData(APIMethod.POST, APIURL.REGISTER, requestBody).then((res) => {
            console.log(JSON.stringify(res))
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
        navigation.navigate('ProductInfo', { ...route.params, company: { name: name, email: useremail, mobile: mobile, mobileCode: '+91', registrationId: registrationId, address1: address, state: state, city: city, description: description, biomedicalExpertise: biomedicalExpertise } })
        // setErrortext('');
        // if (!userName) {
        //     alert('Please fill Name');
        //     return;
        // }
        // if (!userEmail) {
        //     alert('Please fill Email');
        //     return;
        // }
        // if (!userAge) {
        //     alert('Please fill Age');
        //     return;
        // }
        // if (!userAddress) {
        //     alert('Please fill Address');
        //     return;
        // }
        // if (!userPassword) {
        //     alert('Please fill Password');
        //     return;
        // }    
    };
    const handleSkipButton = () => {
        registerWithoutBusinessInfoCall({ ...route.params })
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
                onSubmitEditing={() =>
                    nextInputRef.current &&
                    nextInputRef.current.focus()
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
            {renderTextField('Company Name', 'Company Name', name, setName, nameRef, useremailInputRef, 'next', nameError)}
            {renderTextField('Email', 'Email', useremail, setUseremail, useremailInputRef, mobileInputRef, 'next', useremailError, 'email-address')}
            {renderTextField('Mobile No', 'Mobile No', mobile, setMobile, mobileInputRef, registartionIdInputRef, 'next', mobileNoError, 'phone-pad')}
            {renderTextField('Registration ID', 'Registration ID', registrationId, setRegistrationId, registartionIdInputRef, mobileInputRef, 'next', registartionIdError)}
            {renderTextField('Address', 'Address', address, setAddress, addressIdInputRef, cityInputRef, 'next', addressError)}
            {renderTextField('City', 'City', city, setCity, cityInputRef, stateInputRef, 'next', cityError)}
            {renderTextField('State', 'State', state, setState, stateInputRef, descriptionInputRef, 'next', stateError)}

            <View style={AppStyles.inputMainView}>
                <Text style={AppStyles.inputLabel}>Description</Text>

                <TextInput
                    style={AppStyles.inputView}
                    onChangeText={(description) =>
                        setDescription(description)
                    }
                    value={description}
                    placeholder="Description"
                    placeholderTextColor={COLORS.PLACEHOLDER}
                    autoCapitalize="sentences"
                    ref={descriptionInputRef}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                        biomedicalExpertiseInputRef.current &&
                            biomedicalExpertiseInputRef.current.focus()
                    }}
                    blurOnSubmit={false}
                />
                {
                    !!descriptionError && (
                        <Text style={AppStyles.error}>
                            {descriptionError}
                        </Text>
                    )
                }
            </View>
            <View style={AppStyles.inputMainView}>
                <Text style={AppStyles.inputLabel}>Biomedical Expertise</Text>
                <TextInput
                    style={AppStyles.inputView}
                    onChangeText={(value) =>
                        setBiomedicalExpertise(value)
                    }
                    value={biomedicalExpertise}
                    placeholder="Biomedical Expertise"
                    placeholderTextColor={COLORS.PLACEHOLDER}
                    autoCapitalize="sentences"
                    ref={biomedicalExpertiseInputRef}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                />
                {
                    !!biomedicalExpertiseError && (
                        <Text style={AppStyles.error}>
                            {biomedicalExpertiseError}
                        </Text>
                    )
                }
            </View>

            <TouchableOpacity
                style={AppStyles.continueBtn}
                activeOpacity={0.5}
                onPress={handleSubmitButton}>
                <Text style={AppStyles.continueText}>CONTINUE</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={AppStyles.continueBtn}
                activeOpacity={0.5}
                onPress={handleSkipButton}>
                <Text style={AppStyles.continueText}>SKIP</Text>
            </TouchableOpacity>

        </RootComponent>
    );
};
export default BusinessInfo;
