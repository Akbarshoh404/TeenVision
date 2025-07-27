import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import { FiSearch, FiUser, FiMenu, FiX, FiLogOut } from "react-icons/fi";

const DashboardTopBar = ({ isNavOpen, toggleNav }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.full_name || user?.username || "Guest User";
  const userEmail = user?.email || "guest@example.com";

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.leftContainer}>
        <button
          className={styles.hamburger}
          onClick={toggleNav}
          aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isNavOpen}
        >
          {isNavOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
        <div className={styles.responsiveIcons}>
          <button className={styles.iconButton} aria-label="Search">
            <FiSearch className={styles.icon} />
          </button>
        </div>
      </div>
      <div className={styles.searchContainer}>
        <FiSearch className={styles.icon} />
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          aria-label="Search"
        />
      </div>
      <div className={styles.accountContainer}>
        <FiUser className={styles.profileIcon} aria-hidden="true" />
        <div className={styles.accountDetails}>
          <span className={styles.accountName}>{userName}</span>
          <span className={styles.accountEmail}>{userEmail}</span>
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
            aria-label="Log out"
          >
            <FiLogOut className={styles.logoutIcon} />
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
};

DashboardTopBar.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default DashboardTopBar;
