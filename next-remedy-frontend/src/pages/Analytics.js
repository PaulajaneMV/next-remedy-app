import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Analytics.css";
import axios from "axios";

const Analytics = ({ isSidebarMinimized, setIsSidebarMinimized }) => {
  // State to hold analytics data
  const [overview, setOverview] = useState({});
  const [salesTrends, setSalesTrends] = useState({});
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");

  // Fetch data from the backend
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const overviewResponse = await axios.get("http://localhost:5000/api/analytics/overview");
        const salesTrendsResponse = await axios.get("http://localhost:5000/api/analytics/sales-trends");
        const reportsResponse = await axios.get("http://localhost:5000/api/analytics/reports");

        setOverview(overviewResponse.data);
        setSalesTrends(salesTrendsResponse.data);
        setReports(reportsResponse.data);
      } catch (err) {
        console.error("Failed to fetch analytics data:", err);
        setError("Failed to load analytics data. Please try again later.");
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className={`page-layout ${isSidebarMinimized ? "minimized" : ""}`}>
      <Sidebar
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
      />
      <header className={`analytics-header ${isSidebarMinimized ? "minimized" : ""}`}>
        <h1>Analytics</h1>
        <div className="user-profile">
          <span>Welcome, [User Name]</span>
          <img
            src="https://via.placeholder.com/40" // Replace with actual user avatar
            alt="User Avatar"
            className="user-avatar"
          />
        </div>
      </header>
      <main className="analytics-content">
        {/* Performance Overview */}
        <section className="overview-section">
          <h2>Performance Overview</h2>
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Sales</h3>
                <p>${overview.totalSales || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Orders Processed</h3>
                <p>{overview.ordersProcessed || 0}</p>
              </div>
              <div className="stat-card">
                <h3>Active Campaigns</h3>
                <p>{overview.activeCampaigns || 0}</p>
              </div>
            </div>
          )}
        </section>

        {/* Sales Trends */}
        <section className="charts-section">
          <h2>Sales Trends</h2>
          {salesTrends.monthlySales && salesTrends.topCampaigns ? (
            <div className="charts">
              <div className="chart">
                <h3>Monthly Sales</h3>
                <ul>
                  {salesTrends.monthlySales.map((data, index) => (
                    <li key={index}>
                      {data.month}: ${data.sales}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chart">
                <h3>Top Campaigns</h3>
                <ul>
                  {salesTrends.topCampaigns.map((campaign, index) => (
                    <li key={index}>
                      {campaign.name}: ${campaign.sales}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p>Loading sales trends...</p>
          )}
        </section>

        {/* Recent Reports */}
        <section className="recent-reports">
          <h2>Recent Reports</h2>
          {reports.length > 0 ? (
            <ul>
              {reports.map((report) => (
                <li key={report.id}>
                  {report.title} - Generated on {report.date}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reports available.</p>
          )}
        </section>
      </main>
      <footer className={`analytics-footer ${isSidebarMinimized ? "minimized" : ""}`}>
        <p>&copy; 2024 Next Remedy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Analytics;
