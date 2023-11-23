import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChosenPost = () => {
  const [endNum, setEndNum] = useState(4);
  const [startNum, setStartNum] = useState(0);
  const [post, setPost] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const { postId } = useParams();
  console.log("postId: ", postId);

  // get chosen post from db
  const getPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/${postId}?_embed=comments`
      );
      if (!response.ok) {
        throw "error";
      } else {
        const resPost = await response.json();
        setPost(resPost);
        console.log(resPost);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // reset comments when the post changes
  useEffect(() => {
    setComments([]);
  }, [post]);

  useEffect(() => {
    getPost();
  }, [showComments]);

  return (
    <>
      {post && (
        <div>
          <span>{post?.id}</span>
          <h2>{post?.title}</h2>
          <p>{post?.body}</p>
          <button onClick={() => setShowComments((prev) => !prev)}>💬</button>
          {showComments && (
            <>
              {post.comments.map((comment) => (
                <div
                  style={{ backgroundColor: "powderblue", margin: "10px" }}
                  key={comment.id}
                >
                  <span>{comment.email}</span>
                  <h3>{comment.name}</h3>
                  <p>{comment.body}</p>
                </div>
              ))}
              <button
                onClick={() => {
                  setStartNum((prev) => prev + endNum);
                  setEndNum((prev) => prev + 10);
                }}
              >
                show more
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChosenPost;
