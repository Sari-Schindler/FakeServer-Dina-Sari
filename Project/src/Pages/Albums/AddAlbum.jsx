import React, { useState } from "react";
import { useParams } from "react-router-dom"

function AddAlbum(props) {
    const {userId } = useParams();
    const {albums, setAlbums } = props;
    const [isAdding, setIsAdding] = useState(false)

    async function addAlbum(event) {
        event.preventDefault()
        const response = await fetch("http://localhost:3000/nextID");
        const json = await response.json();
        const { nextAlbumId } = json[0];
        fetch("http://localhost:3000/nextID/1", {
            method: "PATCH",
            body: JSON.stringify({ "nextAlbumId": nextAlbumId + 1 }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        })
            .then((response) => response.json())
        let newAlbum = {
            "userId": userId,
            "id": nextAlbumId.toString(),
            "title": event.target[0].value,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAlbum)
        }
        fetch('http://localhost:3000/albums', requestOptions)
            .then(data => {
                setAlbums([...albums, newAlbum]);
                setIsAdding(false)
            })
            .catch(error => console.error(error));
    }

    return (<>
        <button onClick={() => setIsAdding(true)}>Add Album</button>
        {isAdding && <form onSubmit={addAlbum}><h3>Add Title</h3>
        <input type="text"></input>
        <button type="submit">✔</button></form>}</>)
} export default AddAlbum