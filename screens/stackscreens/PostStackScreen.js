import React from "react";
import PostsScreen from "../mainScreens/PostsScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const PostStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "black",
        },
      }}
    >
      <Stack.Screen
        name="Posts"
        component={PostsScreen}
        options={{ title: "UTA RIDES" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};
export default PostStackScreen;
