import React, { useCallback, useContext } from "react";
import { StyleSheet, Text, View, Button, SafeAreaView } from "react-native";
import AuthContextProvider from "./contexts/AuthContext";
import PostsContextProvider from "./contexts/PostsContext";
import { AuthContext } from "./contexts/AuthContext";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/authScreens/LoginScreen";
import SignupScreen from "./screens/authScreens/SignupScreen";
import PostsStackScreen from "./screens/stackscreens/PostStackScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
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
  } else {
    return (
      <NavigationContainer>
        {/* <Drawer.Navigator>
          <Drawer.Screen name="Tabs" component={Tabcomponents}></Drawer.Screen>
        </Drawer.Navigator> */}
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#7f39fb"
          inactiveColor="#018786"
          barStyle={{
            backgroundColor: "white",
            height: 80,
          }}
          shifting={true}
          sceneAnimationEnabled={true}
        >
          <Tab.Screen
            name="Home"
            component={PostsStackScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Chats"
            component={PostsStackScreen}
            options={{
              tabBarLabel: "Chats",
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-chatbubbles" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={PostsStackScreen}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-person" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};
export default function App() {
  return (
    <AuthContextProvider>
      <PostsContextProvider>
        {/* <View style={styles.container}> */}
        {/* <SafeAreaView> */}
        <Main />
        {/* </SafeAreaView> */}
        {/* </View> */}
      </PostsContextProvider>
    </AuthContextProvider>
  );
}
