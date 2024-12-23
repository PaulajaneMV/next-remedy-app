const express = require("express");
const router = express.Router();

// Mock Data for Orders
let orders = [
  { id: 1, orderId: "#12345", customerName: "John Doe", date: "2024-12-10", status: "Pending", amount: 100 },
  { id: 2, orderId: "#12346", customerName: "Jane Smith", date: "2024-12-11", status: "Completed", amount: 200 },
  { id: 3, orderId: "#12347", customerName: "Bob Johnson", date: "2024-12-12", status: "Cancelled", amount: 50 },
];

// Get all orders
router.get("/", (req, res) => {
  res.json(orders);
});

// Get order by ID
router.get("/:id", (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

// Update order status
router.put("/:id", (req, res) => {
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: "Order not found" });

  const { status } = req.body;
  if (!["Pending", "Completed", "Cancelled"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  order.status = status;
  res.json({ message: "Order status updated", order });
});

// Delete an order
router.delete("/:id", (req, res) => {
  const orderIndex = orders.findIndex((o) => o.id === parseInt(req.params.id));
  if (orderIndex === -1) return res.status(404).json({ error: "Order not found" });

  orders.splice(orderIndex, 1);
  res.json({ message: "Order deleted successfully" });
});

// Export Orders as JSON (Optional)
router.get("/export", (req, res) => {
  const data = JSON.stringify(orders);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", "attachment; filename=orders.json");
  res.send(data);
});

module.exports = router;
