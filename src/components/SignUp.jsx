import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }
  const fetchUsers = async () => {
    try {
      if (inputs.username) {
        const response = await fetch(
          `http://localhost:3000/users?username=${inputs.username}`
        );
        if (!response.ok) {
          throw "error";
        } else {
          const data = await response.json();
          console.log(data);
          if (checkUsernameAvailability(data)) {
            const currUser = data;
            localStorage.setItem("currUser", JSON.stringify(currUser));
            navigate("../addDetails");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  function checkUsernameAvailability(data) {
    if (data.length !== 0) {
      alert("This username already exists");
      return false;
    } else {
      return checkVerifyPassword();
    }
  }
  function checkVerifyPassword() {
    if (inputs.password === inputs.verifyPassword) {
      return true;
    } else {
      alert("passwords not match");
      return false;
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetchUsers();
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
