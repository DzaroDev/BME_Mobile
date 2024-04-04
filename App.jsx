import React from "react";
import AppRoot from "./AppRoot";
import UserProvider from "./src/provider/UserProvider";
import { AuthProvider } from "./src/provider/AuthProvider";
import { RegisterStateProvider } from "./src/provider/RegisterStateProvider";

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <RegisterStateProvider>
          <AppRoot />
        </RegisterStateProvider>
      </UserProvider>
    </AuthProvider>
  );
}
