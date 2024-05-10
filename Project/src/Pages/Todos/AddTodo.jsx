import React, { useState } from "react";
import { useParams } from "react-router-dom";

function AddTodo(props) {
    const { userId } = useParams();
    const { todos, setTodos } = props;
    const [isAdding, setIsAdding] = useState(false);

    async function addTodo(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/nextID");
            const json = await response.json();
            const { nextTodoId } = json[0];

            await fetch("http://localhost:3000/nextID/1", {
                method: "PATCH",
                body: JSON.stringify({ "nextTodoId": nextTodoId + 1 }),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            });

             const newTodo = {
                "userId": userId,
                "id": nextTodoId.toString(),
                "title": event.target[0].value,
                "completed": false
            };

             const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo)
            };

            const postResponse = await fetch('http://localhost:3000/todos', requestOptions);
            const responseData = await response.json();

             if (!postResponse.ok) {
                throw new Error(responseData.message || 'Adding todo failed. Please try again.');
            }

             setTodos([...todos, newTodo]);
            setIsAdding(false);
        } catch (error) {
            console.error("Error adding todo:", error.message);
        }
    }

    return (
        <>
            <button onClick={() => setIsAdding(true)}>Add ToDo</button>
            {isAdding && (
                <form onSubmit={addTodo}>
                    <h3>Add Title</h3>
                    <input type="text"></input>
                    <button type="submit">✔</button>
                </form>
            )}
        </>
    );
}

export default AddTodo;
