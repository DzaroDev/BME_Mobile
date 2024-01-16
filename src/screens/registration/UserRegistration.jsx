//#region Previous code 
// import React, { useState, useEffect } from 'react'; 
// import { View, TextInput, TouchableOpacity,  
//     Text, StyleSheet } from 'react-native';

// export default function UserRegistration () {

//     const [name, setName] = useState(''); 
//     const [email, setEmail] = useState(''); 
//     const [password, setPassword] = useState(''); 
//     const [errors, setErrors] = useState({}); 
//     const [isFormValid, setIsFormValid] = useState(false); 
  
//     useEffect(() => { 
  
//         // Trigger form validation when name,  
//         // email, or password changes 
//         validateForm(); 
//     }, [name, email, password]); 
  
//     const validateForm = () => { 
//         let errors = {}; 
  
//         // Validate name field 
//         if (!name) { 
//             errors.name = 'Name is required.'; 
//         } 
  
//         // Validate email field 
//         if (!email) { 
//             errors.email = 'Email is required.'; 
//         } else if (!/\S+@\S+\.\S+/.test(email)) { 
//             errors.email = 'Email is invalid.'; 
//         } 
  
//         // Validate password field 
//         if (!password) { 
//             errors.password = 'Password is required.'; 
//         } else if (password.length < 6) { 
//             errors.password = 'Password must be at least 6 characters.'; 
//         } 
  
//         // Set the errors and update form validity 
//         setErrors(errors); 
//         setIsFormValid(Object.keys(errors).length === 0); 
//     }; 
  
//     const handleSubmit = () => { 
//         if (isFormValid) { 
  
//             // Form is valid, perform the submission logic 
//             console.log('Form submitted successfully!'); 
//         } else { 
              
//             // Form is invalid, display error messages 
//             console.log('Form has errors. Please correct them.'); 
//         } 
//     }; 
  
//   return (
//      <View style={styles.container}> 
//             <TextInput 
//                 style={styles.input} 
//                 placeholder="Name"
//                 value={name} 
//                 onChangeText={setName} 
//             /> 
//             <TextInput 
//                 style={styles.input} 
//                 placeholder="Email"
//                 value={email} 
//                 onChangeText={setEmail} 
//             /> 
//             <TextInput 
//                 style={styles.input} 
//                 placeholder="Password"
//                 value={password} 
//                 onChangeText={setPassword} 
//                 secureTextEntry 
//             /> 
//             <TouchableOpacity 
//                 style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]} 
//                 disabled={!isFormValid} 
//                 onPress={handleSubmit} 
//             > 
//                 <Text style={styles.buttonText}>Submit</Text> 
//             </TouchableOpacity> 
              
//             {/* Display error messages */} 
//             {Object.values(errors).map((error, index) => ( 
//                 <Text key={index} style={styles.error}> 
//                     {error} 
//                 </Text> 
//             ))} 
//         </View> 
//   )
// }

// // Styles for the components 
// const styles = StyleSheet.create({ 
//     container: { 
//         flex: 1, 
//         padding: 16, 
//         justifyContent: 'center', 
//     }, 
//     input: { 
//         height: 60, 
//         borderColor: '#ccc', 
//         borderWidth: 1, 
//         marginBottom: 12, 
//         paddingHorizontal: 10, 
//         borderRadius: 8, 
//         fontSize: 16, 
//     }, 
//     button: { 
//         backgroundColor: 'green', 
//         borderRadius: 8, 
//         paddingVertical: 10, 
//         alignItems: 'center', 
//         marginTop: 16, 
//         marginBottom: 12, 
//     }, 
//     buttonText: { 
//         color: '#fff', 
//         fontWeight: 'bold', 
//         fontSize: 16, 
//     }, 
//     error: { 
//         color: 'red', 
//         fontSize: 20, 
//         marginBottom: 12, 
//     }, 
// }); 

//#endregion

// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Loader from '../../component/Loader';
import { COLORS } from '../../Constants';

const UserRegistration = (props) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [
    isRegistraionSuccess,
    setIsRegistraionSuccess
  ] = useState(false);

  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userName) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userAge) {
      alert('Please fill Age');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      name: userName,
      email: userEmail,
      age: userAge,
      address: userAddress,
      password: userPassword,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://localhost:3000/api/user/register', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          setIsRegistraionSuccess(true);
          console.log(
            'Registration Successful. Please Login to proceed'
          );
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        {/* <Image
          source={require('../Image/success.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        /> */}
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        {/* <View style={{alignItems: 'center'}}>
          <Image
            source={require('../Image/aboutreact.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View> */}
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              
              placeholder="Enter Name"
              placeholderTextColor= {COLORS.PLACEHOLDER}
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              
              placeholder="Enter Email"
              placeholderTextColor= {COLORS.PLACEHOLDER}
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              
              placeholder="Enter Password"
              placeholderTextColor= {COLORS.PLACEHOLDER}
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAge) => setUserAge(UserAge)}
              placeholder="Enter Age"
              placeholderTextColor= {COLORS.PLACEHOLDER}
              keyboardType="numeric"
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                addressInputRef.current &&
                addressInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserAddress) =>
                setUserAddress(UserAddress)
              }
              placeholder="Enter Address"
              placeholderTextColor= {COLORS.PLACEHOLDER}
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default UserRegistration;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    height: 50, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    marginBottom: 12, 
    paddingHorizontal: 10, 
    borderRadius: 8, 
    fontSize: 16, 
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  }
});