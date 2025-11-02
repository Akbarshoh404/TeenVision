import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import {
  FiHome,
  FiStar,
  FiBook,
  FiSettings,
  FiX,
  FiSearch,
} from "react-icons/fi";
import logo from "../../../Components/icons/logo.png";

const DashboardNavbar = ({ isNavOpen, toggleNav, closeNav }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.setProperty("--sidebar-width", "350px");
  }, []);

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
        <span
          className={styles.logoText}
          onClick={() => {
            navigate("/");
            closeNav();
          }}
        >
          TeenVision
        </span>
      </div>
      <div className={styles.searchContainer}>
        <FiSearch className={styles.icon} />
        <input
          type="text"
          placeholder="Search programs..."
          className={styles.searchInput}
          aria-label="Search programs"
        />
      </div>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a
            className={styles.navLink}
            onClick={() => {
              navigate("/dashboard/home");
              closeNav();
            }}
          >
            <FiHome className={styles.icon} />
            Home
          </a>
        </li>
        <li className={styles.navItem}>
          <a
            className={styles.navLink}
            onClick={() => {
              navigate("/dashboard/reviews");
              closeNav();
            }}
          >
            <FiStar className={styles.icon} />
            Liked Programs
          </a>
        </li>
        <li className={styles.navItem}>
          <a
            className={styles.navLink}
            onClick={() => {
              navigate("/dashboard/tutorials");
              closeNav();
            }}
          >
            <FiBook className={styles.icon} />
            Tutorials
          </a>
        </li>
        <li className={styles.navItem}>
          <a
            className={styles.navLink}
            onClick={() => {
              navigate("/dashboard/settings");
              closeNav();
            }}
          >
            <FiSettings className={styles.icon} />
            Settings
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
