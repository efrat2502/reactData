import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  // const { user, changeUser } = useContext(UserContext);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("currUser"));
  const getPosts = async () => {
    try {
      // if (user.id) {
      const response = await fetch(
        `http://localhost:3000/posts?userId=${user.id}`
      );
      if (!response.ok) {
        throw "error";
      } else {
        const resPosts = await response.json();
        setPosts(resPosts);
      }
    } catch (error) {
      // }
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  function showMore(post) {
    navigate(`./${post.id}`);
  }

  const deletePost = async (postId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        `http://localhost:3000/posts/${postId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Error deleting post");
      }
      setPosts((prev) => prev.filter((el) => el.id !== postId));
    } catch (error) {
      error.console("Error deleting post:", error);
    }
  };
  function showPosts() {
    if (posts.length !== 0) {
      return posts.map((post) => (
        <div key={post.id}>
          <hr />
          <span>{post.id}</span>
          <br />
          <button onClick={() => deletePost(post.id)}>🗑️</button>
          <h4>{post.title}</h4>
          <button onClick={() => showMore(post)}>show more</button>
        </div>
      ));
    }
  }
  return (
    <div>
      <h1>Posts</h1>
      {showPosts()}
    </div>
  );
};

export default Posts;
