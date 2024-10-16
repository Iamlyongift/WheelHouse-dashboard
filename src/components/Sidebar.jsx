
import { Link } from "react-router-dom";
import "../css/Sidebar.css"; 

const Sidebar = () => {


  return (
    <div className="sidebar">
      <Link to="/">
        <h2>Dashboard</h2>
      </Link>
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
  );
};

export default Sidebar;
