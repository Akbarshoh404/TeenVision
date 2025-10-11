import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import DashboardNavbar from "../../../Layoutes/Navbar";
import DashboardTopBar from "../../../Layoutes/TopBar";
import Loading from "../../../Layoutes/Loader/index"; // Adjust path as provided
import styles from "./style.module.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import bg from "../../../../Components/images/settings.png";
import maleAvatar from "../../../../Components/icons/pofile.png";
import femaleAvatar from "../../../../Components/icons/pofile.png";
import defaultAvatar from "../../../../Components/icons/pofile.png";

const DashboardSettings = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [settings, setSettings] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    country: "",
    notification_status: false,
    loading: false,
    error: null,
    warning: null,
  });

  const countries = [
    { code: "AF", name: "Afghanistan" },
    { code: "AL", name: "Albania" },
    { code: "AR", name: "Argentina" },
    { code: "AU", name: "Australia" },
    { code: "AZ", name: "Azerbaijan" },
    { code: "BD", name: "Bangladesh" },
    { code: "BR", name: "Brazil" },
    { code: "CA", name: "Canada" },
    { code: "CN", name: "China" },
    { code: "DE", name: "Germany" },
    { code: "EG", name: "Egypt" },
    { code: "ES", name: "Spain" },
    { code: "FR", name: "France" },
    { code: "GB", name: "United Kingdom" },
    { code: "IN", name: "India" },
    { code: "IR", name: "Iran" },
    { code: "IT", name: "Italy" },
    { code: "JP", name: "Japan" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "KG", name: "Kyrgyzstan" },
    { code: "KR", name: "South Korea" },
    { code: "MX", name: "Mexico" },
    { code: "NG", name: "Nigeria" },
    { code: "PK", name: "Pakistan" },
    { code: "RU", name: "Russia" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "SG", name: "Singapore" },
    { code: "TJ", name: "Tajikistan" },
    { code: "TH", name: "Thailand" },
    { code: "TM", name: "Turkmenistan" },
    { code: "TR", name: "Turkey" },
    { code: "UA", name: "Ukraine" },
    { code: "US", name: "United States" },
    { code: "UZ", name: "Uzbekistan" },
    { code: "VN", name: "Vietnam" },
    { code: "ZA", name: "South Africa" },
  ].sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) throw new Error("User data not found in localStorage");

      const user = JSON.parse(userData);
      setSettings((prev) => ({
        ...prev,
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        age: user.age || "",
        gender: user.gender || "",
        country: user.country || "",
        notification_status: user.notification_status || false,
        loading: false,
      }));
    } catch (err) {
      console.error("LocalStorage error:", err.message);
      if (settings.notification_status) {
        toast.error("Failed to load user data");
      }
      setSettings((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const toggleNotifications = () => {
    setSettings((prev) => {
      const newState = !prev.notification_status;
      localStorage.setItem("notification_status", newState);
      if (newState) {
        toast.success("Notifications enabled");
      } else {
        toast.success("Notifications disabled");
      }
      return { ...prev, notification_status: newState };
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSettings((prev) => ({
      ...prev,
      loading: true,
      error: null,
      warning: null,
    }));

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No access token found");

      const formData = new FormData();
      if (settings.firstName) formData.append("first_name", settings.firstName);
      if (settings.lastName) formData.append("last_name", settings.lastName);
      if (settings.email) formData.append("email", settings.email);
      if (settings.age) formData.append("age", settings.age);
      if (settings.gender) formData.append("gender", settings.gender);
      if (settings.country) formData.append("country", settings.country);
      formData.append("notification_status", settings.notification_status);

      const response = await axios.patch(
        "https://teenvision-1.onrender.com/api/v1/auth/profile/update/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = {
        ...JSON.parse(localStorage.getItem("user")),
        first_name: settings.firstName,
        last_name: settings.lastName,
        email: settings.email,
        age: settings.age || undefined,
        gender: settings.gender || undefined,
        country: settings.country || undefined,
        notification_status: settings.notification_status,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setSettings((prev) => ({ ...prev, loading: false }));
      if (settings.notification_status) {
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      let errorMessage = "Failed to update profile";
      if (err.response?.status === 401) {
        errorMessage = "Session expired. Please log in again.";
        window.location.href = "/login";
      } else if (err.response?.status === 400) {
        errorMessage =
          err.response?.data?.detail ||
          "Invalid data provided. Please check your input.";
      } else if (err.response?.status === 405) {
        errorMessage = "Method not allowed. Please contact support.";
      }
      if (settings.notification_status) {
        toast.error(errorMessage);
      }
      setSettings((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleCancel = () => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : {};
    setSettings((prev) => ({
      ...prev,
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      email: user.email || "",
      age: user.age || "",
      gender: user.gender || "",
      country: user.country || "",
      notification_status: user.notification_status || false,
      error: null,
      warning: null,
    }));
  };

  const getAvatar = () => {
    switch (settings.gender.toLowerCase()) {
      case "male":
        return maleAvatar;
      case "female":
        return femaleAvatar;
      default:
        return defaultAvatar;
    }
  };

  if (settings.loading) return <Loading />;

  return (
    <div className={styles.dashboard}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: '"Poppins", sans-serif',
            background: "#ffffff",
            color: "#333333",
            border: "1px solid #cccccc",
            borderRadius: "12px",
            padding: "10px 15px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            animation: "toastFadeIn 0.3s ease-out",
          },
          success: { style: { border: "1px solid #297379" } },
          error: { style: { border: "1px solid #e0245e" } },
        }}
      />
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
                <img src={getAvatar()} alt="Avatar" className={styles.avatar} />
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
                    max="150"
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
                    <option value="other">Other</option>
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
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={settings.notification_status}
                      onChange={toggleNotifications}
                    />
                    Enable Notifications
                  </label>
                </div>
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
