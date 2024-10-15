import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="user-info">
        <img src="user-avatar-url" alt="User avatar" />
        <span>Mr. Harry Sam</span>
      </div>
      <div className="control-buttons">
      {isLoggedIn ? (
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      ) : (
        <button className="login-btn">
          <Link to="/login">Log in</Link>
        </button>
      )}
      </div>
    </header>
  );
};

export default Header;
