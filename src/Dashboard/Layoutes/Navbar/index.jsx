import React, { useState } from 'react';
import styles from './style.module.scss';
import { FiHome, FiStar, FiBook, FiSettings, FiAward, FiMenu, FiX } from 'react-icons/fi';

import logo from "../../../Components/icons/logo.png"

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className={styles.hamburger} onClick={toggleNav}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      <nav className={`${styles.navbar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.logoContainer}>
          <img
            src={logo}
            alt="TeenVision Logo"
            className={styles.logoImage}
          />
          <span className={styles.logoText}>TeenVision</span>
        </div>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a href="#home" className={`${styles.navLink} ${window.location.hash === '#home' ? styles.active : ''}`}>
              <FiHome className={styles.icon} />
              Home
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#reviews" className={`${styles.navLink} ${window.location.hash === '#reviews' ? styles.active : ''}`}>
              <FiStar className={styles.icon} />
              Reviews
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#tutorials" className={`${styles.navLink} ${window.location.hash === '#tutorials' ? styles.active : ''}`}>
              <FiBook className={styles.icon} />
              Tutorials
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#settings" className={`${styles.navLink} ${window.location.hash === '#settings' ? styles.active : ''}`}>
              <FiSettings className={styles.icon} />
              Settings
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#premium" className={`${styles.navLink} ${window.location.hash === '#premium' ? styles.active : ''}`}>
              <FiAward className={styles.icon} />
              Premium
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default DashboardNavbar;