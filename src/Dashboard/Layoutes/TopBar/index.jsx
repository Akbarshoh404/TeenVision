import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import { FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";

const DashboardTopBar = ({ isNavOpen, toggleNav }) => {
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
          <span className={styles.accountName}>John Doe</span>
          <span className={styles.accountEmail}>john.doe@gmail.com</span>
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
