import React, { useContext, useState, useEffect, PureComponent } from "react";
import { PostContext } from "../../contexts/PostsContext";
import { ProgressBar, Colors } from "react-native-paper";
import moment from "moment";
import {
  ThemeProvider,
  Card,
  Divider,
  ListItem,
  Avatar,
  Text,
  Icon,
  Button,
  Badge,
  Input,
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

const Post = React.memo(function Post({ item }) {
  const { saveInterested, posts, savePosts } = useContext(PostContext);
  return (
    <Card
      containerStyle={{
        borderWidth: 0,
        margin: 0,
        padding: 10,
        marginBottom: 20,
      }}
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
          source={require("../../assets/userAvatar.png")}
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
      {!item.self ? (
        <Button
          raised
          title="Interested"
          type="outline"
          disabled={item.liked}
          disabledStyle={{ borderColor: "blue" }}
          disabledTitleStyle={{ color: "blue" }}
          style={{ marginTop: 10 }}
          buttonStyle={{ borderColor: item.liked ? "blue" : "#78909C" }}
          titleStyle={{ color: item.liked ? "blue" : "#78909C" }}
          onPress={() => {
            let newPosts = [...posts];
            newPosts.forEach((np, index) => {
              if (np._id.toString() == item._id.toString()) {
                np.liked = true;
                np.interested = np.interested + 1;
                newPosts[index] = np;
              }
            });
            saveInterested(item._id);
            savePosts(newPosts);
          }}
        ></Button>
      ) : null}
      {item.interested ? (
        <Badge
          value={item.interested}
          badgeStyle={{ width: 30, height: 30, borderRadius: 15 }}
          containerStyle={{
            position: "absolute",
            top: -20,
            right: -2,
            borderColor: "#2962FF",
          }}
          textStyle={{fontWeight:"bold"}}
        />
      ) : null}
    </Card>
  );
});
const PostInput = ({ navigation, createPost }) => {
  return (
    <>
      <Icon name="directions-car" style={{ marginLeft: 10 }}></Icon>
      {/* <TextInput
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
    /> */}
      {/* <TextInput
        multiline
        width="80%"
        textAlignVertical="top"
        style={styles.postInput}
        placeholder="Post a ride..."
        defaultValue={newPost}
        // onFocus={()=>{
        //   navigation.navigate('PostModal')
        // }}
        onChangeText={(text) => {
          setNewPost(text);
        }}
      /> */}
      <Text
        style={{ width: "100%", padding: 15, fontSize: 15 }}
        onPress={() => {
          navigation.navigate("PostModal");
        }}
        color="black"
      >
        Post a ride...
      </Text>
      {/* <TouchableOpacity>
        <Icon
          size={40}
          name="send"
          onPress={() => {
            // console.log(newPost);
            Keyboard.dismiss();
            let finalPost = newPost;
            finalPost = finalPost.trim();
            setNewPost("");
            createPost({ content: finalPost }).catch((e) => {
              console.log(e);
            });
          }}
        ></Icon>
      </TouchableOpacity> */}
    </>
  );
};
const CreatePost = ({ navigation }) => {
  const { createPost, error, setError, posting } = useContext(PostContext);
  console.log("hello");

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 0,
        }}
      >
        <PostInput createPost={createPost} navigation={navigation} />
      </View>
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
    setPosting,
  } = useContext(PostContext);
  const [reload, setReload] = useState("");
  console.log("hjgdhgh");

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
    getPosts().catch((e) => {
      setPosting(false);
      console.log(e);
    });
    console.log("hi");
  }, []);

  // console.log(error);
  // console.log(posts);
  return (
    <ThemeProvider>
      <>
        <Card
          containerStyle={{
            borderWidth: 0,
            padding: 0,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          {/* <> */}
          <CreatePost navigation={navigation} />
          {/* </> */}
        </Card>
        {loadingPosts ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <Text>loading...</Text>
          </View>
        ) : null}
        {posts.length > 0 ? (
          <FlatList
            refreshing={loadingPosts}
            onScrollToTop={() =>
              getPosts().catch((e) => {
                console.log(e);
              })
            }
            onRefresh={() => {
              getPosts().catch((e) => {
                console.log(e);
              });
            }}
            showsVerticalScrollIndicator={false}
            data={posts}
            renderItem={({ item }) => <Post item={item} />}
            keyExtractor={(post) => post._id}
          />
        ) : null}
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
