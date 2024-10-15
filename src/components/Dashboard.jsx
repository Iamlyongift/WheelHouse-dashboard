import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Dashboard.css"; 

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        const baseURL = "http://localhost:2025";
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        // Utility function to fetch data and check response
        const fetchData = async (url, setState, label) => {
          const response = await fetch(url, requestOptions);
          const data = await response.json();

          // Log the data and state being updated
          console.log(`Data from ${label}:`, data);

          // Check if the data contains the expected "count" property
          if (data.count !== undefined) {
            setState(data.count);
            console.log(`${label} count set to:`, data.count);
          } else {
            console.error(`No count found in ${label} data:`, data);
          }
        };

        // Fetch all the data
        await fetchData(`${baseURL}/admin/users`, setUserCount, "User");
        await fetchData(
          `${baseURL}/feedback/count`,
          setFeedbackCount,
          "Feedback"
        );
        await fetchData(
          `${baseURL}/admin/getcategories`,
          setCategoryCount,
          "Category"
        );
        await fetchData(
          `${baseURL}/product/getAllProduct`,
          setProductCount,
          "Product"
        );
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="dashboard">
      <h1>Welcome To The Billionaire Power Control Board</h1>
      <div className="dashboard-items">
        <div className="card">
          <Link to="/userlist">All Users: {userCount}</Link>
        </div>
        <div className="card">
          <Link to="/messages">Messages: {feedbackCount}</Link>
        </div>
        <div className="card">
          <Link to="/productlist">Total Products: {productCount}</Link>
        </div>
        <div className="card">
          <Link to="/categorylist">Categories: {categoryCount}</Link>
        </div>
        <div className="card">
          <Link>Create an Announcement</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
