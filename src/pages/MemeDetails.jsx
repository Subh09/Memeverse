import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);

  // Load memes from LocalStorage
  useEffect(() => {
    const savedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    const selectedMeme = savedMemes.find((m) => m.id === parseInt(id));
    setMeme(selectedMeme);
  }, [id]);

  if (!meme) return <p className="text-center text-gray-500">Meme not found.</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">{meme.caption}</h1>
      <img src={meme.url} alt="Meme" className="w-full rounded-lg shadow" />
    </div>
  );
};

export default MemeDetails;
