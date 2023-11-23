import React, { useState } from "react";

const Home = () => {
  const [clickedInfo, setClickedInfo] = useState(false);
  const currUser = JSON.parse(localStorage.getItem("currUser"));

  return (
    <div>
      <h1>home</h1>
      <h2>hi {currUser.name}!</h2>
      <button onClick={() => setClickedInfo((prev) => !prev)}>info</button>
      {clickedInfo && (
        <div>
          <h3>username:{currUser?.username} </h3>
          <h4>email:{currUser?.email} </h4>
          <h5>phone:{currUser?.phone} </h5>
        </div>
      )}
    </div>
  );
};

export default Home;
