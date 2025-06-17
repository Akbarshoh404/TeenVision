import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import DashboardNavbar from "../../../Layoutes/Navbar";
import DashboardTopBar from "../../../Layoutes/TopBar";
import styles from "./style.module.scss";

const DashboardSettings = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [settings, setSettings] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    pushNotifications: false,
  });

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Add API call to update profile here
    console.log("Profile update:", {
      username: settings.username,
      email: settings.email,
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Add API call to update password here
    console.log("Password update:", {
      currentPassword: settings.currentPassword,
      newPassword: settings.newPassword,
      confirmPassword: settings.confirmPassword,
    });
  };

  const handleNotificationsSubmit = (e) => {
    e.preventDefault();
    // Add API call to update notification preferences here
    console.log("Notification preferences:", {
      emailNotifications: settings.emailNotifications,
      pushNotifications: settings.pushNotifications,
    });
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
        <section className={styles.section}>
          <div className={styles.container}>
            <h1 className={styles.title}>Settings</h1>
            <div className={styles.settingsSection}>
              <h2 className={styles.sectionTitle}>Profile Information</h2>
              <form
                className={styles.settingsForm}
                onSubmit={handleProfileSubmit}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={settings.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={settings.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={styles.input}
                  />
                </div>
                <button type="submit" className={styles.saveButton}>
                  Save Profile
                </button>
              </form>
            </div>
            <div className={styles.settingsSection}>
              <h2 className={styles.sectionTitle}>Change Password</h2>
              <form
                className={styles.settingsForm}
                onSubmit={handlePasswordSubmit}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={settings.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter current password"
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={settings.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={settings.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                    className={styles.input}
                  />
                </div>
                <button type="submit" className={styles.saveButton}>
                  Update Password
                </button>
              </form>
            </div>
            <div className={styles.settingsSection}>
              <h2 className={styles.sectionTitle}>Notification Preferences</h2>
              <form
                className={styles.settingsForm}
                onSubmit={handleNotificationsSubmit}
              >
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={handleInputChange}
                    />
                    Receive email notifications
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={settings.pushNotifications}
                      onChange={handleInputChange}
                    />
                    Receive push notifications
                  </label>
                </div>
                <button type="submit" className={styles.saveButton}>
                  Save Preferences
                </button>
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
