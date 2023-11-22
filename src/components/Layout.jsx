import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <button>info</button>
      <nav>
        <p>
          <Link to="./home">Home</Link>
        </p>
        <p>
          <Link to="./albums">Albums</Link>
        </p>
        <p>
          <Link to="./posts">Posts</Link>
        </p>
        <p>
          <Link to="./todos">Posts</Link>
        </p>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
