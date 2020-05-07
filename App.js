import React, { useCallback, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AuthContextProvider from "./contexts/AuthContext";
import { AuthContext } from "./contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/authScreens/LoginScreen";
import SignupScreen from "./screens/authScreens/SignupScreen";
import { State } from "react-native-gesture-handler";
const Stack = createStackNavigator();
const Main = () => {
  const { isSignedout, token, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <SplashScreen />;
  }
  if (!token) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
export default function App() {
  return (
    <AuthContextProvider>
      {/* <View style={styles.container}> */}
      <Main />
      {/* </View> */}
    </AuthContextProvider>
  );
}
