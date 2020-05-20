import React, { useState, useLayoutEffect, useContext } from "react";
import { PostContext } from "../../contexts/PostsContext";
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
import {
  View,
  Button,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const InputModal = ({ navigation }) => {
  const { createPost, error, setError, posting } = useContext(PostContext);
  const [newPost, setNewPost] = useState("");
  const color = newPost.length > 0 ? "white" : "lightseagreen";
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              // console.log(newPost);
              Keyboard.dismiss();
              let finalPost = newPost;
              finalPost = finalPost.trim();
              setNewPost("");
              createPost({ content: finalPost }).catch((e) => {
                console.log(e);
              });
            //   Haptics.selectionAsync().then(d=>{
            //       console.log(d);
                  
            //   })
            // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          
              navigation.goBack();
            }}
            disabled={newPost.length <= 0}
          >
            <Text style={{ color: color, fontWeight: "bold" }}>Post</Text>
          </TouchableOpacity>
        );
      },
      headerRightContainerStyle: { marginRight: 20 },
    });
  });
  return (
    <View>
      {/* <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" /> */}
      <TextInput
        // multiline
        // editable={false}
        // maxLength={100}
        // textAlignVertical="top"
        style={{
          marginTop: 15,
          marginBottom: 15,
          fontSize: 20,
          padding: 10,
        }}
        placeholder="Post a ride...."
        defaultValue={newPost}
        onBlur={() => {
          Keyboard.dismiss();
        }}
        onChangeText={(text) => {
          setNewPost(text);
        }}
      />
    </View>
  );
};
export default InputModal;
