import React from 'react';

export const RegisterStateContext = React.createContext();

export const RegisterStateProvider = props => {
  const contextValue={...yourContext}

  return (
    <RegisterStateContext.Provider value={contextValue}>
      {props.children}
    </RegisterStateContext.Provider>
  );
};