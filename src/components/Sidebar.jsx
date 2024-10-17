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
       
        <ul>
          
          <Link to="/">
            <li>Admin dashboard</li>
          </Link>
          <Link to="/userlist">
            <li>Users</li>
          </Link>
          <Link to="/createproduct">
            <li>Create Products</li>
          </Link>
          <Link to="/categorylist">
            <li>Categories</li>
          </Link>
          <Link to="/productlist">
            <li>Total Products</li>
          </Link>
          <Link to="/houselist">
            <li>Houses</li>
          </Link>
          <Link to="/carlist">
            <li>Cars</li>
          </Link>
          <Link to="/">
            <li>Update Product</li>
          </Link>
          <Link to="/register">
            <li>register</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
