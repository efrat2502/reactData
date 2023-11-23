import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AlbumPictures = () => {
  const { albumId } = useParams();
  const [pictures, setPictures] = useState([]);
  const [range, setRange] = useState({ start: 0, end: 10 });
  const [showMoreBtn, setShowMoreBtn] = useState(
    <button onClick={showMore}>Show more</button>
  );

  useEffect(() => {
    fetch(
      `http://localhost:3000/photos?albumId=${albumId}&_start=${range.start}&_end=${range.end}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPictures((prev) => [...prev, ...data]);
        if (data.length === 0) {
          setShowMoreBtn(null);
        }
      });
  }, [albumId, range]);

  function showMore() {
    setRange((prev) => ({
      start: prev.start + 10,
      end: prev.end + 10,
    }));
  }
  return (
    <div>
      <h2>Pictures of Album {albumId}</h2>

      {pictures.map((picture) => (
        <img key={picture.id} src={picture.url} width="100px" />
      ))}

      {showMoreBtn}
    </div>
  );
};

export default AlbumPictures;
