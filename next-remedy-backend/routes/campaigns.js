const express = require("express");
const router = express.Router();

// Mock data for campaigns
const campaigns = [
  {
    id: 1,
    title: "Campaign 1",
    status: "Active",
    startDate: "Jan 1, 2024",
    endDate: "Jan 31, 2024",
    earnings: 2500,
    progress: 75,
  },
  {
    id: 2,
    title: "Campaign 2",
    status: "Active",
    startDate: "Feb 1, 2024",
    endDate: "Feb 28, 2024",
    earnings: 3000,
    progress: 50,
  },
];

// Endpoint for active campaigns
router.get("/active", (req, res) => {
  console.log("Active campaigns endpoint accessed");
  res.json(campaigns);
});

// Endpoint for creating a new campaign
router.post("/create", (req, res) => {
  const { title, status, startDate, endDate, earnings } = req.body;
  const newCampaign = {
    id: campaigns.length + 1,
    title,
    status,
    startDate,
    endDate,
    earnings,
    progress: 0, // Default progress
  };
  campaigns.push(newCampaign);
  res.status(201).json({ message: "Campaign created successfully", campaign: newCampaign });
});

// Endpoint for updating a campaign
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, status, startDate, endDate, earnings, progress } = req.body;

  const campaignIndex = campaigns.findIndex((campaign) => campaign.id === parseInt(id));
  if (campaignIndex === -1) {
    return res.status(404).json({ message: "Campaign not found" });
  }

  campaigns[campaignIndex] = {
    ...campaigns[campaignIndex],
    title,
    status,
    startDate,
    endDate,
    earnings,
    progress,
  };

  res.json({ message: "Campaign updated successfully", campaign: campaigns[campaignIndex] });
});

// Endpoint for deleting a campaign
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const campaignIndex = campaigns.findIndex((campaign) => campaign.id === parseInt(id));
  if (campaignIndex === -1) {
    return res.status(404).json({ message: "Campaign not found" });
  }

  campaigns.splice(campaignIndex, 1);
  res.json({ message: "Campaign deleted successfully" });
});

module.exports = router;
