const Home = () => {
  const currUser = JSON.parse(localStorage.getItem("currUser"));
  return (
    <div>
      <p>hi {currUser.name}!</p>
      home
    </div>
  );
};

export default Home;
