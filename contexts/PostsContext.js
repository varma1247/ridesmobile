import React, { createContext, useState, useEffect, useContext } from "react";
import * as Haptics from "expo-haptics";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { postValidator } from "../validators/postValidator";
export const PostContext = createContext();
const PostsContextProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [posting, setPosting] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const createPost = async (post) => {
    // setPosts([...posts, post]);
    const { error } = postValidator.validate(post);
    if (error) {
      console.log(error.details[0].message);
      setError(error.details[0].message);
    } else {
      try {
        setPosting(true);
        const { data } = await axios.post(
          "http://192.168.1.76:5000/post",
          post,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setPosting(false);
        data.post.self = true;
        setPosts([data.post, ...posts]);
      } catch (error) {
        if (error.response.data !== null) {
          setPosting(false);
          console.log(error);
          // setError(error.response.data);
        } else {
          setPosting(false);
          console.log(error);
        }
      }
    }
  };
  // useEffect(()=>{
  const getPosts = async () => {
    try {
      setLoadingPosts(true);
      const { data } = await axios.get("http://192.168.1.76:5000/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoadingPosts(false);
      if (!data) {
        setError("No Posts");
      }
      setLoadingPosts(false);
      setPosts(data.allPosts);
    } catch (error) {
      if (error.response.data) {
        setError(error.response.data);
      } else {
        console.log(error);
      }
      setLoadingPosts(false);
    }
  };
  // getPosts()
  // },[])

  const saveInterested = async (postid) => {
    try {
      const { data } = await axios.post(
        "http://192.168.1.76:5000/interested",
        { postid: postid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      
    } catch (error) {}
  };
  const savePosts=(posts)=>{
    setPosts(posts)
  }

  return (
    <PostContext.Provider
      value={{
        posts: posts,
        createPost: createPost,
        getPosts: getPosts,
        setPosting: setPosting,
        posting: posting,
        error: error,
        savePosts:savePosts,
        setError: setError,
        loadingPosts: loadingPosts,
        saveInterested:saveInterested
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
export default PostsContextProvider;
