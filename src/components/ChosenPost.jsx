import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChosenPost = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  console.log("postId: ", postId);
  const getPost = async () => {
    try {
      // if (user.id) {
      const response = await fetch(` http://localhost:3000/posts?id=${postId}`);
      if (!response.ok) {
        throw "error";
      } else {
        const resPost = await response.json();
        setPost(resPost);
        console.log(resPost);
      }
    } catch (error) {
      // }
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  function showComments() {}

  return (
    <>
      {post && (
        <div>
          <span>{post[0]?.id}</span>
          <h2>{post[0]?.title}</h2>
          <p>{post[0]?.body}</p>
          <button onClick={showComments}>comments</button>
        </div>
      )}
    </>
  );
};

export default ChosenPost;
