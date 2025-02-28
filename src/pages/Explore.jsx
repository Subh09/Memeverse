import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "../styles/explore.css";

const Explore = () => {
  const [memes, setMemes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("trending");
  const observer = useRef();

  // Debounced Search Handling
  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  // Fetch Memes from Imgflip API
  const fetchMemes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      if (response.data.success) {
        let fetchedMemes = response.data.data.memes;

        // Apply filters
        if (filter === "classic") {
          fetchedMemes = fetchedMemes.filter((meme) => meme.width < 500);
        } else if (filter === "new") {
          fetchedMemes = fetchedMemes.reverse();
        } else if (filter === "random") {
          fetchedMemes = fetchedMemes.sort(() => Math.random() - 0.5);
        }

        // Apply Search Filtering
        if (searchTerm.trim()) {
          fetchedMemes = fetchedMemes.filter((meme) =>
            meme.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setMemes((prev) => [...prev, ...fetchedMemes.slice(0, 1000)]);
      }
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
    setLoading(false);
  };

  // Infinite Scrolling Setup
  useEffect(() => {
    fetchMemes();
  }, [page, filter, searchTerm]);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (observer.current && document.getElementById("load-more")) {
      observer.current.observe(document.getElementById("load-more"));
    }
  }, []);

  return (
    <div className="explore-container">
      <h1 className="explore-title">Explore Memes</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search memes..."
        className="search-bar"
        onChange={handleSearch}
      />

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["trending", "new", "classic", "random"].map((cat) => (
          <button
            key={cat}
            className={`filter-button ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Meme Grid */}
      <div className="meme-grid">
        {memes.map((meme, index) => (
          <div key={index} className="meme-card">
            <img src={meme.url} alt={meme.name} />
            <p className="meme-title">{meme.name}</p>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      {loading && <p className="loading-text">Loading more memes...</p>}
      <div id="load-more" className="load-more-trigger" />
    </div>
  );
};

export default Explore;
