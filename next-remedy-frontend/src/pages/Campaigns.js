import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Campaigns.css";
import axios from "axios";

const Campaigns = ({ isSidebarMinimized, setIsSidebarMinimized }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    startDate: "",
    endDate: "",
    targetAmount: "",
  });

  const webhookUrl = "https://hook.eu2.make.com/fowom76tfv9v8m57lbewihd5zlyipawj";

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/campaigns/active");
        setCampaigns(response.data);
      } catch (err) {
        setError("Failed to load campaigns.");
      }
    };

    fetchCampaigns();
  }, []);

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      // Send the new campaign data to Make.com
      const response = await axios.post(webhookUrl, newCampaign);
      alert("Campaign created successfully!");
      setShowModal(false);

      // Optionally, refresh the campaigns list
      const updatedCampaigns = await axios.get("http://localhost:5000/api/campaigns/active");
      setCampaigns(updatedCampaigns.data);
    } catch (error) {
      alert("Failed to create campaign.");
    }
  };

  return (
    <div className={`page-layout ${isSidebarMinimized ? "minimized" : ""}`}>
      <Sidebar
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
      />
      <header className="campaigns-header">
        <h1>Campaign Management</h1>
        <button className="create-campaign-btn" onClick={() => setShowModal(true)}>
          + Create New Campaign
        </button>
      </header>
      <main className="campaigns-content">
        {/* Active Campaigns Section */}
        <section className="active-campaigns">
          <h2>Active Campaigns</h2>
          {error ? (
            <p>{error}</p>
          ) : (
            <div className="campaign-grid">
              {campaigns.map((campaign) => (
                <div className="campaign-card" key={campaign.id}>
                  <h3>{campaign.title}</h3>
                  <p>Status: {campaign.status}</p>
                  <p>Start Date: {campaign.startDate}</p>
                  <p>End Date: {campaign.endDate}</p>
                  <p>Earnings: ${campaign.earnings}</p>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${campaign.progress}%` }}
                    ></div>
                  </div>
                  <div className="campaign-actions">
                    <button>View</button>
                    <button>Edit</button>
                    <button>Pause</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Modal */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setShowModal(false)}>
                &times;
              </button>
              <h2>Create New Campaign</h2>
              <form onSubmit={handleCreateCampaign}>
                <input
                  type="text"
                  placeholder="Campaign Title"
                  value={newCampaign.title}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, title: e.target.value })
                  }
                  required
                />
                <input
                  type="date"
                  placeholder="Start Date"
                  value={newCampaign.startDate}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, startDate: e.target.value })
                  }
                  required
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={newCampaign.endDate}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, endDate: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Target Amount"
                  value={newCampaign.targetAmount}
                  onChange={(e) =>
                    setNewCampaign({ ...newCampaign, targetAmount: e.target.value })
                  }
                  required
                />
                <button type="submit">Create Campaign</button>
              </form>
            </div>
          </div>
        )}
      </main>
      <footer className="campaigns-footer">
        <p>&copy; 2024 Next Remedy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Campaigns;
