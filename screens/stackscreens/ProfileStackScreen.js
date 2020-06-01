import React from "react";
import {
  ThemeProvider,
  Card,
  Divider,
  ListItem,
  Avatar,
  Text,
  Icon,
  Input,
} from "react-native-elements";
import { View, Button } from "react-native";
import ProfileScreen from "../mainScreens/ProfileScreen";
import InputModal from "./InputModal";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
const Stack = createStackNavigator();

const ProfileStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#128c7e",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
        headerStyle: {
          backgroundColor: "#128c7e",
        },
      }}
      mode="modal"
      headerMode="float"
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Edit Profile" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
export default ProfileStackScreen;
