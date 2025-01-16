import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

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
import AdminLogin from "./components/Login";
import AdminRegisterForm from "./components/AdminRegisterForm";
import AdminSendEmail from "./components/AdminSendEmails";

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
          <Route path="/register" element={<AdminRegisterForm />} />
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
            path="sendemails"
            element={
              <PrivateRoute>
                <AdminSendEmail />
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
