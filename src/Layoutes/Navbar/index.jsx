import React from "react";
import styles from "./style.module.scss";
import logo from "../../Components/icons/logo.png";

const LandingNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="TeenVision Logo" />
          <p>TeenVision</p>
        </div>

        <div className={styles.navigation}>
          <p>
            Home
            <span className={styles.line}></span>
          </p>
          <p>
            About us
            <span className={styles.line}></span>
          </p>
          <p>
            Majors
            <span className={styles.line}></span>
          </p>
          <p>
            Internships
            <span className={styles.line}></span>
          </p>
          <p>
            Exchange Programs
            <span className={styles.line}></span>
          </p>

          <button type="button">Registration</button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
