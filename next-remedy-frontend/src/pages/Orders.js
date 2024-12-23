import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Orders.css";
import axios from "axios";

const Orders = ({ isSidebarMinimized, setIsSidebarMinimized }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  // Fetch orders data from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (err) {
        setError("Failed to load orders.");
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status });
      const updatedOrders = await axios.get("http://localhost:5000/api/orders");
      setOrders(updatedOrders.data);
      alert(`Order #${id} status updated to ${status}`);
    } catch (err) {
      alert("Failed to update order status.");
    }
  };

  // Delete order
  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      const updatedOrders = await axios.get("http://localhost:5000/api/orders");
      setOrders(updatedOrders.data);
      alert(`Order #${id} deleted successfully.`);
    } catch (err) {
      alert("Failed to delete order.");
    }
  };

  return (
    <div className={`page-layout ${isSidebarMinimized ? "minimized" : ""}`}>
      <Sidebar
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
      />
      <header className="orders-header">
        <h1>Orders Management</h1>
        <div className="user-profile">
          <span>Welcome, [User Name]</span>
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="user-avatar"
          />
        </div>
      </header>
      <main className="orders-content">
        <section className="overview-section">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Orders</h3>
            <p>{orders.filter((order) => order.status === "Pending").length}</p>
          </div>
          <div className="stat-card">
            <h3>Completed Orders</h3>
            <p>{orders.filter((order) => order.status === "Completed").length}</p>
          </div>
          <div className="stat-card">
            <h3>Cancelled Orders</h3>
            <p>{orders.filter((order) => order.status === "Cancelled").length}</p>
          </div>
        </section>
        <section className="orders-list">
          <h2>Order List</h2>
          {error ? (
            <p>{error}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.orderId}</td>
                    <td>{order.customerName}</td>
                    <td>{order.date}</td>
                    <td>{order.status}</td>
                    <td>${order.amount}</td>
                    <td>
                      <button onClick={() => handleUpdateStatus(order.id, "Completed")}>
                        Complete
                      </button>
                      <button onClick={() => handleUpdateStatus(order.id, "Cancelled")}>
                        Cancel
                      </button>
                      <button onClick={() => handleDeleteOrder(order.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
        <section className="order-trends">
          <h2>Order Trends</h2>
          <div className="chart-placeholder">[Insert Chart Here]</div>
        </section>
      </main>
      <footer className="orders-footer">
        <p>&copy; 2024 Next Remedy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Orders;
