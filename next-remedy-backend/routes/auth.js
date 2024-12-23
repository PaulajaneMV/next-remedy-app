const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

let users = []; // Temporary in-memory user storage

// Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found." });

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials." });

  const token = jwt.sign({ email: user.email }, "your_jwt_secret", { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// Signup Route
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ name, email, password: hashedPassword });
  res.status(201).json({ message: "User registered successfully" });
});

module.exports = router;
