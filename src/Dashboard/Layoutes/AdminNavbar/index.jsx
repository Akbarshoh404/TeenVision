import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import {
  FiHome,
  FiStar,
  FiBook,
  FiSettings,
  FiAward,
  FiX,
} from "react-icons/fi";
import logo from "../../../Components/icons/logo.png";

const DashboardAdminNavbar = ({ isNavOpen, toggleNav, closeNav }) => {
  const location = useLocation();

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
          <a
            href="#home"
            className={`${styles.navLink} ${
              location.hash === "#home" ? styles.active : ""
            }`}
            onClick={closeNav}
          >
            <FiHome className={styles.icon} />
            New Programs
          </a>
        </li>
        <li className={styles.navItem}>
          <a
            href="#reviews"
            className={`${styles.navLink} ${
              location.hash === "#reviews" ? styles.active : ""
            }`}
            onClick={closeNav}
          >
            <FiStar className={styles.icon} />
            Deleted Programs
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardAdminNavbar;
