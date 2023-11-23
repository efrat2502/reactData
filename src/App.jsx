import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Albums from "./components/Albums";
import Todos from "./components/Todos";
import Layout from "./components/Layout";
import Welcome from "./components/Welcome";
import NoPage from "./components/NoPage";
import AlbumPictures from "./components/AlbumPictures";
import AddDetails from "./components/AddDetails";
import { UserProvider } from "./components/UserContext";
import ChosenPost from "./components/ChosenPost";
function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/addDetails" element={<AddDetails />} />
            <Route path="/users/:id" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="posts">
                <Route index element={<Posts />} />
                <Route path=":postId" element={<ChosenPost />} />
              </Route>
              <Route path="albums">
                <Route index element={<Albums />} />
                <Route path=":albumId" element={<AlbumPictures />} />
              </Route>
              <Route path="todos" element={<Todos />} />
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
