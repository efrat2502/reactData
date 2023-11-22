import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
const Todos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let currentId;
  let allTodos = useRef([]);
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [newTodo, setNewTodo] = useState("");
  useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentId = currentUser.id;
    fetch(`http://localhost:3000/todos?userId=${currentId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
        allTodos.current = data;
      });
  }, [searchParams]);

  function handleCheck(todoId) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        console.log("   return { ...todo, completed: !todo.completed }: ", {
          ...todo,
          completed: !todo.completed,
        });
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }
  // function handleSearch() {
  //   const filteredTodos = allTodos.current.filter(
  //     (todo) => todo.id === parseInt(search)
  //   );
  //   setTodos(filteredTodos);
  // }

  function handleSearch() {
    if (typeof parseInt(search) === "number") {
      setSearchParams({ id: search });
      searchParams.get.id;
    }
  }
  function addTodo() {
    setNewTodo({
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    });
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
      <h1>todos</h1>
      <label>
        <button onClick={handleSearch}>search</button>
        <input onChange={(e) => setSearch(e.target.value)} />
      </label>
      <br></br>
      <label>
        <input onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>add todo</button>
      </label>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              {todo.id}
              <input
                type="checkbox"
                value={todo.id}
                checked={todo.completed}
                onChange={() => {
                  handleCheck(todo.id);
                }}
              />
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
