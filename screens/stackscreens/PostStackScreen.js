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
import PostsScreen from "../mainScreens/PostsScreen";
import InputModal from "./InputModal";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
const Stack = createStackNavigator();

const PostStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#0077b5",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
        headerStyle: {
          backgroundColor: "#0077b5",
        },
      }}
      mode="modal"
      headerMode="float"
    >
      <Stack.Screen
        name="Posts"
        component={PostsScreen}
        options={{ title: "UTA RIDES" }}
      ></Stack.Screen>
      <Stack.Screen
        name="PostModal"
        component={InputModal}
        options={{
          title: "UTA RIDES",
          headerLeft: () => {
            return (
              <Icon
                name="cancel"
                onPress={() => navigation.goBack()}
                color="white"
              ></Icon>
            );
          },
          headerLeftContainerStyle: { marginLeft: 15 },
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
export default PostStackScreen;
