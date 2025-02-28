
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/upload.css";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  useEffect(() => {
    const savedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    setUploadedMemes(savedMemes);
    setLikes(JSON.parse(localStorage.getItem("memeLikes")) || {});
    setComments(JSON.parse(localStorage.getItem("memeComments")) || {});
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadMeme = async () => {
    if (!image) {
      alert("Please select an image!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=6ef71fc1b2f3ca371471a5f2a45103ea`,
        formData
      );

      if (response.data.success) {
        const newMeme = {
          id: Date.now(),
          url: response.data.data.url,
          caption,
        };

        const updatedMemes = [...uploadedMemes, newMeme];
        setUploadedMemes(updatedMemes);
        localStorage.setItem("uploadedMemes", JSON.stringify(updatedMemes));

        setImage(null);
        setPreview(null);
        setCaption("");
      } else {
        alert("Failed to upload meme.");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Upload failed.");
    }

    setUploading(false);
  };

  return (
    <div className="upload-container">
      <h1 className="upload-title">Upload Meme</h1>

      <input type="file" accept="image/*" className="file-input" onChange={handleImageChange} />

      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="preview-image" />
        </div>
      )}

      <input
        type="text"
        placeholder="Enter caption..."
        className="caption-input"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <button onClick={uploadMeme} className="upload-button" disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Meme"}
      </button>

      <h2 className="meme-list-title">Your Uploaded Memes</h2>
      <div className="meme-grid">
        {uploadedMemes.map((meme) => (
          <div key={meme.id} className="meme-card">
            <img src={meme.url} alt="Uploaded Meme" className="meme-image" />
            <p className="meme-caption">{meme.caption}</p>

            <button
              onClick={() => {
                const newLikes = { ...likes, [meme.id]: (likes[meme.id] || 0) + 1 };
                setLikes(newLikes);
                localStorage.setItem("memeLikes", JSON.stringify(newLikes));
              }}
              className="like-button"
            >
              ❤️ Like ({likes[meme.id] || 0})
            </button>

            <div className="mt-2">
              <input
                type="text"
                placeholder="Add a comment..."
                className="comment-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    const newComments = { ...comments, [meme.id]: [...(comments[meme.id] || []), e.target.value] };
                    setComments(newComments);
                    localStorage.setItem("memeComments", JSON.stringify(newComments));
                    e.target.value = "";
                  }
                }}
              />
              <div className="mt-2">
                {comments[meme.id]?.map((comment, index) => (
                  <p key={index} className="comment-box">{comment}</p>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.href}/meme/${meme.id}`);
                alert("Link copied!");
              }}
              className="copy-button"
            >
              🔗 Copy Link
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
