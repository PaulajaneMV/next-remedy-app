import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaEnvelope,
  FaChartBar,
  FaTasks,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaMoneyBill,
  FaBoxOpen,
} from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = ({ isMinimized, setIsMinimized }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Set activeItem based on the current route
  useEffect(() => {
    const currentPath = location.pathname;
    const pathToItemMap = {
      "/dashboard": "dashboard",
      "/campaigns": "campaigns",
      "/designs": "designs",
      "/analytics": "analytics",
      "/orders": "orders",
      "/payments": "payments",
      "/profile": "profile",
      "/settings": "settings",
      "/help": "help",
    };
    setActiveItem(pathToItemMap[currentPath] || "dashboard");
  }, [location]);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/"); // Redirect to Landing Page
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <aside className={`sidebar ${isMinimized ? "minimized" : ""}`}>
        <div className="sidebar-header">
          {!isMinimized && <h2>Next Remedy</h2>}
          <button className="menu-toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
        <nav className="sidebar-nav">
          <Link
            to="/dashboard"
            className={`sidebar-link ${
              activeItem === "dashboard" ? "active" : ""
            }`}
          >
            <FaHome className="icon" />
            {!isMinimized && <span>Dashboard</span>}
          </Link>
          <Link
            to="/campaigns"
            className={`sidebar-link ${
              activeItem === "campaigns" ? "active" : ""
            }`}
          >
            <FaEnvelope className="icon" />
            {!isMinimized && <span>Campaigns</span>}
          </Link>
          <Link
            to="/designs"
            className={`sidebar-link ${
              activeItem === "designs" ? "active" : ""
            }`}
          >
            <FaTasks className="icon" />
            {!isMinimized && <span>Designs</span>}
          </Link>
          <Link
            to="/analytics"
            className={`sidebar-link ${
              activeItem === "analytics" ? "active" : ""
            }`}
          >
            <FaChartBar className="icon" />
            {!isMinimized && <span>Analytics</span>}
          </Link>
          <Link
            to="/orders"
            className={`sidebar-link ${
              activeItem === "orders" ? "active" : ""
            }`}
          >
            <FaBoxOpen className="icon" />
            {!isMinimized && <span>Orders</span>}
          </Link>
          <Link
            to="/payments"
            className={`sidebar-link ${
              activeItem === "payments" ? "active" : ""
            }`}
          >
            <FaMoneyBill className="icon" />
            {!isMinimized && <span>Payments</span>}
          </Link>
          <Link
            to="/profile"
            className={`sidebar-link ${
              activeItem === "profile" ? "active" : ""
            }`}
          >
            <FaUser className="icon" />
            {!isMinimized && <span>Profile</span>}
          </Link>
          <Link
            to="/settings"
            className={`sidebar-link ${
              activeItem === "settings" ? "active" : ""
            }`}
          >
            <FaCog className="icon" />
            {!isMinimized && <span>Settings</span>}
          </Link>
          <Link
            to="/help"
            className={`sidebar-link ${
              activeItem === "help" ? "active" : ""
            }`}
          >
            <FaQuestionCircle className="icon" />
            {!isMinimized && <span>Help</span>}
          </Link>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt className="icon" />
            {!isMinimized && <span>Logout</span>}
          </button>
          {!isMinimized && <p>Version 1.0.0</p>}
        </div>
      </aside>

      {showLogoutModal && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <p>Are you sure you want to logout?</p>
            <div className="logout-modal-actions">
              <button onClick={confirmLogout} className="logout-confirm">
                Yes
              </button>
              <button onClick={cancelLogout} className="logout-cancel">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
