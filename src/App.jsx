import { useState, useEffect } from "react";
import Login from "./components/Login.jsx";
import "./App.css";

function App() {
  // const [users, setUsers] = useState;
  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //     .then((res) => res.json())
  //     .then((data) => setUsers(data))
  //     .catch((error) => console.error("Error fetching users:", error));
  // }, []);

  return (
    <>
      <Login />
    </>
  );
}

export default App;
