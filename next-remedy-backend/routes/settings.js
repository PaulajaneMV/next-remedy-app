const express = require("express");
const router = express.Router();

// Mock data for user settings (to be replaced with a database)
let userSettings = {
  email: "user@example.com",
  password: "",
  theme: "Light",
  language: "English",
  notifications: {
    email: true,
    sms: false,
    push: true,
  },
  security: {
    twoFactorAuth: "Disabled",
  },
};

// Fetch current settings
router.get("/", (req, res) => {
  res.json(userSettings);
});

// Update account settings
router.post("/account", (req, res) => {
  const { email, password } = req.body;
  userSettings.email = email;
  if (password) {
    userSettings.password = password; // In a real app, hash the password before saving
  }
  res.json({ message: "Account settings updated successfully!" });
});

// Update application settings
router.post("/application", (req, res) => {
  const { theme, language } = req.body;
  userSettings.theme = theme;
  userSettings.language = language;
  res.json({ message: "Application settings updated successfully!" });
});

// Update notification settings
router.post("/notifications", (req, res) => {
  const { email, sms, push } = req.body;
  userSettings.notifications = { email, sms, push };
  res.json({ message: "Notification settings updated successfully!" });
});

// Update security settings
router.post("/security", (req, res) => {
  const { twoFactorAuth } = req.body;
  userSettings.security.twoFactorAuth = twoFactorAuth;
  res.json({ message: "Security settings updated successfully!" });
});

module.exports = router;
