import React from "react";

const CreateDB = () => {
  async function db() {
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts),
    };
    await fetch("http://localhost:3000", requestOptions);
  }
  db();
  return <div></div>;
};

export default CreateDB;
