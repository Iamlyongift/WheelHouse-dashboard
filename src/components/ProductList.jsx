import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/ProductList.css";
import { MdDelete } from "react-icons/md";
import Spinner from "./Spinner";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // Adjust the number of products per page

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      const baseURL = "https://api.cribsandrides.com";
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${baseURL}/product/getAllProduct`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setProducts(data.getAllProduct || []); // Set the correct part of the fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to delete a product
  const handleDelete = async (id) => {
    const baseURL = "https://api.cribsandrides.com";
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${baseURL}/product/deleteProduct/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the product");
      }

      // Remove the deleted product from the UI
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product");
    }
  };

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

  // Logic for displaying current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  if (loading) {
    return <Spinner />;
  }


  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Product Type</th>
            <th>Description</th>
            <th>Stock</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                  <Link to={`/getSingleProduct/${product._id}`} className="link">
                    {product.productName}
                  </Link>
                </td>
                <td>{product.category}</td>
                <td>{product.productType}</td>
                <td>{truncateText(product.description, descriptionLimit)}</td>
                <td>{product.stock}</td>
                <td>
                  <img
                    src={
                      product.images && product.images[0]
                        ? product.images[0]
                        : "#"
                    }
                    alt={product.productName}
                    style={{
                      width: "180px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <button onClick={() => handleDelete(product._id)}>
                    <MdDelete size={25} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No products found</td>
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

export default ProductList;
