import { useEffect, useState } from "react";
import axios from "axios";
import MemeCard from "../components/MemeCard";
// import "../styles/home.css";
import "../styles/explore.css";

const Home = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes").then((response) => {
      setMemes(response.data.data.memes.slice(0, 1000));
    });
  }, []);

  return (
    <div className="home-container1">
      <h2 className="home-title1">🔥 Trending Memes</h2>
      <div className="meme-grid1">
        {memes.map((meme,index) => (
          <div key={index} className="meme-card">        
          <MemeCard key={meme.id} meme={meme} />
        </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
