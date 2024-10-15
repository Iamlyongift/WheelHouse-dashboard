import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateCategoryAndProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [productType, setProductType] = useState(""); // Product type selected
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [error, setError] = useState(null);
  const baseUrl = "http://localhost:2025";

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect to login if token is not present
    if (!token) {
      navigate("/admin/adminLogin"); // Adjust this route to match your login page route
    }

    // Fetch categories when product type is selected
    if (productType) {
      fetchCategoriesByProductType(productType);
    }
  }, [productType, navigate]);

  const fetchCategoriesByProductType = async (type) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${baseUrl}/admin/categories/${type}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories for product type");
      }

      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const categoryData = {
      name: categoryName,
      description: categoryDescription,
      type: productType, // Include product type with the category
    };

    try {
      const response = await fetch(`${baseUrl}/admin/categories`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create category");
      }

      // Clear form and refetch categories after creation
      setCategoryName("");
      setCategoryDescription("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productType", productType); // Include product type
    formData.append("category", selectedCategory);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    formData.append("stock", parseInt(productStock, 10));

    Array.from(productImages).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch(`${baseUrl}/product/createproduct`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Do not include Content-Type for FormData
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create product");
      }

      // Clear form after successful creation
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductStock("");
      setSelectedCategory("");
      setProductType("");
      setProductImages(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const inputStyle = { padding: "10px", margin: "10px 0", width: "100%" };
  const labelStyle = { display: "block", marginBottom: "5px", fontWeight: "bold" };
  const buttonStyle = { padding: "10px 20px", backgroundColor: "#ff6b6b", color: "#fff", border: "none", cursor: "pointer" };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Category Creation Form */}
      <h2>Create New Category</h2>
      <form onSubmit={handleCreateCategory}>
        <div>
          <label style={labelStyle}>Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Category Description:</label>
          <textarea
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            required
            style={{ ...inputStyle, height: "100px" }}
          ></textarea>
        </div>
        <div>
          <label style={labelStyle}>Product Type:</label>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">Select a type</option>
            <option value="car">Car</option>
            <option value="house">House</option>
          </select>
        </div>
        <button type="submit" style={buttonStyle}>
          Add Category
        </button>
      </form>

      {/* Product Creation Form */}
      <h2>Create New Product</h2>
      <form onSubmit={handleCreateProduct}>
        <div>
          <label style={labelStyle}>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Product Type:</label>
          <input
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
            style={inputStyle}
          >
            <option value="">Select a category</option>
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Product Description:</label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            style={{ ...inputStyle, height: "100px" }}
          ></textarea>
        </div>

        <div>
          <label style={labelStyle}>Stock:</label>
          <input
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Product Images:</label>
          <input
            type="file"
            onChange={(e) => setProductImages(e.target.files)}
            multiple
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default CreateCategoryAndProduct;
