import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/Settings.css";

const Settings = ({ isSidebarMinimized, setIsSidebarMinimized }) => {
  const [activeTab, setActiveTab] = useState("account");
  const [settings, setSettings] = useState({
    email: "",
    password: "",
    theme: "Light",
    language: "English",
    notifications: {
      email: false,
      sms: false,
      push: false,
    },
    security: {
      twoFactorAuth: "Disabled",
    },
  });

  // Fetch settings from the backend on load
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/settings");
        setSettings(response.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
  }, []);

  // Handle form submissions for different tabs
  const handleSaveChanges = async (tab, data) => {
    try {
      const endpointMap = {
        account: "http://localhost:5000/api/settings/account",
        application: "http://localhost:5000/api/settings/application",
        notifications: "http://localhost:5000/api/settings/notifications",
        security: "http://localhost:5000/api/settings/security",
      };

      const response = await axios.post(endpointMap[tab], data);
      alert(response.data.message);
    } catch (error) {
      console.error(`Error saving ${tab} settings:`, error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="tab-content">
            <h2>Account Settings</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges("account", {
                  email: settings.email,
                  password: settings.password,
                });
              }}
            >
              <label>Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({ ...settings, email: e.target.value })
                }
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                onChange={(e) =>
                  setSettings({ ...settings, password: e.target.value })
                }
              />
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>
        );
      case "application":
        return (
          <div className="tab-content">
            <h2>Application Settings</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges("application", {
                  theme: settings.theme,
                  language: settings.language,
                });
              }}
            >
              <label>Theme</label>
              <select
                value={settings.theme}
                onChange={(e) =>
                  setSettings({ ...settings, theme: e.target.value })
                }
              >
                <option>Light</option>
                <option>Dark</option>
              </select>
              <label>Language</label>
              <select
                value={settings.language}
                onChange={(e) =>
                  setSettings({ ...settings, language: e.target.value })
                }
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>
        );
      case "notifications":
        return (
          <div className="tab-content">
            <h2>Notification Settings</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges("notifications", settings.notifications);
              }}
            >
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: e.target.checked,
                      },
                    })
                  }
                />
                Email Notifications
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.sms}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        sms: e.target.checked,
                      },
                    })
                  }
                />
                SMS Notifications
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        push: e.target.checked,
                      },
                    })
                  }
                />
                Push Notifications
              </label>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>
        );
      case "security":
        return (
          <div className="tab-content">
            <h2>Security Settings</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges("security", {
                  twoFactorAuth: settings.security.twoFactorAuth,
                });
              }}
            >
              <label>Two-Factor Authentication</label>
              <select
                value={settings.security.twoFactorAuth}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    security: { twoFactorAuth: e.target.value },
                  })
                }
              >
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`page-layout ${isSidebarMinimized ? "minimized" : ""}`}>
      <Sidebar
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
      />
      <header className="settings-header">
        <h1>Settings</h1>
        <div className="user-profile">
          <span>Welcome, [User Name]</span>
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="user-avatar"
          />
        </div>
      </header>
      <main className="settings-content">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "account" ? "active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            Account Settings
          </button>
          <button
            className={`tab ${activeTab === "application" ? "active" : ""}`}
            onClick={() => setActiveTab("application")}
          >
            Application Settings
          </button>
          <button
            className={`tab ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button
            className={`tab ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>
        {renderContent()}
      </main>
      <footer className="settings-footer">
        <p>&copy; 2024 Next Remedy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Settings;
