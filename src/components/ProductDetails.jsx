import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/ProductDetails.css";
import Spinner from "./Spinner";


const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const fetchProductDetails = async () => {
      const baseURL = "https://wheelhouse.onrender.com";
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${baseURL}/product/getSingleProduct/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });


        const data = await response.json();
        setProduct(data.product); // Adjust this based on the actual response structure
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }


  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>No product details available.</p>;
  }
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="product-details-container">
      <h2>Product Details</h2>
      <div className="product-details-content">
        <p>ID: {product._id}</p>
        <p>Name: {product.productName}</p>
        <p>Category: {product.category}</p>
        <p>Description: {product.description}</p>
        <p>Stock: {product.stock}</p>
        {product.images && product.images.length > 0 && (
        <div className="image-slider">
          <button onClick={handlePrevImage}>{"<"}</button>
          <img
            src={product.images[currentImageIndex]}
            alt={product.item_name}
          />
          <button onClick={handleNextImage}>{">"}</button>
        </div>
      )}
      </div>
      <div className="product-details-footer">
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    </div>
  );
};

export default ProductDetails;
