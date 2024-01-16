import AuthProvider from './src/provider/AuthProvider';
import React from 'react';
import AppRoot from './AppRoot';
import UserProvider from './src/provider/UserProvider';


export default function App() {

  return (
    <AuthProvider>
      <UserProvider>
        <AppRoot />
      </UserProvider>
    </AuthProvider>
  );
}