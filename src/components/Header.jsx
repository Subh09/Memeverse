import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-2xl font-bold">MemeVerse</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/upload">Upload</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;