import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import AdminLogin from "./components/adminlogin";
import "./App.css";
import UserList from "./components/UserList";
import ProductList from "./components/ProductList";
import CategoryList from "./components/CategoryList";
import CreateCategoryAndProduct from "./components/ProductCreation";
import PrivateRoute from "./components/PrivateRoute";
import Messages from "./components/Messages";
import ProductDetails from "./components/ProductDetails";
import CarList from "./components/CarList";
import HouseList from "./components/HouseList";

function App() {
  // Use useLocation to detect the current path
  const location = useLocation();

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        {/* Only render Dashboard when on the home page (/) */}
        {location.pathname === "/" && <Dashboard />}
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="userlist"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="productlist"
            element={
              <PrivateRoute>
                <ProductList />
              </PrivateRoute>
            }
          />
          <Route
            path="categorylist"
            element={
              <PrivateRoute>
                <CategoryList />
              </PrivateRoute>
            }
          />
          <Route
            path="createproduct"
            element={
              <PrivateRoute>
                <CreateCategoryAndProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="messages"
            element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            }
          />
          <Route
            path="/getSingleProduct/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />
            <Route
            path="/carlist"
            element={
              <PrivateRoute>
                <CarList />
              </PrivateRoute>
            }
          />
           <Route
            path="/houselist"
            element={
              <PrivateRoute>
                <HouseList />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default MainApp;
