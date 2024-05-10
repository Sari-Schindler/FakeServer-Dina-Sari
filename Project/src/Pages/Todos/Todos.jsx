import React, { useEffect, useState ,useContext } from "react";
import TodosDisplay from "./TodosDisplay";
import AddTodo from "./AddTodo";
import { UserContext } from '../../App' ;
function Todos(){
    const { currentUser} = useContext(UserContext)
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/todos/?userId=${currentUser.id}`)
            .then(response => response.json())
            .then(res => {
                setTodos(res);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Error fetching todos. Please try again.");
                setLoading(false);
            });
    }, []);
    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <h1>ToDos</h1>
                    <AddTodo todos={todos} setTodos={setTodos} />
                    <TodosDisplay setTodos={setTodos} todos={todos} />
                </>
            )}
        </>
    );
} export default Todos

