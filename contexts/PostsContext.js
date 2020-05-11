import React, { createContext, useState, useEffect, useContext } from "react";
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
        setPosting(false);
        setPosts([data.post, ...posts]);
      } catch (error) {
        setError(error.response.data);
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
      if (!data) {
        setError("No Posts");
      }
      setLoadingPosts(false);
      setPosts(data.allPosts);
    } catch (error) {
      setError(error.response.data);
    }
  };
  // getPosts()
  // },[])

  const savePosts = (posts) => {
    setPosts(posts);
  };

  return (
    <PostContext.Provider
      value={{
        posts: posts,
        createPost: createPost,
        savePosts: savePosts,
        getPosts: getPosts,
        posting: posting,
        error: error,
        setError: setError,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
export default PostsContextProvider;
