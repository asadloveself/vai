// frontend/src/components/ProfileList.js
import { useState, useEffect } from "react";
import axios from "axios";
import './ProfileList.scss'; // Import the SCSS file

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("/api/profiles" || "http://localhost:1525/api/profiles");
        setProfiles(response.data);
        setError(""); // Clear previous errors on success
      } catch (err) {
        console.error("Fetch error:", err); // Log the actual error
        setError("Failed to fetch profiles. Please check the connection or try again later."); // More informative error
      }
    };
    fetchProfiles();
  }, []);

  return (
    // Use the main container class
    <div className="profile-list-container">
      <h2>User Profiles</h2>

      {/* Use the error message class */}
      {error && <p className="error-message">{error}</p>}

      {/* Remove the inline style from the mapping div, apply card class */}
      {profiles.length === 0 && !error && <p>Loading profiles...</p>}
      {profiles.map((profile) => (
        // Use the profile card class
        <div key={profile._id} className="profile-card">

          {/* Personal Information Section */}
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="details-wrapper">
              {profile.personal.imageUrl && (
                <img
                  src={profile.personal.imageUrl}
                  alt={`${profile.personal.name || 'Personal'}'s photo`}
                  // Inline style removed, handled by SCSS
                />
              )}
              <div className="info">
                <p><strong>Name:</strong> {profile.personal.name || 'N/A'}</p>
                <p><strong>NID:</strong> {profile.personal.nid || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Nominee Information Section */}
          <div className="profile-section">
            <h3>Nominee Information</h3>
            <div className="details-wrapper">
              {profile.nominee.imageUrl && (
                <img
                  src={profile.nominee.imageUrl}
                  alt={`${profile.nominee.name || 'Nominee'}'s photo`}
                  // Inline style removed, handled by SCSS
                />
              )}
               <div className="info">
                 <p><strong>Name:</strong> {profile.nominee.name || 'N/A'}</p>
                 <p><strong>NID:</strong> {profile.nominee.nid || 'N/A'}</p>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ProfileList;
