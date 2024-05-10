import React, { useState } from "react";
import DisplayTodo from "./DisplayTodo";
function TodosDisplay(props) {
  const { todos, setTodos } = props;
  const [filter, setFilter] = useState("All")
  const [title, setTitle] = useState('')
  const [id, setId] = useState('')
  let list = [...todos];

  function isFiltered(todo) {
    switch (filter) {
      case "All":
        return true
      case "ID":
        return (todo.id.includes(id)) ? true : false;
      case "Title":
        return (todo.title.includes(title)) ? true : false
      case "Completed":
        return (todo.completed)
      case "UnCompleted":
        return (!todo.completed)
    }
  }

  const handleOrder = (event) => {
    switch (event.target.value) {
      case "random":
        list.sort(() => 0.5 - Math.random());
        setTodos(list);
        break
      case "alphabetical":
        list.sort(function (todo1, todo2) { return todo1.title.localeCompare(todo2.title) })
        setTodos(list)
        break
      case "completed":
        list.sort(function (todo1, todo2) {
          if (todo1.completed && !todo2.completed) {
            return -1;
          } else if (todo1.completed && !todo2.completed) {
            return 1;
          } else {
            return 0;
          }
        })
        setTodos(list);
        break
      case "serial":
        list.sort((todo1, todo2) => (parseInt(todo1.id) > parseInt(todo2.id)) ? 1 : -1);
        setTodos(list)
        break;
      default:
        break;
    }
  }

  const showSelectOrder = () => {
    return <select onChange={handleOrder}>
      <option value="serial">Serial order</option>
      <option value="random">random</option>
      <option value="alphabetical">alphabetical Order</option>
      <option value="completed">Completed</option>
    </select>
  }

  const showSelectFilter = () => {
    return <select name="filter by" id="filter" value={filter} onChange={(event) => setFilter(event.target.value)}>
      <option value="All">Display All</option>
      <option value="ID">Display By ID</option>
      <option value="Title">Display By Title</option>
      <option value="Completed">Display Completed</option>
      <option value="UnCompleted">Display UnCompleted</option>
    </select>
  }
  return (<>
    {showSelectOrder()}
    {showSelectFilter()}
    {filter === 'Title' &&
      <div><label>Enter wanted Title</label>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}></input></div>}
    {filter === 'ID' &&
      <div><label>Enter wanted Id</label>
        <input type="number" value={id} onChange={(event) => setId(event.target.value)}></input></div>}
    {todos.map((todo) => isFiltered(todo) && <div key={todo.id}><DisplayTodo todo={todo} setTodos={setTodos} todos={todos} /></div>)}
  </>)
} export default TodosDisplay


