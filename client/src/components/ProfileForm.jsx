// frontend/src/components/ProfileForm.js
import { useState } from "react";
import axios from "axios";
import './ProfileForm.scss'; // Import the SCSS file
import ProfileNav from "../ProfileNav";

const ProfileForm = () => {
  const [personal, setPersonal] = useState({
    name: "", father: "", mother: "", dob: "", nid: "", mobile: "", address: "", email: "",
  });
  const [nominee, setNominee] = useState({
    name: "", father: "", mother: "", dob: "", nid: "", mobile: "", address: "", email: "",
  });
  const [personalImage, setPersonalImage] = useState(null);
  const [nomineeImage, setNomineeImage] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  const handlePersonalChange = (e) => {
    setPersonal({ ...personal, [e.target.name]: e.target.value });
  };

  const handleNomineeChange = (e) => {
    setNominee({ ...nominee, [e.target.name]: e.target.value });
  };

  const handlePersonalImageChange = (e) => {
    setPersonalImage(e.target.files[0]);
  };

  const handleNomineeImageChange = (e) => {
    setNomineeImage(e.target.files[0]);
  };

  const resetForm = () => {
     setPersonal({ name: "", father: "", mother: "", dob: "", nid: "", mobile: "", address: "", email: "" });
     setNominee({ name: "", father: "", mother: "", dob: "", nid: "", mobile: "", address: "", email: "" });
     setPersonalImage(null);
     setNomineeImage(null);
     // Reset file input fields visually
     const fileInputs = document.querySelectorAll('input[type="file"]');
     fileInputs.forEach(input => input.value = "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true); // Start loading

    // Basic validation (can be expanded)
    if (!personal.name || !personal.father || !personal.mother || !personal.dob || !personal.nid || !personal.mobile || !personal.address ||
        !nominee.name || !nominee.father || !nominee.mother || !nominee.dob || !nominee.nid || !nominee.mobile || !nominee.address) {
      setError("Please fill in all required fields for both Personal and Nominee sections.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("personal", JSON.stringify(personal));
    formData.append("nominee", JSON.stringify(nominee));
    if (personalImage) formData.append("personalImage", personalImage);
    if (nomineeImage) formData.append("nomineeImage", nomineeImage);

    try {
      const response = await axios.post("/api/profile/info" || "http://localhost:1525/api/profile/info", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message || "Profile saved successfully!");
      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.response?.data?.message || "Failed to save profile. Please try again.");
    } finally {
       setIsSubmitting(false); // Stop loading
    }
  };

  // Helper function to create form fields
  const renderInputField = (section, field, type = "text", required = true, handler, value) => (
    <div className="form-group" key={`${section}-${field}`}>
      <label htmlFor={`${section}-${field}`}>
        {/* Simple label generation */}
        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
      </label>
      <input
        type={type}
        id={`${section}-${field}`}
        name={field}
        value={value}
        onChange={handler}
        required={required}
        placeholder={`Enter ${field.toLowerCase()}`} // Add placeholders
      />
    </div>
  );

   const renderFileInput = (section, field, handler) => (
      <div className="form-group" key={`${section}-${field}`}>
        <label htmlFor={`${section}-${field}`}>
            {section.charAt(0).toUpperCase() + section.slice(1)} Image:
        </label>
         <input
            type="file"
            id={`${section}-${field}`}
            name={field}
            accept="image/jpeg,image/png,image/gif"
            onChange={handler}
        />
      </div>
   );


  return (
    // Use the main container class, remove inline styles
    <div className="profile-form-container">
      <ProfileNav/>
      <h2>Create Profile</h2>

      {/* Messages */}
      {error && <p className="message error">{error}</p>}
      {message && <p className="message success">{message}</p>}

      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className="form-section">
          <h3>Personal Information</h3>
          {renderInputField("personal", "name", "text", true, handlePersonalChange, personal.name)}
          {renderInputField("personal", "father", "text", true, handlePersonalChange, personal.father)}
          {renderInputField("personal", "mother", "text", true, handlePersonalChange, personal.mother)}
          {renderInputField("personal", "dob", "date", true, handlePersonalChange, personal.dob)}
          {renderInputField("personal", "nid", "number", true, handlePersonalChange, personal.nid)}
          {renderInputField("personal", "mobile", "number", true, handlePersonalChange, personal.mobile)}
          {renderInputField("personal", "address", "text", true, handlePersonalChange, personal.address)}
          {renderInputField("personal", "email", "email", false, handlePersonalChange, personal.email)}
          {renderFileInput("personal", "personalImage", handlePersonalImageChange)}
        <p style="color:red; font-weight:bold">Use photo less than 1MB</p>
        </div>

        {/* Nominee Information Section */}
        <div className="form-section">
          <h3>Nominee Information</h3>
           {renderInputField("nominee", "name", "text", true, handleNomineeChange, nominee.name)}
           {renderInputField("nominee", "father", "text", true, handleNomineeChange, nominee.father)}
           {renderInputField("nominee", "mother", "text", true, handleNomineeChange, nominee.mother)}
           {renderInputField("nominee", "dob", "date", true, handleNomineeChange, nominee.dob)}
           {renderInputField("nominee", "nid", "number", true, handleNomineeChange, nominee.nid)}
           {renderInputField("nominee", "mobile", "number", true, handleNomineeChange, nominee.mobile)}
           {renderInputField("nominee", "address", "text", true, handleNomineeChange, nominee.address)}
           {renderInputField("nominee", "email", "email", false, handleNomineeChange, nominee.email)}
           {renderFileInput("nominee", "nomineeImage", handleNomineeImageChange)}
       <p style="color:red; font-weight:bold">Use photo less than 1MB</p>
        </div>

        {/* Use the submit button class, remove inline style */}
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Profile'}
        </button>
      </form>

    </div>
  );
};

export default ProfileForm;
