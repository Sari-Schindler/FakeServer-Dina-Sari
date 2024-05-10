import React from "react";
import DeletePhoto from "./DeletePhoto";
import UpdatePhoto from "./UpdatePhoto"

function DisplayPhoto(props) {
    const { photo, photos, setPhotos } = props;

    return (<>
          <div> {photo.id} <br />
        <strong>Name: </strong>{photo.title} <br />
         <img src={photo.thumbnailUrl} alt={photo.title} /> <br/>
        <UpdatePhoto photo={photo} setPhotos={setPhotos} photos={photos} />
        <DeletePhoto photo={photo} setPhotos={setPhotos} photos={photos} />
        </div>
    </>)
}
export default DisplayPhoto