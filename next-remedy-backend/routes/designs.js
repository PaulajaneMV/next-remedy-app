const express = require("express");
const router = express.Router();

// Mock data for designs
let designs = [
  {
    id: 1,
    name: "Tour Tee 2024",
    description: "Limited edition tour design.",
    associatedCampaigns: 3,
    uploadDate: "2024-12-01",
  },
  {
    id: 2,
    name: "Summer Merch",
    description: "Perfect for summer tours.",
    associatedCampaigns: 2,
    uploadDate: "2024-12-10",
  },
];

// Get all designs
router.get("/", (req, res) => {
  res.json(designs);
});

// Add a new design
router.post("/", (req, res) => {
  const newDesign = {
    id: designs.length + 1,
    ...req.body,
    uploadDate: new Date().toISOString().split("T")[0],
  };
  designs.push(newDesign);
  res.status(201).json({ message: "Design added successfully", design: newDesign });
});

// Update an existing design
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = designs.findIndex((design) => design.id === parseInt(id));
  if (index !== -1) {
    designs[index] = { ...designs[index], ...req.body };
    res.json({ message: "Design updated successfully", design: designs[index] });
  } else {
    res.status(404).json({ message: "Design not found" });
  }
});

// Delete a design
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = designs.findIndex((design) => design.id === parseInt(id));
  if (index !== -1) {
    designs.splice(index, 1);
    res.json({ message: "Design deleted successfully" });
  } else {
    res.status(404).json({ message: "Design not found" });
  }
});

module.exports = router;
