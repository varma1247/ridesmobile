import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "react-native";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [authstatus, setAuthstatus] = useState({
    isLoading: true,
    isSignedout: false,
    token: null,
  });
  const restoreToken = (token) => {
    setAuthstatus({ ...authstatus, token: token, isLoading: false });
  };
  const signIn = (token) => {
    setAuthstatus({ ...authstatus, isLoggedout: false, token: token });
  };
  const signOut = (token) => {
    setAuthstatus({ ...authstatus, isLoggedout: true, token: null });
  };
  useEffect(() => {
    const fetchToken = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("userToken");
      } catch (error) {
        console.log("Token fetch failed");
      }
      restoreToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWI4N2VmYzE4ZDEzNWIxYzkyMGYxNDgiLCJpYXQiOjE1ODkxNzUwNjh9.Ctrkys2DLPXlc7Nt0HngWnMjy2X_dhNQuQlT8727U5Q");
    };
    fetchToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...authstatus, signIn: signIn, signOut: signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
