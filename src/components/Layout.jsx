import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

const Layout = () => {
  function handleLogout() {
    localStorage.removeItem("currUser");
  }
  return (
    <>
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
          <Link to="./todos">Todos</Link>
        </p>
        <button onClick={handleLogout}>
          <Link to="/login">log out</Link>
        </button>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
