import React from "react";
import styles from "./style.module.scss";
import logo from "../../Components/icons/logo.png";

import { useNavigate } from "react-router";

const LandingNavbar = () => {
  let navigate = useNavigate();
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div
          className={styles.logo}
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="TeenVision Logo" />
          <p>TeenVision</p>
        </div>

        <div className={styles.navigation}>
          <p
            onClick={() => {
              navigate("/");
            }}
          >
            Home
            <span className={styles.line}></span>
          </p>
          <p
            onClick={() => {
              navigate("/about");
            }}
          >
            About us
            <span className={styles.line}></span>
          </p>
          <p
            onClick={() => {
              navigate("/majors");
            }}
          >
            Majors
            <span className={styles.line}></span>
          </p>
          <p
            onClick={() => {
              navigate("/internships");
            }}
          >
            Internships
            <span className={styles.line}></span>
          </p>
          <p
            onClick={() => {
              navigate("/exchangeprograms");
            }}
          >
            Exchange Programs
            <span className={styles.line}></span>
          </p>

          <button
            type="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Registration
          </button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
