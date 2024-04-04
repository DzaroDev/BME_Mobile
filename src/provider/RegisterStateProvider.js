import React, { createContext, useContext, useEffect, useState } from "react";

const initialRegisterStateProvider = {
  loginType: "",
  user: {
    email: "",
    // phone: "",
    firstName: "",
    lastName: "",
    password: "",
    category: "",
    userType: "",
  },
  company: {
    name: "",
    email: "",
    mobile: "",
    mobileCode: "+91",
    registrationId: "",
    address1: "",
    state: "",
    city: "",
    description: "",
    biomedicalExpertise: "",
  },
  service: {
    name: "",
    description1: "",
    description2: "",
    modelName: "",
    specification: "",
    category: "",
    price: "",
  },
};

export const RegisterStateContext = createContext();

export const useRegisterStateContext = () => useContext(RegisterStateContext);

export const RegisterStateProvider = ({ children }) => {
  const [loginType, setLoginType] = useState();
  const [flowType, setFlowType] = useState();
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
  const [service, setService] = useState({});

  // Function to update user
  const updateUser = (updatedValues) => {
    setUser((prevState) => ({
      ...prevState,
      ...updatedValues,
    }));
  };
  const updateCompany = (updatedValues) => {
    setCompany((prevState) => ({
      ...prevState,
      ...updatedValues,
    }));
  };
  const updateService = (updatedValues) => {
    setService((prevState) => ({
      ...prevState,
      ...updatedValues,
    }));
  };
  
  return (
    <RegisterStateContext.Provider
      value={{
        loginType,
        flowType,
        company,
        user,
        service,
        actions: {
          setFlowType,
          setLoginType,
          setUser,
          setCompany,
          setService,
          updateUser,
          updateCompany,
          updateService,
        },
      }}
    >
      {children}
    </RegisterStateContext.Provider>
  );
};
