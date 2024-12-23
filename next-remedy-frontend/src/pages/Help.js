import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Help.css";

const Help = ({ isSidebarMinimized, setIsSidebarMinimized }) => {
  const [faq, setFaq] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  // Fetch FAQs from the backend
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/help/faq");
        const data = await response.json();
        setFaq(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFAQs();
  }, []);

  // Add a new FAQ
  const handleAddFaq = async () => {
    if (!newQuestion) {
      alert("Please enter a question.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/help/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: newQuestion }),
      });

      if (response.ok) {
        const addedFaq = await response.json();
        setFaq([...faq, addedFaq]); // Update the state with the new FAQ
        setNewQuestion(""); // Clear the input field
      } else {
        alert("Error adding FAQ.");
      }
    } catch (error) {
      console.error("Error adding FAQ:", error);
      alert("Error adding FAQ.");
    }
  };

  // Delete an FAQ
  const handleDeleteFaq = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/help/faq/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFaq(faq.filter((item) => item.id !== id)); // Remove the deleted FAQ from the state
      } else {
        alert("Error deleting FAQ.");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      alert("Error deleting FAQ.");
    }
  };

  return (
    <div className={`page-layout ${isSidebarMinimized ? "minimized" : ""}`}>
      <Sidebar
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
      />
      <header className={`page-header ${isSidebarMinimized ? "minimized" : ""}`}>
        <h1>Help Center</h1>
        <div className="user-profile">
          <span>Welcome, [User Name]</span>
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="user-avatar"
          />
        </div>
      </header>
      <main className="help-content">
        <section className="help-categories">
          <h2>Help Categories</h2>
          <div className="categories-grid">
            <div className="category-card">
              <h3>Getting Started</h3>
              <p>Learn the basics of using Next Remedy.</p>
            </div>
            <div className="category-card">
              <h3>Campaign Management</h3>
              <p>Guides for managing your campaigns effectively.</p>
            </div>
            <div className="category-card">
              <h3>Designs Management</h3>
              <p>Tips for uploading and managing designs.</p>
            </div>
            <div className="category-card">
              <h3>Payments & Orders</h3>
              <p>Help regarding payments and order tracking.</p>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <ul className="faq-list">
            {faq.map((item) => (
              <li key={item.id}>
                {item.question}
                <button
                  className="delete-faq-btn"
                  onClick={() => handleDeleteFaq(item.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Enter a new FAQ"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button className="add-faq-btn" onClick={handleAddFaq}>
            Add FAQ
          </button>
        </section>

        <section className="contact-support">
          <h2>Contact Support</h2>
          <button className="support-btn">Email Support</button>
          <button className="support-btn">Live Chat</button>
          <button className="support-btn">Documentation</button>
        </section>

        <section className="feedback-section">
          <h2>Submit Feedback</h2>
          <textarea placeholder="Type your feedback or issue here..." />
          <button className="feedback-btn">Submit</button>
        </section>
      </main>
      <footer className={`page-footer ${isSidebarMinimized ? "minimized" : ""}`}>
        <p>&copy; 2024 Next Remedy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Help;
