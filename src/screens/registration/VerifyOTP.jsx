import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';
import Root from '../../component/RootComponent';
import { APIMethod, APIURL, APPSTRING, BME_Logo, COLORS } from '../../Constants';
import axios from '../../api/Axios';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Loader from '../../component/Loader';
import Axios from '../../api/Axios';


const VerifyOTP = ({ route, navigation }) => {
    const [otp, setOTP] = useState('222666');
    const [loading, setLoading] = useState(false);
    const { loginType, inputValue } = route.params.data;

    const [inputError, setInputError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);


    // const numberorEmailValidation = () => {
    //     if (!input) {
    //         setInputError('Email is required.')
    //     } else if (!/\S+@\S+\.\S+/.test(email)) {
    //         setInputError('Email is invalid.')
    //     }
    // };

    const onPressContinue = () => {
        setLoading(true)
        Axios.requestWithData(APIMethod.POST, APIURL.VERIFY_OTP, { [loginType]: inputValue, code: otp }).then((res) => {
            if (res.status == 200) {
                navigation.navigate('PersonalInfo', { user: { [loginType]: inputValue } });
            } else {
                Alert.alert(res.message)
            }
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            Alert.alert(APPSTRING.App_Name, error.data.message)
        })
    };

    const onPressTermsAndConditions = () => {

    }

    const onPressPrivacyPolicy = () => {

    }

    const renderUI = () => {
        return <>
            <Loader loading={loading} />
            {
                loginType == 'email' ?
                    <View style={{ alignItems: 'center', gap: 15 }}>
                        <Text style={{ fontWeight: '600', fontSize: 18 }}>Verify your email</Text>
                        <Text style={{ fontWeight: '400', fontSize: 16 }}>Verify the 6-digit OTP sent to</Text>
                        <Text style={{ fontWeight: '600', fontSize: 16 }}>{inputValue}</Text>
                    </View> :
                    <View style={{ alignItems: 'center', gap: 15 }}>
                        <Text style={{ fontWeight: '600', fontSize: 18 }}>Verify your number</Text>
                        <Text style={{ fontWeight: '400', fontSize: 16 }}>Verify the 6-digit OTP sent to</Text>
                        <Text style={{ fontWeight: '600', fontSize: 16 }}>{inputValue}</Text>
                    </View>
            }


            <OTPInputView
                style={{ height: 60, padding: 12 }}
                pinCount={6}
                secureTextEntry
                code={otp}
                onCodeChanged={code => { setOTP(code) }}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                    console.log(`Code is ${code}, you are good to go!`)
                }}
            />
            <TouchableOpacity
                onPress={onPressContinue}
                style={styles.continueBtn}>
                <Text style={styles.continueText}>CONTINUE </Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', gap: 8 }}>
                <Text style={{ fontWeight: '400', fontSize: 16 }}>By hitting continue you agree to our </Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={onPressTermsAndConditions}>
                        <Text style={styles.underlineText}>Terms and Conditions</Text>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '400' }}> and </Text>
                    <TouchableOpacity
                        onPress={onPressPrivacyPolicy}>
                        <Text style={styles.underlineText}>Privacy policy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    }

    return (
        <Root style={styles.container}
            children={renderUI()}>
        </Root>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE,
        justifyContent: 'start',
        flexDirection: 'column',
        gap: 20
    },
    inputMainView: {
        flexDirection: 'column',
        gap: 12
    },
    continueBtn: {
        width: "100%",
        backgroundColor: "#326A91",
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
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'lightgray'
    },
    underlineStyleHighLighted: {
        borderColor: "#000",
    },
    underlineText: {
        color: "#49495B",
        fontSize: 12,
        alignSelf: 'center',
        textDecorationLine: 'underline',
        fontWeight: '400'
    },
});
export default VerifyOTP;