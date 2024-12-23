import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Designs.css";

const Designs = ({ isSidebarMinimized, setIsSidebarMinimized }) => {
  return (
    <div className={`page-layout ${isSidebarMinimized ? "minimized" : ""}`}>
      <Sidebar
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
      />
      <header className="designs-header">
        <h1>Designs Management</h1>
        <button className="upload-btn">Upload Design</button>
      </header>
      <main className="designs-content">
        {/* Designs Gallery */}
        <section className="designs-gallery">
          <h2>Designs Gallery</h2>
          <div className="gallery-grid">
            {/* Example design cards */}
            <div className="design-card">
              <img src="https://via.placeholder.com/150" alt="Design Thumbnail" />
              <div className="design-info">
                <h3>Design 1</h3>
                <p>Uploaded: 2024-12-01</p>
                <p>Associated Campaigns: 2</p>
                <div className="action-buttons">
                  <button className="view-btn">View</button>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            </div>
            {/* Add more design cards as needed */}
          </div>
        </section>

        {/* Upload New Design Section */}
        <section className="upload-section">
          <h2>Upload New Design</h2>
          <form className="upload-form">
            <label>
              Design Name:
              <input type="text" placeholder="Enter design name" />
            </label>
            <label>
              Description (optional):
              <textarea placeholder="Add a description"></textarea>
            </label>
            <label>
              Select Campaign:
              <select>
                <option value="campaign1">Campaign 1</option>
                <option value="campaign2">Campaign 2</option>
                <option value="campaign3">Campaign 3</option>
              </select>
            </label>
            <label className="file-upload">
              Upload File:
              <input type="file" />
            </label>
            <button type="submit" className="submit-btn">Upload</button>
          </form>
        </section>

        {/* Recent Uploads Section */}
        <section className="recent-uploads">
          <h2>Recent Uploads</h2>
          <ul>
            <li>Design "Tour Tee 2024" uploaded yesterday.</li>
            <li>Design "Summer Merch" uploaded 2 days ago.</li>
          </ul>
        </section>

        {/* Statistics Section */}
        <section className="design-stats">
          <h2>Design Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Designs</h3>
              <p>10</p>
            </div>
            <div className="stat-card">
              <h3>Top Used Design</h3>
              <p>Tour Tee 2024</p>
            </div>
            <div className="stat-card">
              <h3>Recently Used</h3>
              <p>Summer Merch</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="designs-footer">
        <p>&copy; 2024 Next Remedy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Designs;
 