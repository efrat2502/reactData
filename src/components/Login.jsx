import { useState, useEffect } from "react";
function Login() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [users, setUsers] = useState("");
  const [submitted, setSubmitted] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }
  useEffect(() => {
    if (inputs.username) {
      fetch(`http://localhost:3000/users?username=${inputs.username}`)
        .then(console.log("fetched"))
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUsers(data);
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [submitted]);
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
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
    </>
  );
}
export default Login;
