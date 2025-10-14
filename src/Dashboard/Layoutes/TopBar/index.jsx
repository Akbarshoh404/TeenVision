import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import { FiSearch, FiUser, FiMenu, FiX, FiLogOut } from "react-icons/fi";

const DashboardTopBar = ({ isNavOpen, toggleNav, onSearch }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.full_name || "User"; // Prioritize full_name, fallback to "User"
  const userEmail = user?.email || "user@example.com";
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      // Trigger search after 3 characters
      try {
        const response = await fetch(
          `https://teenvision-1.onrender.com/api/v1/programs/?search=${encodeURIComponent(
            query
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          onSearch(data.results); // Pass results to parent component
        } else {
          console.error("Search failed:", data);
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      onSearch([]); // Clear results if query is too short
    }
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
          placeholder="Search programs..."
          className={styles.searchInput}
          aria-label="Search programs"
          value={searchQuery}
          onChange={handleSearch}
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
  onSearch: PropTypes.func, // Callback to handle search results
};

DashboardTopBar.defaultProps = {
  onSearch: () => {}, // Default empty function
};

export default DashboardTopBar;
