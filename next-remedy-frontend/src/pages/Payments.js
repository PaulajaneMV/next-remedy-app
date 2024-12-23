import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "../styles/Payments.css";

const Payments = ({ isSidebarMinimized, setIsSidebarMinimized }) => {
  const [paymentsOverview, setPaymentsOverview] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  // Fetch data on component mount
  useEffect(() => {
    const fetchPaymentsData = async () => {
      try {
        const overviewResponse = await axios.get("http://localhost:5000/api/payments/overview");
        const transactionsResponse = await axios.get("http://localhost:5000/api/payments/transactions");
        setPaymentsOverview(overviewResponse.data);
        setTransactions(transactionsResponse.data);
      } catch (err) {
        setError("Failed to load payment data.");
      }
    };

    fetchPaymentsData();
  }, []);

  // Request Payout Action
  const handleRequestPayout = async () => {
    try {
      const amount = 500; // Replace with dynamic value if needed
      const response = await axios.post("http://localhost:5000/api/payments/request-payout", { amount });
      alert(response.data.message);
    } catch (err) {
      alert("Failed to request payout.");
    }
  };

  // Download Payment History
  const handleDownloadHistory = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/payments/download-history", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "payment-history.json");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      alert("Failed to download payment history.");
    }
  };

  return (
    <div className={`page-layout ${isSidebarMinimized ? "minimized" : ""}`}>
      <Sidebar
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
      />
      <header className="payments-header">
        <h1>Payments</h1>
        <div className="user-profile">
          <span>Welcome, [User Name]</span>
          <img
            src="https://via.placeholder.com/40" // Replace with actual user avatar
            alt="User Avatar"
            className="user-avatar"
          />
        </div>
      </header>
      <main className="payments-content">
        {/* Overview Section */}
        <section className="payments-overview">
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              <div className="overview-card">
                <h3>Total Revenue</h3>
                <p>${paymentsOverview.totalRevenue || "0"}</p>
              </div>
              <div className="overview-card">
                <h3>Pending Payouts</h3>
                <p>${paymentsOverview.pendingPayouts || "0"}</p>
              </div>
              <div className="overview-card">
                <h3>Completed Payouts</h3>
                <p>${paymentsOverview.completedPayouts || "0"}</p>
              </div>
            </>
          )}
        </section>

        {/* Transactions Table */}
        <section className="transactions-section">
          <h2>Transactions</h2>
          {error ? (
            <p>{error}</p>
          ) : (
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Campaign</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.date}</td>
                    <td>{transaction.campaign}</td>
                    <td>${transaction.amount.toFixed(2)}</td>
                    <td className={`status ${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button className="action-btn" onClick={handleRequestPayout}>
              Request Payout
            </button>
            <button className="action-btn" onClick={handleDownloadHistory}>
              Download History
            </button>
            <button className="action-btn">View Policies</button>
          </div>
        </section>
      </main>
      <footer className="payments-footer">
        <p>&copy; 2024 Next Remedy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Payments;
