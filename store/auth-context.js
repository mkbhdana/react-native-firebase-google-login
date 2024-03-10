import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const authenticate = (token) => {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  };
  const logoutUser = () => {
    if (GoogleSignin.isSignedIn()) {
      GoogleSignin.signOut();
    }
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logoutUser: logoutUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthContext, AuthContextProvider, useAuth };
