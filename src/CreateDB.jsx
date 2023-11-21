import React from "react";

const CreateDB = () => {
  async function db() {
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
  }
  return <div></div>;
};

export default CreateDB;
