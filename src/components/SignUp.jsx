import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const SignUp = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const { user, changeUser } = useContext(UserContext);
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
          checkUsernameAvailability(data);
          // setUsers(data);
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  function checkUsernameAvailability(data) {
    if (data.length !== 0) {
      alert("This username already exists");
    } else {
      checkVerifyPassword();
    }
  }
  function checkVerifyPassword() {
    if (inputs.password === inputs.verifyPassword) {
      //change to useContext
      const currUser = { username: inputs.username, website: inputs.password };
      localStorage.setItem("currUser", JSON.stringify(currUser));
      changeUser(currUser);
      navigate("../addDetails");
    } else {
      alert("passwords not match");
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
