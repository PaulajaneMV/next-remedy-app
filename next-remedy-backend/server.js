const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");
const campaignsRoutes = require("./routes/campaigns");
const designsRoutes = require("./routes/designs");
const analyticsRoutes = require("./routes/analytics");
const ordersRoutes = require("./routes/orders");
const paymentsRoutes = require("./routes/payments");
const profileRoutes = require("./routes/profile");
const settingsRoutes = require("./routes/settings");
const helpRoutes = require("./routes/help"); // Import Help route

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/campaigns", campaignsRoutes);
app.use("/api/designs", designsRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/help", helpRoutes); // Register Help route

// Default route for root (optional)
app.get("/", (req, res) => {
  res.send("Backend is running. Use API endpoints like /api/help/faqs");
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
