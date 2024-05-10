import React from "react";
import DeleteTodo from "./DeleteTodo";
import UpdateTodo from "./UpdateTodo"

function DisplayTodo(props) {
    const { todo, todos, setTodos } = props;

    return (<>
        <strong>TodoID:</strong>{todo.id} <br />
        <strong>Title: </strong>{todo.title} <br />
        <UpdateTodo todo={todo} setTodos={setTodos} todos={todos} />
        <DeleteTodo todo={todo} setTodos={setTodos} todos={todos} />
    </>)
}
export default DisplayTodo