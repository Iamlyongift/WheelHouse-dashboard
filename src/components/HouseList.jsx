import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/ProductList.css";
import Spinner from "./Spinner";
// import { MdDelete } from "react-icons/md";

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch houses when the component mounts
  useEffect(() => {
    const fetchHouses = async () => {
      const baseURL = "https://wheelhouse.onrender.com";
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${baseURL}/product/houses`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch houses");
        }

        const data = await response.json();
        setHouses(data || []); // Set the correct part of the fetched data
      } catch (error) {
        console.error("Error fetching houses:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };
  // Adjust the text limit
  const descriptionLimit = 30;

  if (loading) {
    return <Spinner />;
  }


  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>House List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {houses.length > 0 ? (
            houses.map((house) => (
              <tr key={house._id}>
                <td>{house._id}</td>
                <td>
                  <Link to={`/getSingleProduct/${house._id}`} className="link">
                    {house.productName}
                  </Link>
                </td>
                <td>{house.category}</td>
                <td>{house.price}</td>
                <td>{truncateText(house.description, descriptionLimit)}</td>
                <td>{house.stock}</td>
                <td>
                  {house.images.length > 0 && (
                    <img
                      src={house.images[0]}
                      alt={house.productName}
                      style={{ width: "180px", height: "80px", objectFit: "cover" }}
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No houses found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HouseList;
