import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EnterMobile from "../screens/registration/EnterMobile";
import VerifyOTP from "../screens/registration/VerifyOTP";
import PersonalInfo from "../screens/registration/PersonalInfo";
import ProfileType from "../screens/registration/ProfileType";
import BusinessInfo from "../screens/registration/BusinessInfo";
import ProductInfo from "../screens/registration/ProductInfo";
import RegistrationSuccess from "../screens/registration/RegistrationSuccess";
import Login from "../screens/Login";
import MyInAppWebView from "../component/MyInAppWebView";
import JobList from "../screens/jobs/JobList";
import CreateJob from "../screens/jobs/CreateJob";
import AccountsSettings from "../screens/profile/AccountsSettings";
import EditProfile from "../screens/profile/EditProfile";
import PostYourQuestion from "../screens/forum/PostYourQuestion";
import ForumList from "../screens/forum/ForumList";
import Home from "../screens/Home";
import BottomTabNavigator from "./BottomTabNavigator";
import NavigationRoute from "./NavigationRoute";
import CompanyList from "../screens/company/CompanyList";
import JobDetail from "../screens/jobs/JobDetail";
import ForumDetail from "../screens/forum/ForumDetail";
import CompanyDetail from "../screens/company/CompanyDetail";
import BlogList from "../screens/blogs/BlogList";
import BlogDetail from "../screens/blogs/BlogDetail";
import ResetPassword from "../screens/resetpassword/ResetPassword";
import CreateBlog from "../screens/blogs/CreateBlog";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerShown: false,
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name={TABS} component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name={NavigationRoute.HOME} component={Home} />
      <Stack.Screen name="MyInAppWebView" component={MyInAppWebView} />
    </Stack.Navigator>
  );
};

const AccountSettingsStackNavigator = ({ route }) => {
  const { back } = route.params;
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        initialParams={{ back }}
        name={NavigationRoute.ACCOUNT_SETTINGS}
        component={AccountsSettings}
      />
      <Stack.Screen
        name={NavigationRoute.EDIT_PROFILE}
        component={EditProfile}
      />
    </Stack.Navigator>
  );
};

const ForumStackNavigator = ({ route }) => {
  const { back } = route.params;
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        initialParams={{ back }}
        name={NavigationRoute.FORUM_LIST}
        component={ForumList}
      />
      <Stack.Screen
        name={NavigationRoute.FORUM_DETAIL}
        component={ForumDetail}
      />
      <Stack.Screen
        name={NavigationRoute.POST_YOUR_QUESTION}
        component={PostYourQuestion}
      />
    </Stack.Navigator>
  );
};

const JobStackNavigator = ({ route }) => {
  const { back } = route.params;
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        initialParams={{ back }}
        name={NavigationRoute.JOB_LIST}
        component={JobList}
      />
      <Stack.Screen name={NavigationRoute.CREATE_JOB} component={CreateJob} />
      <Stack.Screen name={NavigationRoute.JOB_DETAIL} component={JobDetail} />
    </Stack.Navigator>
  );
};

const CompnayStackNavigator = ({ route }) => {
  const { back } = route.params;
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        initialParams={{ back }}
        name={NavigationRoute.COMPANY_LIST}
        component={CompanyList}
      />
      <Stack.Screen
        initialParams={{ back }}
        name={NavigationRoute.COMPANY_DETAIL}
        component={CompanyDetail}
      />
    </Stack.Navigator>
  );
};

const AddBussinessStackNavigator = ({ route }) => {
  const { activePage } = route.params;

  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
      initialRouteName={activePage}
    >
      <Stack.Screen name="ProfileType" component={ProfileType} />
      <Stack.Screen name="BusinessInfo" component={BusinessInfo} />
      <Stack.Screen name="ProductInfo" component={ProductInfo} />
    </Stack.Navigator>
  );
};

const BlogStackNavigator = () => {

  return (
    <Stack.Navigator
      screenOptions={screenOptionStyle}
    >
      <Stack.Screen name={NavigationRoute.BLOG_LIST} component={BlogList} />
      <Stack.Screen name={NavigationRoute.BLOG_DETAIL} component={BlogDetail} />
      <Stack.Screen name={NavigationRoute.CREATE_BLOG} component={CreateBlog} />

    </Stack.Navigator>
  );
};

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="EnterMobile" component={EnterMobile} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="MyInAppWebView" component={MyInAppWebView} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="ProfileType" component={ProfileType} />
      <Stack.Screen
        name="BusinessInfo"
        options={{ title: "Business Info" }}
        component={BusinessInfo}
      />
      <Stack.Screen
        name="ProductInfo"
        options={{ title: "Product Info" }}
        component={ProductInfo}
      />
      <Stack.Screen
        name="RegistrationSuccess"
        component={RegistrationSuccess}
      />
    </Stack.Navigator>
  );
};

export {
  AuthStackNavigator,
  MainStackNavigator,
  HomeStackNavigator,
  AddBussinessStackNavigator,
  JobStackNavigator,
  AccountSettingsStackNavigator,
  ForumStackNavigator,
  CompnayStackNavigator,
  BlogStackNavigator
};
