import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AlbumPictures = () => {
  const { albumId } = useParams();
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/pictures?albumId=${albumId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPictures(data);
      });
  }, [albumId]);

  return (
    <div>
      <h2>Pictures of Album {albumId}</h2>

      {pictures.map((picture) => (
        <img key={picture.id} src={picture.url} alt={picture.title} />
      ))}
    </div>
  );
};

export default AlbumPictures;
