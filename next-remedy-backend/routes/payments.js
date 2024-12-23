const express = require("express");
const router = express.Router();

// Mock data for payments overview
const paymentsOverview = {
  totalRevenue: 12500,
  pendingPayouts: 3200,
  completedPayouts: 9300,
};

// Mock data for transactions
const transactions = [
  { date: "2024-12-10", campaign: "Campaign A", amount: 200, status: "Completed" },
  { date: "2024-12-09", campaign: "Campaign B", amount: 150, status: "Pending" },
  { date: "2024-12-08", campaign: "Campaign C", amount: 120, status: "Failed" },
];

// Endpoint for payments overview
router.get("/overview", (req, res) => {
  res.json(paymentsOverview);
});

// Endpoint for transaction list
router.get("/transactions", (req, res) => {
  res.json(transactions);
});

// Endpoint for requesting a payout
router.post("/request-payout", (req, res) => {
  const { amount } = req.body;

  // Validate amount
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid payout amount" });
  }

  // Simulate payout request processing
  return res.status(200).json({ message: `Payout request for $${amount} received and is being processed.` });
});

// Endpoint to download payment history
router.get("/download-history", (req, res) => {
  const data = JSON.stringify(transactions);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", "attachment; filename=payment-history.json");
  res.send(data);
});

module.exports = router;
