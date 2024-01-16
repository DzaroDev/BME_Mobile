import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { APIMethod, APIURL, APPSTRING, COLORS, categoryTypes, userTypes } from '../../Constants';
import Root from '../../component/RootComponent';
import AppStyles from '../../config/AppStyles';
import axios from 'axios';

export default function ProfileType({ route, navigation }) {

    const [openProfile, setOpenProfile] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);

    const [userType, setUserType] = useState(null);
    const [category, setCategory] = useState(null);


    const [profiles, setProfiles] = useState(Object.keys(userTypes).map((key, index) => ({
        value: userTypes[key],
        label: key.toUpperCase()
    }))
    );

    const [categories, setCategories] = useState(Object.keys(categoryTypes).map((key, index) => ({
        value: categoryTypes[key],
        label: key.toUpperCase()
    }))
    );


   const registerAPICall=(requestBody)=>{
    setLoading(true);
    axios.requestWithData(APIMethod.POST, APIURL.REGISTER,  requestBody).then((res) => {
        if (res.status == 200) {
            navigation.navigate('RegistrationSucess', { data: res.data.data });
        } else {
            Alert.alert(APPSTRING.App_Name,res.data.message)
        }
        setLoading(false);
    }).catch((error) => {
        setLoading(false)
        Alert.alert(APPSTRING.App_Name, error.data.message)
    })
}

    const onPressContinue = () => {
        if (category && userType) {
            navigation.navigate('BusinessInfo', { user: { ...route.params.user, category: category, userType: userType } });
        } else {
            Alert.alert(APPSTRING.App_Name, 'Error')
        }
    };

    return (
        <View style={styles.container}>

            <View
                style={{ zIndex: 2, gap: 12 }}>
                <Text style={styles.inputLabel}>Select your profile</Text>
                <DropDownPicker
                    open={openProfile}
                    value={userType}
                    items={profiles}
                    setOpen={(value) => {
                        setOpenProfile(value)
                        setOpenCategories(false)
                    }}
                    setValue={setUserType}
                    setItems={setProfiles}
                    placeholder={'Profile'}

                />

            </View>
            <View style={{ zIndex: 1, gap: 12 }}>
                <Text style={styles.inputLabel}>Select category</Text>
                <DropDownPicker
                    open={openCategories}
                    value={category}
                    items={categories}
                    setOpen={(value) => {
                        setOpenCategories(value)
                        setOpenProfile(false)
                    }}
                    setValue={setCategory}
                    setItems={setCategories}
                    placeholder={'Category'}
                />
            </View>
            <TouchableOpacity
                onPress={onPressContinue}
                style={AppStyles.continueBtn}>
                <Text style={styles.continueText}>CONTINUE</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'start',
        flexDirection: 'column',
        padding: 16,
        gap: 20
    },

    continueBtn: {
        width: "100%",
        backgroundColor: "#326A91",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        bottom: 16,
        left: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '800'
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