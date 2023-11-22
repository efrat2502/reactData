import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const AddDetails = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ name: "", email: "", phone: "" });
  const { user, changeUser } = useContext(UserContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    addNewUser();
  }
  function addNewUser() {
    const currUser = JSON.parse(localStorage.getItem("currUser"));
    const updatedUser = {
      ...currUser,
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
    };
    localStorage.setItem("currUser", JSON.stringify(updatedUser));
    changeUser(updatedUser);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    };
    fetch("http://localhost:3000/users", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate(`/users/${data.id}/home`));
  }
  return (
    <div>
      <h1>please add more details...</h1>
      <form onSubmit={handleSubmit}>
        <label>
          name:
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          email:
          <input
            type="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          phone:
          <input
            type="tel"
            name="phone"
            value={inputs.phone || ""}
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

export default AddDetails;
