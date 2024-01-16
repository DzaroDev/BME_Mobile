import React, { useState, useEffect, useContext, createContext, createRef } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    Keyboard
} from 'react-native';
import { APIMethod, APIURL, APPSTRING, BME_Logo, COLORS } from '../../Constants';
import axios from '../../api/Axios';
import RootComponent from '../../component/RootComponent';
import Loader from '../../component/Loader';


const EnterMobile = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [inputError, setInputError] = useState('');
    const inputRef = createRef();

    const [loginType, setLoginType] = useState('');

    const [isFormValid, setIsFormValid] = useState(false);

    const [loading, setLoading] = useState(false);

    const numberorEmailValidation = () => {
        // if (!input) {
        //     setInputError('Email is required.')
        // } else if (!/\S+@\S+\.\S+/.test(email)) {
        //     setInputError('Email is invalid.')
        // }
    };

    React.useEffect(() => {
        checkLoginType()
    }, [input])

    checkLoginType = () => {
        if (input) {
            if (/\@/.test(input)) {
                setLoginType('email')
            }
            else {
                setLoginType('mobile')
            }
        } else {
            setLoginType('');
        }
    }

    const onPressContinue = () => {
        setLoading(true);
        axios.requestWithData(APIMethod.POST, APIURL.SEND_OTP, { [loginType]: input }).then((res) => {
            if (res.status == 200) {
                navigation.navigate('VerifyOTP', { data: { loginType: loginType, inputValue: input} });
            } else {
                Alert.alert(res.data.message)
            }
            setLoading(false);
        }).catch((error) => {
            setLoading(false)
            Alert.alert(APPSTRING.App_Name, error.data.message)
        })
    };


    const renderUI = () => {
        return <View style={styles.container}>
            <Loader loading={loading} />
            <Image
                source={BME_Logo}
                style={styles.logo} />
            <View style={styles.inputMainView}>
                <View style={styles.inputView}>
                    <TextInput
                        text={input}
                        keyboardType='name-phone-pad'
                        style={styles.inputText}
                        placeholder="Email or Mobile Number"
                        placeholderTextColor= {COLORS.PLACEHOLDER}
                        ref={inputRef}
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}
                        onChangeText={text => setInput(text)}
                        onFocus={() => {
                            setInputError('')
                        }}
                        onBlur={numberorEmailValidation} />
                </View>
                {
                    !!inputError && (
                        <Text style={styles.error}>
                            {inputError}
                        </Text>
                    )
                }
            </View>
            <TouchableOpacity
                onPress={onPressContinue}
                style={styles.continueBtn}>
                <Text style={styles.continueText}>CONTINUE </Text>
            </TouchableOpacity>
        </View>
    }

    return (
        <RootComponent style={styles.container}
            children={renderUI()}>
        </RootComponent>

    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 20
    },
    logo: {
        height: 200,
        aspectRatio: 3 / 2,
        alignSelf: 'center'
    },
    inputMainView: {
        flexDirection: 'column',
        gap: 12
    },
    inputView: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        borderColor: '#000',
        borderBottomWidth: 1,
    },
    inputText: {
        height: 50,
        color: "black"
    },
    forgotAndSignUpText: {
        color: "#49495B",
        fontSize: 12,
        alignSelf: 'center',
        textDecorationLine: 'underline',
        fontWeight: '400'
    },
    continueBtn: {
        width: "100%",
        backgroundColor: COLORS.DARKBLUE,
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    continueText: {
        color: '#FFF',
        fontWeight: '600'
    },
    error: {
        color: 'red',
        fontSize: 12,
    }
});
export default EnterMobile;