import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Dashboard.css";

const Dashboard = ({ isSidebarMinimized, setIsSidebarMinimized }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch data from the backend API
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard/summary");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return <div className="dashboard-error">Failed to load dashboard data: {error}</div>;
  }

  if (!dashboardData) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  return (
    <div className={`dashboard-layout ${isSidebarMinimized ? "minimized" : ""}`}>
      <Sidebar
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
      />
      <header className="dashboard-header">
        <h1>Next Remedy</h1>
        <div className="user-profile">
          <span>Welcome, [User Name]</span>
          <img
            src="https://via.placeholder.com/40" // Replace with actual user avatar
            alt="User Avatar"
            className="user-avatar"
          />
        </div>
      </header>
      <main className="dashboard-content">
        <section className="welcome-section">
          <h2>Welcome, [User Name]!</h2>
          <p>Here’s an overview of your activity and performance.</p>
        </section>

        <section className="stats-overview">
          <div className="stat-card">
            <h3>Active Campaigns</h3>
            <p>{dashboardData.activeCampaigns}</p>
          </div>
          <div className="stat-card">
            <h3>Total Earnings</h3>
            <p>${dashboardData.totalEarnings}</p>
          </div>
          <div className="stat-card">
            <h3>Orders</h3>
            <p>{dashboardData.pendingOrders}</p>
          </div>
        </section>

        <section className="recent-activities">
          <h2>Recent Activities</h2>
          <ul>
            {dashboardData.recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </section>

        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn">Start New Campaign</button>
            <button className="action-btn">Upload Design</button>
            <button className="action-btn">View Payments</button>
          </div>
        </section>
      </main>
      <footer className="dashboard-footer">
        <p>&copy; 2024 Next Remedy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
