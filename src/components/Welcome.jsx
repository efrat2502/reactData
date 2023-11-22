import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <h1>WELCOME TO OUR WEBSITE</h1>
      <nav>
        <ul>
          <li>
            <Link to="/login">login</Link>
          </li>
          <li>
            <Link to="/register">signUp</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Welcome;
