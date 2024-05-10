import React, { useState, useEffect } from 'react';
function UpdatePost(props) {
    const { post, posts, setPosts } = props;
    const [updatedTitle, setUpdatedTitle] = useState(post.title)
    const [updatedBody, setUpdatedBody] = useState(post.body)
    const [inUpdate, setInUpdate] = useState(false);
    useEffect(() => {
        setUpdatedBody(updatedBody)
        setUpdatedTitle(updatedTitle)
    }, [inUpdate]);

    const updatePost = (event) => {
        event.preventDefault()
        setInUpdate(false);
        if (post.title === updatedTitle && post.body === updatedBody)
            return
        if (post.title != updatedTitle)
            updatePostRequest("title", updatedTitle)
        if (post.body != updatedBody)
            updatePostRequest("body", updatedBody)
    }
    const updatePostRequest = (key, newValue) => {
        try{
        const updatedPost = { ...post, [key]: newValue };
        fetch(`http://localhost:3000/posts/${post.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                [key]: newValue
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json())
             setPosts(posts.map((post1) => post1.id === post.id ? updatedPost : post1));
            } catch (error) {
                console.error("Error updating post:", error.message);
            }
    }

    return (<>
        <button onClick={() => { setInUpdate((prev) => !prev) }}>🖋</button>
        {inUpdate && <form onSubmit={updatePost}>
            <strong >Title: </strong>
            <input type='text' id='title' value={updatedTitle} onChange={(event) => { setUpdatedTitle(event.target.value) }} required /><br />
            <strong>Body: </strong>
            <input type='text' id='body' value={updatedBody} onChange={(event) => { setUpdatedBody(event.target.value) }} required /><br />
            <button type="submit">✔</button>
        </form>}</>)
} export default UpdatePost