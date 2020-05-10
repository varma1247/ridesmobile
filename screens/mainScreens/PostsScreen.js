import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../../contexts/PostsContext";
import { AuthContext } from "../../contexts/AuthContext";
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
  TouchableOpacity
} from "react-native";
const CreatePost = () => {
  const [newPost, setNewPost] = useState("");
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Icon name="create" style={{ marginLeft: 10 }}></Icon>
      <TextInput
        width="80%"
        textAlignVertical="top"
        style={styles.postInput}
        placeholder="Post a ride..."
        defaultValue={newPost}
        onChangeText={(text) => {
          setNewPost(text);
        }}
      />
      <TouchableOpacity onTouchEnd={()=>{
        console.log("send");
        
      }}>
        <Icon name="send" style={{ marginLeft: 10 }}></Icon>
      </TouchableOpacity>
    </View>
  );
};
const PostsScreen = ({ navigation }) => {
  const { posts, createPost, savePosts, getPosts } = useContext(PostContext);
  const { token } = useContext(AuthContext);
  const [reload, setReload] = useState("");
  const [error, setError] = useState("");

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
  }, []);

  // console.log(error);
  console.log(posts);
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
          <FlatList
            contentContainerStyle={{ paddingBottom: 140 }}
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
                      </Text>
                      <Text style={styles.timestamp}>
                        {moment(item.createdat).fromNow()}
                      </Text>
                    </View>
                  </View>
                </Card>
              </>
            )}
            keyExtractor={(post) => post._id}
          />
        </Card>
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
