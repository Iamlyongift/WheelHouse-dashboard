import { Link } from "react-router-dom";
import "../css/Sidebar.css";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  FaTachometerAlt,
  FaUserAlt,
  FaBoxes,
  FaRegBuilding,
  FaCar,
  FaHome,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleSidebar}>
        {isOpen ? <IoCloseOutline size={25} /> : <RxHamburgerMenu size={25} />}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul className="list-container">
          <Link to="/" className="side-link">
            <FaTachometerAlt className="icon" size={20} />
            <li>Admin dashboard</li>
          </Link>
          <Link to="/userlist" className="side-link">
            <FaUserAlt className="icon" size={20} />
            <li>Users</li>
          </Link>
          <Link to="/createproduct" className="side-link">
            <FaBoxes className="icon" size={20} />
            <li>Create Products</li>
          </Link>
          <Link to="/categorylist" className="side-link">
            <FaRegBuilding className="icon" size={20} />
            <li>Categories</li>
          </Link>
          <Link to="/productlist" className="side-link">
            <FaBoxes className="icon" size={20} />
            <li>Total Products</li>
          </Link>
          <Link to="/houselist" className="side-link">
            <FaHome className="icon" size={20} />
            <li>Houses</li>
          </Link>
          <Link to="/carlist" className="side-link">
            <FaCar className="icon" size={20} />
            <li>Cars</li>
          </Link>
          <Link to="/" className="side-link">
            <FaBoxes className="icon" size={20} />
            <li>Update Product</li>
          </Link>
          <Link to="/register" className="side-link">
            <FaUserAlt className="icon" size={20} />
            <li>Register Admin</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
