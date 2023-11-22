import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AlbumPictures = () => {
  const { albumId } = useParams();
  const [pictures, setPictures] = useState([]);
  const [endNum, setEndNum] = useState(10);

  useEffect(() => {
    fetch(
      `http://localhost:3000/photos?albumId=${albumId}&_start=0&_end=${endNum}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPictures(data);
      });
  }, [albumId, endNum]);

  return (
    <div>
      <h2>Pictures of Album {albumId}</h2>

      {pictures.map((picture) => (
        <img key={picture.id} src={picture.url} width="100px" />
      ))}
      <button onClick={() => setEndNum((prev) => prev + 10)}>show more</button>
    </div>
  );
};

export default AlbumPictures;
