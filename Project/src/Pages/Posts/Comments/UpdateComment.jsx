import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
function UpdatePost(props) {
    const { comment, comments, setComments } = props;
    const [updatedName, setUpdatedName] = useState(comment.name)
    const [updatedBody, setUpdatedBody] = useState(comment.body)
    const [inUpdate, setInUpdate] = useState(false);
    useEffect(() => {
        setUpdatedBody(updatedBody)
        setUpdatedName(updatedName)
    }, [inUpdate]);

    const updateComment = (event) => {
        event.preventDefault()
        setInUpdate(false);
        if (comment.name === updatedName && comment.body === updatedBody)
            return
        if (comment.name != updatedName)
            updateCommentRequest("name", updatedName)
        if (comment.body != updatedBody)
            updateCommentRequest("body", updatedBody)
    }
    const updateCommentRequest = (key, newValue) => {
        try{ 
        const updatedComment = { ...comment, [key]: newValue };
        fetch(`http://localhost:3000/comments/${comment.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                [key]: newValue
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
           setComments(comments.map((prevComment) => prevComment.id === comment.id ? updatedComment : prevComment));
        } catch (error) {
            console.error("Error updating comment:", error.message);
        }   
    }

    return (<>
        <button onClick={() => { setInUpdate((prev) => !prev) }}>🖋</button>
        {inUpdate && <form onSubmit={updateComment}>
            <strong >Name: </strong>
            <input type='text' id='title' value={updatedName} onChange={(event) => { setUpdatedName(event.target.value) }} required /><br />
            <strong>Comment: </strong>
            <input type='text' id='body' value={updatedBody} onChange={(event) => { setUpdatedBody(event.target.value) }} required /><br />
            <button type="submit">✔</button>
        </form>}</>)
} export default UpdatePost