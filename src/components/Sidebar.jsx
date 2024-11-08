import { Link } from "react-router-dom";
import "../css/Sidebar.css";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="hamburger" onClick={toggleSidebar}>
        <div className={isOpen ? "bar bar1 active" : "bar bar1"}></div>
        <div className={isOpen ? "bar bar2 active" : "bar bar2"}></div>
        <div className={isOpen ? "bar bar3 active" : "bar bar3"}></div>
      </div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="list-container">
          <Link to="/" className="side-link">
            <li>Admin dashboard</li>
          </Link>
          <Link to="/userlist" className="side-link">
            <li>Users</li>
          </Link>
          <Link to="/createproduct" className="side-link">
            <li>Create Products</li>
          </Link>
          <Link to="/categorylist" className="side-link">
            <li>Categories</li>
          </Link>
          <Link to="/productlist" className="side-link">
            <li>Total Products</li>
          </Link>
          <Link to="/houselist" className="side-link">
            <li>Houses</li>
          </Link>
          <Link to="/carlist" className="side-link">
            <li>Cars</li>
          </Link>
          <Link to="/" className="side-link">
            <li>Update Product</li>
          </Link>
          <Link to="/register" className="side-link">
            <li>Register Admin</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
