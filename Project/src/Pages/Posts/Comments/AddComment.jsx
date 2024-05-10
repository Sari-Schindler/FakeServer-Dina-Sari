import React, { useState } from "react";

function AddComment(props) {
    const { comments, setComments ,postId} = props;
    const [isAddNew, setIsAddNew] = useState(false)
    let user=JSON.parse(localStorage.getItem("User"));
    async function addComment(event) {
        event.preventDefault()
        const response = await fetch("http://localhost:3000/nextID");
        const json = await response.json();
        const { nextCommentId } = json[0];
        console.log(postId)
        fetch("http://localhost:3000/nextID/1", {
            method: "PATCH",
            body: JSON.stringify({
                "nextCommentId": nextCommentId + 1
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));

        let newComment = {
            "postId": postId.toString(),
            "id": nextCommentId.toString(),
            "name":event.target[0].value,
            "email":user.email,
            "body": event.target[1].value
        }
        const newRequest = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        };
        fetch(`http://localhost:3000/comments`, newRequest)
            .then(data => {
                console.log(newComment)
                setComments([...comments, newComment]);
            })
            .catch(error => console.error(error));
        setIsAddNew(false)
    }

    return (
        <>
            <button onClick={() => setIsAddNew(true)}>add a comment...</button>
            {isAddNew && <div><form onSubmit={addComment}>
                <label>Enter comment's name:</label>
                <input type="text" placeholder="Enter title..."></input><br/>
                <label>Enter comment</label>
                <input type="text" placeholder="Enter body..."></input><br/>
                <button type="submit">✔</button>
            </form></div>}
        </>)
} export default AddComment