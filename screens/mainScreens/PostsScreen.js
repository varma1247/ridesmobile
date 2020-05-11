import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../../contexts/PostsContext";
import { AuthContext } from "../../contexts/AuthContext";
import { ProgressBar, Colors } from "react-native-paper";
import registerForPushNotification from "../../utilities/registerForPushNotification";
import Constants from "expo-constants";
import userAvatar from "../../userAvatar.png";
import moment from "moment";
import {
  ThemeProvider,
  Button,
  Card,
  Divider,
  ListItem,
  Avatar,
  Text,
  Icon,
} from "react-native-elements";
import axios from "axios";
import {
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
const CreatePost = () => {
  const [newPost, setNewPost] = useState("");
  const { createPost, error, setError, posting } = useContext(PostContext);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 0,
        }}
      >
        <Icon name="create" style={{ marginLeft: 10 }}></Icon>
        <TextInput
          multiline
          width="80%"
          textAlignVertical="top"
          style={styles.postInput}
          placeholder="Post a ride..."
          defaultValue={newPost}
          onChangeText={(text) => {
            setNewPost(text);
          }}
          onBlur={() => {
            setError("");
          }}
        />
        <TouchableOpacity>
          <Icon
            size={40}
            name="send"
            onPress={() => {
              // console.log(newPost);
              Keyboard.dismiss;
              let finalPost = newPost;
              finalPost = finalPost.trim();
              setNewPost("");
              setError("");
              createPost({ content: finalPost });
            }}
          ></Icon>
        </TouchableOpacity>
      </View>
      {error ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : null}
      {posting ? <ProgressBar indeterminate color="#212121" /> : null}
    </>
  );
};
const PostsScreen = ({ navigation }) => {
  const {
    posts,
    createPost,
    savePosts,
    getPosts,
    error,
    loadingPosts,
  } = useContext(PostContext);
  const { token } = useContext(AuthContext);
  const [reload, setReload] = useState("");

  // useEffect(() => {
  //   const getPosts = async () => {
  //     try {
  //       const { data } = await axios.get("http://192.168.1.76:5000/post", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (!data) {
  //         setError("No Posts");
  //       }
  //       savePosts(data.allPosts);
  //     } catch (error) {
  //       setError(error.response.data);
  //     }
  //   };
  //   getPosts();
  // }, []);
  useEffect(() => {
    getPosts();
    registerForPushNotification()
  }, []);

  // console.log(error);
  // console.log(posts);
  return (
    <ThemeProvider>
      <>
        {/* <Divider style={{ backgroundColor: 'blue' }} />; */}
        {/* <Divider style={{ backgroundColor: 'blue' }} />; */}
        <Card
          containerStyle={{ margin: 0, padding: 0 }}
          dividerStyle={{ display: "none" }}
        >
          <CreatePost />
        </Card>
        {loadingPosts ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <ActivityIndicator
              size="medium"
              color="#0000ff"
              style={{ marginTop: 5 }}
            />
          </View>
        ) : (
          <Card
            containerStyle={{ margin: 0, padding: 0 }}
            dividerStyle={{ display: "none" }}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 75 }}
              data={posts}
              renderItem={({ item }) => (
                <>
                  {/* <Divider style={{ height: 5 }} /> */}

                  <Card
                    containerStyle={styles.card}
                    dividerStyle={{ display: "none" }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        rounded
                        source={require("../../userAvatar.png")}
                        size="medium"
                      ></Avatar>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.userName}>
                          {item.user.firstname + " " + item.user.lastname}
                          {/* {item.content} */}
                        </Text>
                        <Text style={styles.timestamp}>
                          {moment(item.createdat).fromNow()}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: 15,
                        marginLeft: 4,
                      }}
                    >
                      <Text style={{ fontSize: 25 }}>{item.content}</Text>
                    </View>
                  </Card>
                </>
              )}
              keyExtractor={(post) => post._id}
            />
          </Card>
        )}
      </>
      {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {posts.map((post) => {
          return (
            <View key={post._id}>
              <Text>{post.content}</Text>
              <Text>{post.createdat}</Text>
            </View>
          );
        })}
      </View> */}
    </ThemeProvider>
  );
};
const styles = StyleSheet.create({
  postInput: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    padding: 10,
  },
  card: { margin: 0, padding: 10 },
  userName: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
  },
  timestamp: {
    fontSize: 14,
    color: "#c4c6ce",
    marginTop: 4,
  },
  error: {
    marginTop: 15,
    color: "red",
    fontSize: 15,
  },
});
// const styles = StyleSheet.create({
//   postInput:{
//       marginTop: 15,
//       marginBottom: 15,
//       fontSize: 20,
//       padding: 10,
//   },
//   card:{
//     margin: 0, padding: 10
//   },
//   username:{
//     fontSize: 15,
//     fontWeight: "500",
//     color: "black",
//   }
// })
export default PostsScreen;
