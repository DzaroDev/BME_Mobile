import React, { useState, useEffect, createRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    Alert
} from 'react-native';
import { APIMethod, APIURL, APPSTRING, BME_Logo, COLORS, LocalStorage } from '../Constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from '../api/Axios';
import { AuthContext } from '../provider/AuthProvider';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Loader from '../component/Loader';
import RootComponent from '../component/RootComponent';
import { UserContext } from '../provider/UserProvider';

const Login = ({ navigation }) => {
    const [input, setInput] = useState('9999999999');
    const [password, setPassword] = useState('Passs@1234');

    const [inputError, setInputError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isPasswordSecure, setIsPasswordSecure] = useState(true);

    const inputRef = createRef();
    const passInputRef = createRef();

    const [loginType, setLoginType] = useState('');


    const [loading, setLoading] = useState(false);

    const { setIsLoggedIn } = React.useContext(AuthContext);
    const { setUserDetails } = React.useContext(UserContext);
    const { setItem } = useAsyncStorage(LocalStorage.AccessToken);

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (inputError || passwordError) {
            setIsFormValid(false)
        } else {
            setIsFormValid(true)
        }
    }, [inputError, passwordError])

    useEffect(() => {
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

    const emailValidation = () => {
        // if (!input) {
        //     setInputError('Email is required.')
        // } else if (!/\S+@\S+\.\S+/.test(input)) {
        //     setInputError('Email is invalid.')
        // }
    };

    const passwordValidation = () => {
        // if (!password) {
        //     setPasswordError('Password is required.')
        // } else if (password.length < 6) {
        //     setPasswordError('Password must be at least 6 characters.')
        // }
    };

    const onPressLogin = () => {
        setLoading(true)
        axios.requestWithData(APIMethod.POST, APIURL.AUTH, { [loginType]: input, 'password': password }).then(async (res) => {
            setLoading(false)
            if (res.status == 200) {
                setUserDetails(res.data.data.user);
                console.log(res.data.data.token);
                await setItem(res.data.data.token).then(()=> setIsLoggedIn(true)).catch(()=> setIsLoggedIn(false));
               
            } else {
                await setItem(null);
                setIsLoggedIn(false);
                setUserDetails(null)
                Alert.alert(APPSTRING.App_Name, res.data.message)
            }
        }).catch((error) => {
            console.log(error)
            setLoading(false)
            setIsLoggedIn(false);
            setUserDetails(null)
            Alert.alert(APPSTRING.App_Name, error.data.message)
        })
    };
    const onPressForgotPassword = () => {
        // Do something about forgot password operation
    };
    const onPressSignUp = () => {
        navigation.navigate('EnterMobile')
    };

    const showEyeIcon = () => {
        return <TextInput.Icon
            name={() => <MaterialCommunityIcons name={isPasswordSecure ? "eye-off" : "eye"} size={28} />} // where <Icon /> is any component from vector-icons or anything else
            onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
        />
    }

    const renderUI = () => {
        return <>
            <Loader loading={loading} />
            <Image
                source={BME_Logo}
                style={styles.logo} />
            <View style={styles.inputMainView}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email/Mobile"
                        placeholderTextColor={COLORS.PLACEHOLDER}
                        onChangeText={text => setInput(text)}
                        onFocus={() => {
                            setInputError('')
                        }}
                        ref={inputRef}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            passInputRef.current &&
                                passInputRef.current.focus()
                        }}
                        onBlur={emailValidation} />
                </View>
                {
                    !!inputError && (
                        <Text style={styles.error}>
                            {inputError}
                        </Text>
                    )
                }
            </View>

            <View style={styles.inputMainView}>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry
                        keyboardType='visible-password'
                        placeholder="Password"
                        placeholderTextColor={COLORS.PLACEHOLDER}
                        onChangeText={text => setPassword(text)}
                        onFocus={() => {
                            setPasswordError('')
                        }}
                        ref={passInputRef}
                        returnKeyType="done"
                        onSubmitEditing={() => {
                            Keyboard.dismiss()
                        }}
                        onBlur={passwordValidation}
                        right={showEyeIcon}
                    />
                </View>
                {
                    !!passwordError && (
                        <Text style={styles.error}>
                            {passwordError}
                        </Text>
                    )
                }
            </View>

            <TouchableOpacity
                onPress={onPressForgotPassword}>
                <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPressLogin}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center' }}
                onPress={onPressSignUp}>
                <Text style={{ color: 'black' }}>Don't have an Account ? </Text>
                <Text style={styles.forgotAndSignUpText}>Signup</Text>
            </TouchableOpacity>

        </>
    }

    return (
        <RootComponent style={styles.container}
            children={renderUI()}>
        </RootComponent>
    );
}
export default Login;
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 20
    },
    logo: {
        height: 180,
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
    loginBtn: {
        width: "100%",
        backgroundColor: "#326A91",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    loginText: {
        color: '#FFF',
        fontWeight: '600'
    },
    error: {
        color: 'red',
        fontSize: 12,
    }
});
