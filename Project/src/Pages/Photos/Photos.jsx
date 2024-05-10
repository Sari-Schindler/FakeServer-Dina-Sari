import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PhotosDisplay from "./PhotosDisplay";
import AddPhoto from "./AddPhoto";

function Photos() {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/photos?albumId=${albumId}&_start=0&_limit=${limit}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setError("Error fetching photos. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading photos...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h1>Photos</h1>
          <AddPhoto photos={photos} setPhotos={setPhotos} />
          <PhotosDisplay setPhotos={setPhotos} photos={photos} limit={limit} />
        </>
      )}
    </>
  );
}

export default Photos;