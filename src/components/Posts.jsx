import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  // const { user, changeUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("currUser"));
  const getPosts = async () => {
    console.log(user);
    try {
      // if (user.id) {
      const response = await fetch(
        `http://localhost:3000/posts?_page=${user.id}`
      );
      if (!response.ok) {
        throw "error";
      } else {
        const resPosts = await response.json();
        console.log(resPosts);
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
  function showComments() {}
  function showPosts() {
    return posts.map((post) => (
      <div key={post.id}>
        <span>{post.id}</span>
        <h4>{post.title}</h4>
        <button onClick={() => showMore(post)}>show more</button>
        {/* {clicked && (
          <>
            <p>{post.body}</p>
            <button onClick={showComments}>comments</button>
          </>
        )} */}
      </div>
    ));
  }
  return (
    <div>
      <h1>Posts</h1>
      {showPosts()}
    </div>
  );
};

export default Posts;
