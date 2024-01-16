import React, { createRef, useState } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard
} from 'react-native';
import RootComponent from '../../component/RootComponent';
import { COLORS } from '../../Constants';
import AppStyles from '../../config/AppStyles';


const PersonalInfo = ({ route, navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');


    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const firstNameRef = createRef();
    const lastNameRef = createRef();
    const passwordInputRef = createRef();

    const [isFormValid, setIsFormValid] = useState(false);



    const formValidation = () => {
        // if (!input) {
        //     setInputError('Email is required.')
        // } else if (!/\S+@\S+\.\S+/.test(email)) {
        //     setInputError('Email is invalid.')
        // }
    };

    const onPressContinue = () => {
        navigation.navigate('ProfileType', { user: { ...route.params.user, firstName: firstName, lastName: lastName, password: password } });
    };


    const renderUI = () => {
        return <>
            <Text style={{ fontWeight: '800', fontSize: 24, alignSelf: 'center' }}>Let's get started!</Text>
            <Text style={{ fontWeight: '400', fontSize: 18, alignSelf: 'center' }}>First, some details</Text>

            <Text style={AppStyles.inputLabel}>First Name</Text>
            <View style={AppStyles.inputMainView}>
                <View style={AppStyles.inputView}>
                    <TextInput
                        style={AppStyles.inputText}
                        placeholder="First Name*"
                        placeholderTextColor={COLORS.PLACEHOLDER}
                        onChangeText={text => setFirstName(text)}
                        ref={firstNameRef}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            lastNameRef.current &&
                            lastNameRef.current.focus()
                        }
                        blurOnSubmit={false}
                        onFocus={() => {
                            setFirstNameError('')
                        }}
                    />
                </View>
                {
                    !!firstNameError && (
                        <Text style={AppStyles.error}>
                            {firstNameError}
                        </Text>
                    )
                }
            </View>

            <View style={AppStyles.inputMainView}>
                <Text style={AppStyles.inputLabel}>Last Name</Text>
                <View style={AppStyles.inputView}>
                    <TextInput
                        style={AppStyles.inputText}
                        placeholder="Last Name*"
                        placeholderTextColor={COLORS.PLACEHOLDER}
                        onChangeText={text => setLastName(text)}
                        onFocus={() => {
                            setLastNameError('')
                        }}
                        ref={lastNameRef}
                        returnKeyType="done"
                        onSubmitEditing={() =>
                            passwordInputRef.current &&
                            passwordInputRef.current.focus()
                        }
                        blurOnSubmit={false}>
                    </TextInput>
                </View>
                {
                    !!lastNameError && (
                        <Text style={AppStyles.error}>
                            {lastNameError}
                        </Text>
                    )
                }
            </View>
            <View style={AppStyles.inputMainView}>
                <Text style={AppStyles.inputLabel}>Password</Text>
                <TextInput
                    value={password}
                    style={AppStyles.inputView}
                    onChangeText={(password) => setPassword(password)}
                    placeholder="Password"
                    keyboardType='visible-password'
                    placeholderTextColor={COLORS.PLACEHOLDER}
                    ref={passwordInputRef}
                    secureTextEntry
                    returnKeyType="next"
                    onSubmitEditing={() =>
                        Keyboard.dismiss()
                    }
                    blurOnSubmit={false}
                />
                {
                    !!passwordError && (
                        <Text style={AppStyles.error}>
                            {passwordError}
                        </Text>
                    )
                }
            </View>

            <TouchableOpacity
                onPress={onPressContinue}
                style={AppStyles.continueBtn}>
                <Text style={AppStyles.continueText}>CONTINUE</Text>
            </TouchableOpacity>
        </>
    }

    return (
        <RootComponent style={AppStyles.container}
            children={renderUI()}>
        </RootComponent>
    );
}
export default PersonalInfo;