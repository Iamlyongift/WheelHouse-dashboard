import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // To decode the token

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decode the token and check its expiration
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds

    if (decodedToken.exp < currentTime) {
      // Token is expired
      localStorage.removeItem("token"); // Optionally remove the token
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Error decoding token", error);
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;



