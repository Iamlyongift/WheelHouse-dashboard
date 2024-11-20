import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";

export default function AdminLogin() {
  // State to capture email and password inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(""); // To display error messages
  const navigate = useNavigate(); // Hook to redirect after login

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    setLoading(true); // Set loading to true when submitting

    const baseUrl = "https://api.cribsandrides.com";
    try {
      const response = await fetch(`${baseUrl}/admin/adminLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send username and password
      });

      const data = await response.json(); // Parse the response

      if (response.ok) {
        localStorage.setItem("token", data.token); // Save token in localStorage
        navigate("/"); // Redirect to the dashboard or home page
      } else {
        // Login failed, display error message
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.", error);
    } finally {
      setLoading(false); // Set loading to false when the request completes
    }
  };

  return (
    <section>
      <div className="login-container">
        <div className="login-form">
          <h2>Login</h2>
          <h1>Welcome Back Admin</h1>
          <div className="login-con">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="options">
                <label>
                  <input type="checkbox" /> Remember
                </label>
                <Link to="/forgotpassword" className="forgot-password">
                  Forgot Your Password?
                </Link>
              </div>
              {error && <p className="error-message">{error}</p>}{" "}
              {/* Display errors */}
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Logging in..." : "LOGIN"}
              </button>
              {loading && <div className="loader"></div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
