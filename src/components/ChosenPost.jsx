import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChosenPost = () => {
  const [post, setPost] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [clickedEdit, setClickedEdit] = useState(false);
  const [submittedEdit, setSubmittedEdit] = useState(false);
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { postId } = useParams();
  console.log("postId: ", postId);

  // get chosen post from db
  const getPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/posts/${postId}?_embed=comments`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const resPost = await response.json();
        setPost(resPost);
        console.log(resPost);
        setInputValue(resPost.body);
      }
    } catch (error) {
      alert("There was a problem with the fetch operation:", error);
    }
  };

  // reset comments when the post changes
  useEffect(() => {
    setComments([]);
  }, [post]);

  useEffect(() => {
    getPost();
  }, [showComments]);

  function editPost() {
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: inputValue,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        alert("There was a problem with the fetch operation:", error);
      });
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleSubmitEdit = () => {
    setSubmittedEdit((prev) => !prev);
    editPost();
    setClickedEdit((prev) => !prev);
  };
  return (
    <>
      {post && (
        <div>
          <span>{post?.id}</span>
          <h2>{post?.title}</h2>
          {clickedEdit ? (
            <>
              <textarea
                value={inputValue}
                onChange={handleChange}
                style={{ width: "50vw", height: "20vh" }}
              />
              <br />
              <button onClick={handleSubmitEdit}>submit</button>
              <button onClick={() => setClickedEdit((prev) => !prev)}>
                cancel
              </button>
            </>
          ) : (
            <>
              <p>{post?.body}</p>
              <button onClick={() => setClickedEdit((prev) => !prev)}>
                edit text✏️
              </button>
            </>
          )}
          <br />
          <hr />
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
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChosenPost;
