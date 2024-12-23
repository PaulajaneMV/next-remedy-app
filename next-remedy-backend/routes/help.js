const express = require("express");
const router = express.Router();

let faq = [
  { id: 1, question: "How do I start a new campaign?" },
  { id: 2, question: "How can I upload my designs?" },
  { id: 3, question: "How do I track my sales and orders?" },
  { id: 4, question: "What should I do if my payment is delayed?" },
];

// Fetch all FAQs
router.get("/faq", (req, res) => {
  res.json(faq);
});

// Add a new FAQ
router.post("/faq", (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }
  const newFaq = { id: faq.length + 1, question };
  faq.push(newFaq);
  res.json(newFaq);
});

// Delete an FAQ by ID
router.delete("/faq/:id", (req, res) => {
  const { id } = req.params;
  const index = faq.findIndex((item) => item.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "FAQ not found" });
  }
  faq.splice(index, 1);
  res.json({ message: "FAQ deleted successfully" });
});

module.exports = router;
