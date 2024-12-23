import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Profile.css";
import axios from "axios";

const Profile = ({ isSidebarMinimized, setIsSidebarMinimized }) => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    profilePicture: "",
    companyName: "",
    businessAddress: "",
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  // Fetch profile details on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile");
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // Handle form submission for updating profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/profile/update", {
        fullName: profile.fullName,
        email: profile.email,
        companyName: profile.companyName,
        businessAddress: profile.businessAddress,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Handle profile picture upload
  const handleUploadPicture = async () => {
    if (!newProfilePicture) {
      alert("Please select a picture to upload.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/profile/upload-picture", {
        profilePicture: newProfilePicture,
      });
      setProfile({ ...profile, profilePicture: newProfilePicture });
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      alert("Failed to upload profile picture. Please try again.");
    }
  };

  return (
    <div className={`page-layout ${isSidebarMinimized ? "minimized" : ""}`}>
      <Sidebar
        isMinimized={isSidebarMinimized}
        setIsMinimized={setIsSidebarMinimized}
      />
      <header className="page-header">
        <h1>Profile Management</h1>
        <div className="user-profile">
          <span>Welcome, {profile.fullName || "[User Name]"}</span>
          <img
            src={profile.profilePicture || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="user-avatar"
          />
        </div>
      </header>
      <main className="profile-content">
        <section className="profile-info">
          <h2>Personal Information</h2>
          <form className="profile-form" onSubmit={handleUpdateProfile}>
            <label>
              Full Name:
              <input
                type="text"
                value={profile.fullName}
                onChange={(e) =>
                  setProfile({ ...profile, fullName: e.target.value })
                }
              />
            </label>
            <label>
              Email Address:
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </label>
            <label>
              Profile Picture:
              <input
                type="file"
                onChange={(e) =>
                  setNewProfilePicture(URL.createObjectURL(e.target.files[0]))
                }
              />
            </label>
            <button type="button" onClick={handleUploadPicture}>
              Upload Picture
            </button>
            <button type="submit">Save Changes</button>
          </form>
        </section>

        <section className="business-details">
          <h2>Business Details</h2>
          <form className="business-form">
            <label>
              Company Name:
              <input
                type="text"
                value={profile.companyName}
                onChange={(e) =>
                  setProfile({ ...profile, companyName: e.target.value })
                }
              />
            </label>
            <label>
              Business Address:
              <input
                type="text"
                value={profile.businessAddress}
                onChange={(e) =>
                  setProfile({ ...profile, businessAddress: e.target.value })
                }
              />
            </label>
          </form>
        </section>

        <section className="account-settings">
          <h2>Account Settings</h2>
          <button>Change Password</button>
          <button>Notification Preferences</button>
        </section>

        <section className="danger-zone">
          <h2>Danger Zone</h2>
          <button className="delete-account">Delete Account</button>
        </section>
      </main>
      <footer className="page-footer">
        <p>&copy; 2024 Next Remedy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Profile; 
