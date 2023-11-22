import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [users, setUsers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let userId;
  const navigate = useNavigate();
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }
  //   useEffect(() => {
  //     if (inputs.username && submitted) {
  //       //   setSubmitted(false);
  //       fetch(`http://localhost:3000/users?username=${inputs.username}`)
  //         .then(console.log("fetched"))
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           setUsers(data);
  //         })

  //         .catch((error) => console.error("Error fetching users:", error));
  //     }
  //   }, [submitted]);
  function handleSubmit(e) {
    setSubmitted(true);
    e.preventDefault();
    if (!inputs.username || !inputs.password) {
      setErrorMessage("please fill username and password");
    }
    fetch(`http://localhost:3000/users?username=${inputs.username}`)
      .then(console.log("fetched"))
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        data.forEach((user) => {
          if (user.website === inputs.password) {
            console.log("logged in");
            localStorage.setItem("currentUser", JSON.stringify(user));
            userId = data[0].id;
            navigate(`/users/${userId}/home`);
          } else {
            console.log("incorrect");
            setErrorMessage("username or password incorrect");
          }
        });
      })
      .catch((error) => console.error("Error fetching users:", error));
  }
  return (
    <>
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
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>{errorMessage}</p>
    </>
  );
}
export default Login;
