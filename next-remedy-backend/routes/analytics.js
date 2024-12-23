const express = require("express");
const router = express.Router();

// Mock data
const performanceOverview = {
  totalSales: 12500,
  ordersProcessed: 320,
  activeCampaigns: 5,
};

const salesTrends = {
  monthlySales: [
    { month: "January", sales: 2000 },
    { month: "February", sales: 3000 },
    { month: "March", sales: 2500 },
    { month: "April", sales: 3000 },
    { month: "May", sales: 2000 },
  ],
  topCampaigns: [
    { name: "Campaign A", sales: 5000 },
    { name: "Campaign B", sales: 4000 },
    { name: "Campaign C", sales: 3000 },
  ],
};

const recentReports = [
  { id: 1, title: "Weekly Sales Report", date: "2024-12-01" },
  { id: 2, title: "Monthly Sales Report", date: "2024-12-01" },
];

const topCampaigns = [
  { id: 1, name: "Campaign A", earnings: 5000 },
  { id: 2, name: "Campaign B", earnings: 4000 },
  { id: 3, name: "Campaign C", earnings: 3000 },
];

// Routes
router.get("/overview", (req, res) => {
  res.status(200).json(performanceOverview);
});

router.get("/sales-trends", (req, res) => {
  res.status(200).json(salesTrends);
});

router.get("/reports", (req, res) => {
  res.status(200).json(recentReports);
});

router.get("/top-campaigns", (req, res) => {
  res.status(200).json(topCampaigns);
});

// Export analytics data as JSON file
router.get("/export", (req, res) => {
  const data = JSON.stringify({ performanceOverview, salesTrends });
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", "attachment; filename=analytics.json");
  res.status(200).send(data);
});

module.exports = router;
