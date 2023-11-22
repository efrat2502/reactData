import React from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <button>info</button>
      <nav>
        <ul>
          <li>
            <Link to="./home">Home</Link>
          </li>
          <li>
            <Link to="./albums">Albums</Link>
          </li>
          <li>
            <Link to="./posts">Posts</Link>
          </li>
          <li>
            <Link to="./todos">Todos</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
