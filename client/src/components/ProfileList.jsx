// frontend/src/components/ProfileList.js
import { useState, useEffect } from "react";
import axios from "axios";
import './ProfileList.scss';
import ProfileNav from "../ProfileNav";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/api/profiles" || "http://localhost:1525/api/profiles");
        setProfiles(response.data);
        setError("");
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch profiles. Please check the connection or try again later.");
      }
    };
    fetchProfiles();
  }, []);

  return (
    
    <div className="profile-list-container">
      <ProfileNav/>
      <h2>User Profiles</h2>

      {error && <p className="error-message">{error}</p>}

      {profiles.length === 0 && !error && <p>Loading profiles...</p>}
      {profiles.map((profile, index) => (
        <div key={profile._id} className="profile-card">
          {/* Add serial number */}
          <div className="serial-number">#{index + 1}</div>

          {/* Personal Information Section */}
          <div className="profile-section">
            <h3>Personal Information : {profile.personal.name}</h3>
            <div className="details-wrapper">
              {profile.personal.imageUrl && (
                <img
                  src={profile.personal.imageUrl}
                  alt={`${profile.personal.name || 'Personal'}'s photo`}
                />
              )}
              <div className="info">
                <p><strong>Name:</strong> {profile.personal.name || 'N/A'}</p>
                <p><strong>Father:</strong> {profile.personal.father || 'N/A'}</p>
                <p><strong>Mother:</strong> {profile.personal.mother || 'N/A'}</p>
                <p><strong>Address:</strong> {profile.personal.address || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileList;