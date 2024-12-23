const express = require("express");
const router = express.Router();

// Mock user data (replace this with database logic later)
let userProfile = {
  fullName: "John Doe",
  email: "user@example.com",
  profilePicture: "https://via.placeholder.com/150",
  companyName: "Next Remedy",
  businessAddress: "123 Main Street",
};

// Fetch profile details
router.get("/", (req, res) => {
  res.json(userProfile);
});

// Update profile details
router.post("/update", (req, res) => {
  const { fullName, email, companyName, businessAddress } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ message: "Full Name and Email are required" });
  }

  // Update profile data
  userProfile = {
    ...userProfile,
    fullName,
    email,
    companyName: companyName || userProfile.companyName,
    businessAddress: businessAddress || userProfile.businessAddress,
  };

  res.json({ message: "Profile updated successfully", userProfile });
});

// Upload profile picture
router.post("/upload-picture", (req, res) => {
  const { profilePicture } = req.body;

  if (!profilePicture) {
    return res.status(400).json({ message: "Profile picture is required" });
  }

  // Update the profile picture
  userProfile.profilePicture = profilePicture;

  res.json({ message: "Profile picture updated successfully", userProfile });
});

module.exports = router;
