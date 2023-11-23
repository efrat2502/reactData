import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
const Todos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let currentId;
  let allTodos = useRef([]);
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [sort, setSort] = useState("");
  let currUser = JSON.parse(localStorage.getItem("currUser"));
  currentId = currUser.id;

  function fetchTodos() {
    let apiUrl = `http://localhost:3000/todos?userId=${currentId}`;
    if (sort === "alphabetically") {
      apiUrl += `&_sort=title&_order=asc`;
    } else if (sort === "completed") {
      apiUrl += `&_sort=completed&_order=asc`;
    } else if (sort === "id") {
      apiUrl += `&_sort=id&_order=asc`;
    }
    if (search) {
      let searchUrl;
      const input = search.trim();
      if (!isNaN(input)) {
        searchUrl = `id=${input}`;
      } else if (input.toLowerCase() === "completed") {
        searchUrl = `completed=true`;
      } else {
        searchUrl = `title_like=${input}`;
      }

      apiUrl += `&${searchUrl}`;
    }
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
        allTodos.current = data;
      });
  }
  useEffect(() => {
    fetchTodos();
  }, [sort, searchParams]);

  function handleCheck(todoId) {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  }

  function handleSearch() {
    setSearchParams({ search: search });
  }
  function addTodo() {
    const newTodoObj = {
      userId: currentId,
      title: newTodo,
      completed: false,
    };
    setNewTodo(newTodoObj);
    console.log("newTodoObj: ", newTodoObj);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodoObj),
    };
    fetch("http://localhost:3000/todos", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        setNewTodo("");
        setTodos((prev) => [...prev, data]);
      });
  }

  function sortTodos(value) {
    if (value === "alphabetically") {
      setSort("alphabetically");
    } else if (value === "completed") {
      setSort("completed");
    } else if (value === "id") {
      setSort("id");
    }
  }

  return (
    <div>
      <h1>todos</h1>
      <select value={sort} onChange={(e) => sortTodos(e.target.value)}>
        <option>sort by</option>
        <option value="id">id</option>
        <option value="alphabetically">alphabetically</option>
        <option value="completed">completed</option>
      </select>
      <br></br>
      <label>
        <input onChange={(e) => setSearch(e.target.value)} />
        <button onClick={handleSearch}>search</button>
      </label>
      <br></br>
      <label>
        <input
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <button onClick={addTodo}>add todo</button>
      </label>
      <ul style={{ textAlign: "left" }}>
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

// function handleSearch() {
//   const filteredTodos = allTodos.current.filter(
//     (todo) => todo.id === parseInt(search)
//   );
//   setTodos(filteredTodos);
// }
