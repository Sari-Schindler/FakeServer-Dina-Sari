import React, { useState } from "react";
import { useParams } from "react-router-dom"

function AddPhoto(props) {
    const { albumId } = useParams();
    const { photos, setPhotos } = props;
    const [isAdding, setIsAdding] = useState(false)

    async function addPhoto(event) {
        event.preventDefault()
        const response = await fetch("http://localhost:3000/nextID");
        const json = await response.json();
        const { nextPhotoId } = json[0];
        fetch("http://localhost:3000/nextID/1", {
            method: "PATCH",
            body: JSON.stringify({ "nextPhotoId": nextPhotoId + 1 }),
            headers: { "Content-type": "application/json; charset=UTF-8", },
        })
            .then((response) => response.json())
        let newPhoto = {
            "albumId": albumId,
            "id": nextPhotoId.toString(),
            "title": event.target[0].value,
            "url": event.target[1].value.toString(),
            "thumbnailUrl": event.target[1].value.toString().replace('/600/', '/150/')
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPhoto)
        }
        fetch('http://localhost:3000/photos', requestOptions)
            .then(data => {
                setPhotos([...photos, newPhoto]);
                setIsAdding(false)
            })
            .catch(error => console.error(error));
    }

    return (<>
        <button onClick={() => setIsAdding(true)}>Add Photo</button>
        {isAdding && <form onSubmit={addPhoto}><h3>Enter Title</h3>
        <input type="text"></input>
        <h3>Enter Url</h3>
        <input type="text"></input>
        <button type="submit">✔</button></form>}</>)
} export default AddPhoto