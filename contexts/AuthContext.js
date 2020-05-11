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
      restoreToken(userToken);
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
