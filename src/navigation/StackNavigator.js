import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EnterMobile from "../screens/registration/EnterMobile";
import VerifyOTP from "../screens/registration/VerifyOTP";
import PersonalInfo from "../screens/registration/PersonalInfo";
import ProfileType from "../screens/registration/ProfileType";
import BusinessInfo from "../screens/registration/BusinessInfo";
import ProductInfo from "../screens/registration/ProductInfo";
import RegistrationSucess from "../screens/registration/RegistrationSucess";
import Login from "../screens/Login";



const Stack = createStackNavigator();

const screenOptionStyle = {
    title:'',
    // headerStyle: {
    //   backgroundColor: "#9AC4F8",
    // },
    // headerTintColor: "white",
    headerBackTitle: "Back",
  };

  // const MainStackNavigator = () => {
  //   return (
  //     <Stack.Navigator screenOptions={screenOptionStyle}>
  //       <Stack.Screen name="Home" component={Home} />
  //       <Stack.Screen name="About" component={Settings} />
  //     </Stack.Navigator>
  //   );
  // }

  // const JobsStackNavigator = () => {
  //   return (
  //     <Stack.Navigator screenOptions={screenOptionStyle}>
  //       <Stack.Screen name="Jobs" component={Jobs} />
  //     </Stack.Navigator>
  //   );
  // }

  const AuthStackNavigator=()=>{
    return (
      <Stack.Navigator screenOptions={screenOptionStyle} >
        <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Stack.Screen name="EnterMobile" component={EnterMobile} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen name="PersonalInfo"  component={PersonalInfo} />
        <Stack.Screen name="ProfileType"  component={ProfileType}/>
        <Stack.Screen name="BusinessInfo" options={{title: 'Business Info'}} component={BusinessInfo}/>
        <Stack.Screen name="ProductInfo"  options={{title: 'Product Info'}} component={ProductInfo}/>
        <Stack.Screen name="RegistrationSucess"  component={RegistrationSucess}/>
      </Stack.Navigator>
    );
  }
  
  export { AuthStackNavigator };