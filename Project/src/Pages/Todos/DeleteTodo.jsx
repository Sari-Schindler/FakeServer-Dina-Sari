import React from "react";
function DeleteTodo(props) {
    const { todo, todos, setTodos } = props;

    function handleDelete(ID) {
        fetch(`http://localhost:3000/todos/${ID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            setTodos(todos.filter(todo => todo.id !==ID));
        }).catch(error => {
            console.error(error);
        });
    }

    return (<>
        <button onClick={() => handleDelete(todo.id)}>🗑️</button>
    </>)
} export default DeleteTodo
