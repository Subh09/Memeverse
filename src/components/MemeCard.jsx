import { useState } from "react";
import { FaHeart, FaComment, FaShareAlt } from "react-icons/fa";

const MemeCard = ({ meme }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const handleLike = () => setLikes((prevLikes) => prevLikes + 1);

  const handleComment = () => {
    if (commentInput.trim()) {
      setComments([...comments, commentInput]);
      setCommentInput("");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(meme.url);
    alert("Meme link copied to clipboard! 🎉");
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-xl flex flex-col items-center transition-transform duration-300 hover:scale-105">
      <img src={meme.url} alt={meme.name} className="w-full h-56 object-cover rounded-lg" />
      <h3 className="text-lg font-semibold mt-2 text-center">{meme.name}</h3>

      <div className="flex gap-4 mt-3">
        <button onClick={handleLike} className="flex items-center gap-1 text-red-500 hover:scale-110 transition">
          <FaHeart /> {likes}
        </button>

        <button onClick={handleShare} className="flex items-center gap-1 text-blue-500 hover:scale-110 transition">
          <FaShareAlt /> Share
        </button>
      </div>

      <div className="mt-3 w-full">
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add a comment..."
          className="w-full border border-gray-300 p-2 rounded-lg text-sm"
        />
        <button
          onClick={handleComment}
          className="bg-blue-500 text-white px-3 py-1 mt-2 rounded-lg hover:bg-blue-600"
        >
          Comment
        </button>

        <ul className="mt-2 text-sm">
          {comments.map((comment, index) => (
            <li key={index} className="bg-gray-200 p-2 rounded-lg mt-1">{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MemeCard;