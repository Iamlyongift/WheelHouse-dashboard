import { useState, useEffect } from "react";
import Spinner from "./Spinner"; // Import the Spinner component
import "../css/UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for spinner
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const [limit, setLimit] = useState(8); // Number of users per page

  useEffect(() => {
    const fetchUsers = async (page) => {
      const baseURL = "https://api.cribsandrides.com";
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(
          `${baseURL}/admin/users?page=${page}&limit=${limit}`, // Add pagination query parameters
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }

        const data = await response.json();
        setUsers(data.users || []);
        setCurrentPage(data.currentPage); // Update current page
        setTotalPages(data.totalPages); // Update total pages
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers(currentPage); // Fetch users for the current page
  }, [currentPage, limit]);

  // Function to toggle user status
  const toggleUserStatus = async (userID, currentStatus) => {
    const baseURL = "https://api.cribsandrides.com";
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${baseURL}/admin/users/${userID}/toggle-status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isActive: !currentStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle user status.");
      }

      // Update user list with the new status
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userID ? { ...user, isActive: !currentStatus } : user
        )
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
      alert("Failed to toggle user status");
    }
  };

  // Spinner during loading
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Pagination buttons
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage); // Update the current page
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Role</th>
            <th>Is Active</th>
            <th>Created At</th>
            <th>Actions</th> {/* Add a new column for the actions */}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.isActive ? "Yes" : "No"}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  {/* Add a toggle button for each user */}
                  <button
                    onClick={() => toggleUserStatus(user._id, user.isActive)}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
