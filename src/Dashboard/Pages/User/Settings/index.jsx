import React, { useCallback, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DashboardNavbar from "../../../Layoutes/Navbar";
import DashboardTopBar from "../../../Layoutes/TopBar";
import styles from "./style.module.scss";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUpload,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import axios from "axios";

import bg from "../../../../Components/images/settings.png";
import profile from "../../../../Components/images/cardexample.png";

// Fallback country list if API fails
const fallbackCountries = [
  { code: "US", name: "United States" },
  { code: "CN", name: "China" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "NG", name: "Nigeria" },
  { code: "RU", name: "Russia" },
  { code: "JP", name: "Japan" },
  { code: "DE", name: "Germany" },
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "CA", name: "Canada" },
  { code: "KR", name: "South Korea" },
  { code: "AU", name: "Australia" },
  { code: "ES", name: "Spain" },
  { code: "MX", name: "Mexico" },
  { code: "ID", name: "Indonesia" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "TR", name: "Turkey" },
  { code: "ZA", name: "South Africa" },
  { code: "AR", name: "Argentina" },
  { code: "PL", name: "Poland" },
  { code: "EG", name: "Egypt" },
  { code: "TH", name: "Thailand" },
  { code: "VN", name: "Vietnam" },
  { code: "PH", name: "Philippines" },
  { code: "PK", name: "Pakistan" },
  { code: "BD", name: "Bangladesh" },
  { code: "ET", name: "Ethiopia" },
  { code: "CO", name: "Colombia" },
  { code: "MY", name: "Malaysia" },
  { code: "KE", name: "Kenya" },
  { code: "GH", name: "Ghana" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "UA", name: "Ukraine" },
  { code: "SE", name: "Sweden" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "CH", name: "Switzerland" },
  { code: "SG", name: "Singapore" },
  { code: "HK", name: "Hong Kong" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "IL", name: "Israel" },
  { code: "NZ", name: "New Zealand" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "IE", name: "Ireland" },
  { code: "AT", name: "Austria" },
  { code: "PT", name: "Portugal" },
  { code: "GR", name: "Greece" },
  { code: "CZ", name: "Czech Republic" },
  { code: "HU", name: "Hungary" },
  { code: "RO", name: "Romania" },
  { code: "CL", name: "Chile" },
  { code: "PE", name: "Peru" },
  { code: "VE", name: "Venezuela" },
  { code: "EC", name: "Ecuador" },
  { code: "QA", name: "Qatar" },
  { code: "KW", name: "Kuwait" },
  { code: "MA", name: "Morocco" },
  { code: "DZ", name: "Algeria" },
  { code: "TN", name: "Tunisia" },
  { code: "JO", name: "Jordan" },
  { code: "LK", name: "Sri Lanka" },
  { code: "NP", name: "Nepal" },
  { code: "MM", name: "Myanmar" },
  { code: "KH", name: "Cambodia" },
  { code: "LA", name: "Laos" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "TW", name: "Taiwan" },
  { code: "SY", name: "Syria" },
].sort((a, b) => a.name.localeCompare(b.name));

const DashboardSettings = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [countries, setCountries] = useState(fallbackCountries);
  const [settings, setSettings] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    country: "",
    newsletter: false,
    profileImage: null,
    selectedFileName: "",
    showPassword: false,
    loading: false,
    error: null,
    warning: null,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    // Load user data from localStorage
    try {
      const userData = localStorage.getItem("user");
      if (!userData) throw new Error("User data not found in localStorage");

      const user = JSON.parse(userData);
      const fullName = user.full_name ? user.full_name.split(" ") : ["", ""];
      const firstName = fullName[0] || "";
      const lastName = fullName.slice(1).join(" ") || "";

      setSettings((prev) => ({
        ...prev,
        firstName,
        lastName,
        email: user.email || "",
        loading: false,
      }));
    } catch (err) {
      console.error("LocalStorage error:", err.message);
      setSettings((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load user data from localStorage",
      }));
    }
  }, []);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
      selectedFileName:
        type === "file" && files[0] ? files[0].name : prev.selectedFileName,
    }));
  };

  const toggleShowPassword = () => {
    setSettings((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (
      file &&
      ["image/png", "image/jpeg", "image/svg+xml", "image/gif"].includes(
        file.type
      )
    ) {
      setSettings((prev) => ({
        ...prev,
        profileImage: file,
        selectedFileName: file.name,
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        error: "Please drop a valid image file (PNG, JPG, SVG, or GIF)",
      }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSettings((prev) => ({
      ...prev,
      loading: true,
      error: null,
      warning: null,
    }));

    // Warn user about unsupported fields
    if (
      settings.firstName ||
      settings.lastName ||
      settings.password ||
      settings.newsletter
    ) {
      setSettings((prev) => ({
        ...prev,
        warning:
          "Note: First Name, Last Name, Password, and Newsletter preferences cannot be updated with this form.",
      }));
    }

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found");

      const formData = new FormData();
      if (settings.age) formData.append("age", settings.age);
      if (settings.gender) formData.append("gender", settings.gender);
      if (settings.country) formData.append("country", settings.country);
      if (settings.profileImage)
        formData.append("photo", settings.profileImage);

      await axios.patch(
        "http://127.0.0.1:8000/api/v1/api/v1/auth/profile/update/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSettings((prev) => ({ ...prev, loading: false }));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      let errorMessage = "Failed to update profile";
      if (err.response?.status === 401) {
        errorMessage = "Session expired. Please log in again.";
      } else if (err.response?.status === 400) {
        errorMessage =
          err.response?.data?.detail ||
          "Invalid data provided. Please check your input.";
      } else if (err.response?.status === 405) {
        errorMessage = "Method not allowed. Please contact support.";
      }
      setSettings((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  };

  const handleCancel = () => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : {};
    const fullName = user.full_name ? user.full_name.split(" ") : ["", ""];
    const firstName = fullName[0] || "";
    const lastName = fullName.slice(1).join(" ") || "";

    setSettings((prev) => ({
      ...prev,
      firstName,
      lastName,
      email: user.email || "",
      password: "",
      age: "",
      gender: "",
      country: "",
      newsletter: false,
      profileImage: null,
      selectedFileName: "",
      showPassword: false,
      error: null,
      warning: null,
    }));
  };

  if (settings.loading) return <div>Loading...</div>;
  if (settings.error && !settings.firstName && !settings.email) {
    return <div className={styles.error}>{settings.error}</div>;
  }

  return (
    <div className={styles.dashboard}>
      <DashboardNavbar
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        closeNav={closeNav}
      />
      <DashboardTopBar isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <main className={styles.mainContent}>
        <img src={bg} alt="Header" className={styles.headerImage} />
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.settingsSection}>
              <div className={styles.profileHeader}>
                <img
                  src={profile}
                  alt="Profile"
                  className={styles.profileImage}
                />
                <div>
                  <div className={styles.profileName}>
                    {settings.firstName} {settings.lastName}
                  </div>
                  <div className={styles.profileEmail}>{settings.email}</div>
                </div>
              </div>
              <form
                className={styles.settingsForm}
                onSubmit={handleProfileSubmit}
              >
                <div className={styles.formGroup}>
                  <div className={styles.nameFields}>
                    <div className={styles.formField}>
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={settings.firstName}
                        onChange={handleInputChange}
                        className={styles.input}
                        disabled
                      />
                    </div>
                    <div className={styles.formField}>
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={settings.lastName}
                        onChange={handleInputChange}
                        className={styles.input}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={settings.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    disabled
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={settings.age}
                    onChange={handleInputChange}
                    className={styles.input}
                    min="0"
                    max="2147483647"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={settings.gender}
                    onChange={handleInputChange}
                    className={styles.input}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={settings.country}
                    onChange={handleInputChange}
                    className={styles.input}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="profileImage">Profile Image</label>
                  <div
                    className={styles.uploadArea}
                    onClick={handleUploadClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      accept="image/png,image/jpeg,image/svg+xml,image/gif"
                      onChange={handleInputChange}
                      className={styles.uploadInput}
                      ref={fileInputRef}
                    />
                    <FaUpload className={styles.uploadIcon} />
                    <p className={styles.uploadText}>
                      Click to upload or drag and drop
                      <br />
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                    {settings.selectedFileName && (
                      <p>Selected: {settings.selectedFileName}</p>
                    )}
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <div className={styles.passwordWrapper}>
                    <input
                      type={settings.showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={settings.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className={styles.input}
                    />
                    <span
                      className={styles.passwordToggle}
                      onClick={toggleShowPassword}
                    >
                      {settings.showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={settings.newsletter}
                      onChange={handleInputChange}
                    />
                    I agree to receive newsletters
                  </label>
                </div>
                {settings.warning && (
                  <div className={styles.warning}>{settings.warning}</div>
                )}
                <div className={styles.buttonGroup}>
                  <button
                    type="submit"
                    className={styles.saveButton}
                    disabled={settings.loading}
                  >
                    {settings.loading ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
                {settings.error && (
                  <div className={styles.error}>{settings.error}</div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

DashboardSettings.propTypes = {};

export default DashboardSettings;
