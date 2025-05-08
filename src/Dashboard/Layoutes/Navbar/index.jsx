import React from "react";
import PropTypes from "prop-types";
import styles from "./style.module.scss";
import {
  FiHome,
  FiStar,
  FiBook,
  FiSettings,
  FiAward,
  FiX,
} from "react-icons/fi";
import logo from "../../../Components/icons/logo.png";

const DashboardNavbar = ({ isNavOpen, toggleNav, closeNav }) => {
  return (
    <nav className={`${styles.navbar} ${isNavOpen ? styles.open : ""}`}>
      <button
        className={styles.closeBtn}
        onClick={toggleNav}
        aria-label="Close navigation"
      >
        <FiX size={24} />
      </button>
      <div className={styles.logoContainer}>
        <img src={logo} alt="TeenVision Logo" className={styles.logoImage} />
        <span className={styles.logoText}>TeenVision</span>
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a href="#home" className={styles.navLink} onClick={closeNav}>
            <FiHome className={styles.icon} />
            Home
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#reviews" className={styles.navLink} onClick={closeNav}>
            <FiStar className={styles.icon} />
            Reviews
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#tutorials" className={styles.navLink} onClick={closeNav}>
            <FiBook className={styles.icon} />
            Tutorials
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#settings" className={styles.navLink} onClick={closeNav}>
            <FiSettings className={styles.icon} />
            Settings
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="#premium" className={styles.navLink} onClick={closeNav}>
            <FiAward className={styles.icon} />
            Premium
          </a>
        </li>
      </ul>
    </nav>
  );
};

DashboardNavbar.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
  closeNav: PropTypes.func.isRequired,
};

export default DashboardNavbar;