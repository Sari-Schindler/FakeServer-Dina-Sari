import React, { useState } from "react";
import DisplayPhoto from "./DisplayPhoto";
import { useParams } from "react-router-dom";

function PhotosDisplay(props) {
  const { albumId } = useParams();
  const { photos, setPhotos, limit } = props;
  const [more, setMore] = useState(true);
  const [start, setStart] = useState(limit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getMorePhotos(albumId, start, limit) {
    try {
      setLoading(true);
      const morePhotos = await getUserPhotos(albumId, start, limit);

      setPhotos((prevPhotos) => [...prevPhotos, ...morePhotos]);
      setStart(start + limit);
    } catch (error) {
      console.error("Error fetching more photos:", error);
      setError("Error fetching more photos. Please try again.");
    } finally {
      setLoading(false);
    }
  }
 
  async function getUserPhotos(albumId, start, limit) {
    try {
      const response = await fetch(
        `http://localhost:3000/photos?albumId=${albumId}&_start=${start}&_end=${start+limit}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json_response = await response.json();

      if (json_response.length === limit) {
        return json_response;
      } else  
        setMore(false);
        return json_response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  return (
    <>
      {photos.map((photo) => (
        <p key={photo.id}>
          <DisplayPhoto photo={photo} setPhotos={setPhotos} photos={photos} />
        </p>
      ))}
      {loading ? (
        <p>Loading more photos...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : more && (
        <button onClick={() => getMorePhotos(albumId, start, limit)}>More</button>
      )}
    </>
  );
}

export default PhotosDisplay;