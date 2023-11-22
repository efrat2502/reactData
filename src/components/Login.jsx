import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  let userId;
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!inputs.username || !inputs.password) {
      setErrorMessage("please fill username and password");
    }
    fetch(`http://localhost:3000/users?username=${inputs.username}`)
      .then(console.log("fetched"))
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setErrorMessage("username or password incorrect");
          return;
        }
        console.log(data);
        const user = data[0];
        data.forEach((user) => {
          if (user.website === inputs.password) {
            console.log("logged in");
            localStorage.setItem("currUser", JSON.stringify(user));
            userId = user.id;
            navigate(`/users/${userId}/home`);
          } else {
            console.log("incorrect");
            setErrorMessage("username or password incorrect");
          }
        });
      })
      .catch((error) => alert("Error fetching users:", error));
  }
  return (
    <>
      <h1>LogIn</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Login</button>
      </form>
      <p>{errorMessage}</p>
    </>
  );
}
export default Login;
