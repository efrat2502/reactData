import React from "react";

const Home = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <div>
      <p>hi {currentUser.name}!</p>
      home
    </div>
  );
};

export default Home;
