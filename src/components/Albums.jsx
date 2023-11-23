import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Albums = () => {
  let currentId;
  const [albums, setAlbums] = useState([]);
  let currUser = JSON.parse(localStorage.getItem("currUser"));
  currentId = currUser.id;
  function fetchPosts() {
    let apiUrl = `http://localhost:3000/albums?userId=${currentId}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAlbums(data);
      });
  }
  useEffect(() => {
    fetchPosts();
  }, []);
  function handleDelete(albumId) {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`http://localhost:3000/albums/${albumId}`, requestOptions)
      .then((response) => response.json())
      .then(setAlbums(albums.filter((album) => album.id !== albumId)));
  }

  return (
    <div>
      <h1>Albums</h1>
      {albums.map((album) => (
        <div key={album.id}>
          <Link to={`./${album.id}`}>
            <div style={{ textAlign: "left" }}>
              <p>
                {album.id} : {album.title}
              </p>
            </div>
          </Link>
          <button onClick={() => handleDelete(album.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Albums;
