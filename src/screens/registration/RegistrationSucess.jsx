import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { BME_Logo, LocalStorage } from '../../Constants';
import RootComponent from '../../component/RootComponent';
import { UserContext } from '../../provider/UserProvider';
import { AuthContext } from '../../provider/AuthProvider';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';


const RegistrationSucess = ({ route, navigation }) => {
    const { setIsLoggedIn } = useContext(AuthContext);
    const { setUserDetails } = useContext(UserContext);
    const { setItem } = useAsyncStorage(LocalStorage.AccessToken);
    const {fullName} = route.params.data

    const onPressContinue = () => {
        setUserDetails(route.params.data);
         setItem(route.params.data.token).then(()=> setIsLoggedIn(true)).catch(()=> setIsLoggedIn(false));
    };

    const renderUI = () => {
        return <>
            <Image
                source={BME_Logo}
                style={styles.logo} />
            <View style={styles.inputMainView}>
                <Text style={styles.inputLabel}>Hello, {fullName}</Text>
                <View style={styles.inputView}>
                    <Text style={styles.inputLabel}>You're all set</Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={onPressContinue}
                style={styles.continueBtn}>
                <Text style={styles.continueText}>CONTINUE </Text>
            </TouchableOpacity>
        </>
    }

    return (
        <RootComponent style={styles.container}
            children={renderUI()}>
        </RootComponent>
    );
}

export default RegistrationSucess;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'column',
        gap: 20
    },
    logo: {
        height: 180,
        aspectRatio: 3 / 2,
        alignSelf: 'center'
    },
    inputMainView: {
        alignItems: 'center',
        flexDirection: 'column',
        gap: 12
    },
    inputView: {
        width: "100%",
        alignItems: 'center',
        justifyContent: "center",
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12
    },
    inputLabel: {
        fontSize: 24,
        fontWeight: '600'
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
});
