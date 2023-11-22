import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Albums = () => {
  let currentId;
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    let currUser = JSON.parse(localStorage.getItem("currUser"));
    currentId = currUser.id;

    let apiUrl = `http://localhost:3000/albums?userId=${currentId}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAlbums(data);
      });
  }, []);

  return (
    <div>
      <h1>Albums</h1>
      {albums.map((album) => (
        <Link key={album.id} to={`./${album.id}`}>
          <div style={{ textAlign: "left" }}>
            <p>
              {album.id} : {album.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Albums;
