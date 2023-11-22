import React, { useEffect, useState } from "react";

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    let currUser = JSON.parse(localStorage.getItem("currUser"));
    let currentId = currUser.id;

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
        <Link key={album.id} style={{ textAlign: "left" }}>
          <p>
            {album.id} : {album.title}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Albums;
