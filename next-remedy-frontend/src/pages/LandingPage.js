import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../styles/LandingPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      alert(response.data.message);
      setShowLoginModal(false);
      navigate("/dashboard"); // Navigate to dashboard on successful login
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });
      alert(response.data.message);
      setShowSignUpModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="landing-page">
      <header className="main-header">
        <div className="logo">
          <h2>Next Remedy</h2>
        </div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <div className="hero-section">
        <h1>Welcome to Next Remedy</h1>
        <p>Automate your music merch campaigns effortlessly!</p>
        <div className="cta-buttons">
          <button className="btn-login" onClick={() => setShowLoginModal(true)}>
            Login
          </button>
          <button className="btn-signup" onClick={() => setShowSignUpModal(true)}>
            Sign Up
          </button>
        </div>
      </div>

      <section className="features" id="features">
        <div className="feature-card">
          <h3>Automated Workflows</h3>
          <p>Set up and automate your merch sales process.</p>
        </div>
        <div className="feature-card">
          <h3>Creative Tools</h3>
          <p>Easily upload and showcase your designs.</p>
        </div>
        <div className="feature-card">
          <h3>Integrated Analytics</h3>
          <p>Track and optimize your campaigns with ease.</p>
        </div>
      </section>

      <footer>
        <div className="social-icons">
          <a href="https://www.facebook.com" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://x.com/i/flow/login" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com/accounts/login/?hl=en" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/login" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </div>
        <p>© 2024 Next Remedy. All rights reserved.</p>
      </footer>

      {showLoginModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>
              &times;
            </button>
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}

      {showSignUpModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowSignUpModal(false)}>
              &times;
            </button>
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSignup}>
              <input type="text" name="name" placeholder="Full Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
