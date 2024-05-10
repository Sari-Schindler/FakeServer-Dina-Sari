import React from "react";
import { Link } from 'react-router-dom';
function DisplayAlbum(props) {
    const { album, albums, setAlbums } = props;

    return (<>
        <strong>album ID:</strong>{album.id} <br />
        <Link to={`${album.id}/photos`}>{album.title}</Link>
          </>)
}
export default DisplayAlbum