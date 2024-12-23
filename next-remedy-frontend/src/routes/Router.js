import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Dashboard from "../pages/Dashboard";
import Campaigns from "../pages/Campaigns";
import Designs from "../pages/Designs";
import Analytics from "../pages/Analytics";
import Orders from "../pages/Orders";
import Payments from "../pages/Payments";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Help from "../pages/Help";

const AppRouter = ({ isSidebarMinimized, setIsSidebarMinimized }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              isSidebarMinimized={isSidebarMinimized}
              setIsSidebarMinimized={setIsSidebarMinimized}
            />
          }
        />
        <Route
          path="/campaigns"
          element={
            <Campaigns
              isSidebarMinimized={isSidebarMinimized}
              setIsSidebarMinimized={setIsSidebarMinimized}
            />
          }
        />
        <Route
          path="/designs"
          element={
            <Designs
              isSidebarMinimized={isSidebarMinimized}
              setIsSidebarMinimized={setIsSidebarMinimized}
            />
          }
        />
        <Route
          path="/analytics"
          element={
            <Analytics
              isSidebarMinimized={isSidebarMinimized}
              setIsSidebarMinimized={setIsSidebarMinimized}
            />
          }
        />
        <Route
          path="/orders"
          element={
            <Orders
              isSidebarMinimized={isSidebarMinimized}
              setIsSidebarMinimized={setIsSidebarMinimized}
            />
          }
        />
        <Route
          path="/payments"
          element={
            <Payments
              isSidebarMinimized={isSidebarMinimized}
              setIsSidebarMinimized={setIsSidebarMinimized}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              isSidebarMinimized={isSidebarMinimized}
              setIsSidebarMinimized={setIsSidebarMinimized}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings
              isSidebarMinimized={isSidebarMinimized}
              setIsSidebarMinimized={setIsSidebarMinimized}
            />
          }
        />
        <Route
          path="/help"
          element={
            <Help
              isSidebarMinimized={isSidebarMinimized}
              setIsSidebarMinimized={setIsSidebarMinimized}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
