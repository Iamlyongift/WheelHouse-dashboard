import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/ProductList.css";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 5; // Adjust the number of cars per page

  // Fetch cars when the component mounts
  useEffect(() => {
    const fetchCars = async () => {
      const baseURL = "https://wheelhouse.onrender.com";
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${baseURL}/product/cars`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }

        const data = await response.json();
        setCars(data || []); // Set the correct part of the fetched data
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  // Adjust the text limit
  const descriptionLimit = 30;

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Logic for displaying current cars
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  // Calculate total pages
  const totalPages = Math.ceil(cars.length / carsPerPage);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Car List</h2>
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
          {currentCars.length > 0 ? (
            currentCars.map((car) => (
              <tr key={car._id}>
                <td>{car._id}</td>
                <td>
                  <Link to={`/getSingleProduct/${car._id}`} className="link">
                    {car.productName}
                  </Link>
                </td>
                <td>{car.category}</td>
                <td>{car.price}</td>
                <td>{truncateText(car.description, descriptionLimit)}</td>
                <td>{car.stock}</td>
                <td>
                  {car.images.length > 0 && (
                    <img
                      src={car.images[0]}
                      alt={car.productName}
                      style={{ width: "180px", height: "80px", objectFit: "cover" }}
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No cars found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarList;
