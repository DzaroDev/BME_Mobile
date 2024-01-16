import React, { useState } from 'react';

export const UserContext = React.createContext();

export default UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};