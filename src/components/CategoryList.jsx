import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import Spinner from "./Spinner";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = "https://api.cribsandrides.com"; // Set the base URL once

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage

      // If no token, show an error and return early
      if (!token) {
        setError("You need to log in to view categories.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/admin/getcategories`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        console.log(data); // Log the response data to check its structure
        setCategories(data.categories || []); // If categories are wrapped inside another object
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Function to delete a category
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to log in to delete categories.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/admin/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the category");
      }

      // Remove the deleted category from the UI
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
      alert("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete the category");
    }
  };
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Category List</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>

            <th>Product Type</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.name}</td>
                <td>{category.type}</td>
                <td>{category.description}</td>
                <td>
                  <button onClick={() => handleDelete(category._id)}>
                    <MdDelete size={25} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No categories available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
