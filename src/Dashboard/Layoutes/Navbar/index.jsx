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

import { useNavigate } from "react-router-dom";

const DashboardNavbar = ({ isNavOpen, toggleNav, closeNav }) => {
  const navigate = useNavigate();
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
          }}
        >
          TeenVision
        </span>
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
            Reviews
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
        <li className={styles.navItem}>
          <a
            className={styles.navLink}
            onClick={() => {
              navigate("/dashboard/premium");
              closeNav();
            }}
          >
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
