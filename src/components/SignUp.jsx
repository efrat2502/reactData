import React, { useState, useEffect } from "react";

const SignUp = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  //   const [users, setUsers] = useState("");
  const [submitted, setSubmitted] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (inputs.username) {
          const response = await fetch(
            `http://localhost:3000/users?username=${inputs.username}`
          );
          if (!response.ok) {
            throw "error-idk";
          } else {
            const data = await response.json();
            console.log(data);
            checkUsernameAvailability(data);
            // setUsers(data);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setSubmitted(false);
      }
    };
    if (submitted) {
      fetchUsers();
    }
  }, [submitted]);

  function checkUsernameAvailability(data) {
    if (data.length !== 0) {
      alert("This username already exists");
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      };
      fetch("http://localhost:3000/users", requestOptions);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }
  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          password:
          <input
            type="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          verify password:
          <input
            type="password"
            name="verifyPassword"
            value={inputs.verifyPassword || ""}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SignUp;
