import React, { useEffect, useState, useRef, useSearchparams } from "react";
const Todos = () => {
  const [searchParams, setSearchParams] = useSearchparams();
  let currentId;
  let allTodos = useRef([]);
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
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
  }, []);

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
    }
  }

  return (
    <div>
      <h1>todos</h1>
      <label>
        <button onClick={handleSearch}>search</button>{" "}
        <input onChange={(e) => setSearch(e.target.value)} />
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
