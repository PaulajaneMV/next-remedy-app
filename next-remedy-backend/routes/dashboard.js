const express = require("express");
const router = express.Router();

// Mock Data for the Dashboard
const dashboardData = {
  activeCampaigns: 5,
  totalEarnings: 3200,
  pendingOrders: 10,
  recentActivities: [
    "Campaign 'New Album Launch' started yesterday.",
    "Earned $500 from 'Summer Merch' campaign.",
    "Uploaded 'Tour Tee 2024' design."
  ],
};

// API Endpoint for Dashboard Summary
router.get("/summary", (req, res) => {
  res.json(dashboardData);
});

module.exports = router;
