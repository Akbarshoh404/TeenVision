import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { FiHome, FiTrash2, FiX } from "react-icons/fi";
import logo from "../../../Components/icons/logo.png";

const DashboardAdminNavbar = ({ isNavOpen, toggleNav, closeNav }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    closeNav();
  };

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
            href="/dashboard/admin/new-programs"
            className={`${styles.navLink} ${
              location.pathname === "/dashboard/admin/new-programs" ||
              location.pathname === "/dashboard/admin/new-programs/create"
                ? styles.active
                : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/dashboard/admin/new-programs");
            }}
          >
            <FiHome className={styles.icon} />
            New Programs
          </a>
        </li>
        <li className={styles.navItem}>
          <a
            href="/dashboard/admin/deleted-programs"
            className={`${styles.navLink} ${
              location.pathname === "/dashboard/admin/deleted-programs"
                ? styles.active
                : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/dashboard/admin/deleted-programs");
            }}
          >
            <FiTrash2 className={styles.icon} />
            Deleted Programs
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardAdminNavbar;
