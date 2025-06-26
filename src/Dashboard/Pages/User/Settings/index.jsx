import React, { useCallback, useState } from "react";
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

import bg from "../../../../Components/images/settings.png";
import profile from "../../../../Components/images/cardexample.png";

const DashboardSettings = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [settings, setSettings] = useState({
    firstName: "Charos",
    lastName: "Hakimov",
    email: "charosd@gmail.com",
    password: "",
    newsletter: false,
    profileImage: null,
    showPassword: false,
  });

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
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile update:", settings);
  };

  const toggleShowPassword = () => {
    setSettings((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

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
              {/* Profile Header */}
              <div className={styles.profileHeader}>
                <img
                  src={profile}
                  alt="Profile"
                  className={styles.profileImage}
                />
                <div>
                  <div className={styles.profileName}>Hakimova Charos</div>
                  <div className={styles.profileEmail}>charosd@gmail.com</div>
                </div>
              </div>
              {/* Editable Form */}
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
                    disabled
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="profileImage">Profile Image</label>
                  <div className={styles.uploadArea}>
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleInputChange}
                      className={styles.uploadInput}
                    />
                    <FaUpload className={styles.uploadIcon} />
                    <p className={styles.uploadText}>
                      Click to upload or drag and drop
                      <br />
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
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
                    I am agree to receive newsletters
                  </label>
                </div>
              </form>
              {/* Action Buttons */}
              <div className={styles.buttonGroup}>
                <button
                  type="submit"
                  className={styles.saveButton}
                  onClick={handleProfileSubmit}
                >
                  Save
                </button>
                <button type="button" className={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

DashboardSettings.propTypes = {};

export default DashboardSettings;
