
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [uploadedMemes, setUploadedMemes] = useState([]);

  useEffect(() => {
    const savedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    setUploadedMemes(savedMemes);
  }, []);

  return (
    <div className="profile-container">
      <h1 className="profile-title">Your Profile</h1>

      {uploadedMemes.length > 0 ? (
        <div className="meme-grid">
          {uploadedMemes.map((meme) => (
            <Link to={`/meme/${meme.id}`} key={meme.id} className="meme-card">
              <img src={meme.url} alt="Uploaded Meme" className="meme-image" />
              <p className="meme-caption">{meme.caption}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-memes">No memes uploaded yet.</p>
      )}
    </div>
  );
};

export default Profile;

