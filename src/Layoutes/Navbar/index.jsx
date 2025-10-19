// LandingNavbar.jsx
import React, { useState } from "react";
import styles from "./style.module.scss";
import logo from "../../Components/icons/logo.png";
import { useNavigate } from "react-router";
import { ReactComponent as SearchIcon } from "../../Components/icons/search-icon.svg"; // You'll need to add this SVG

const LandingNavbar = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const goToSearchDestination = () => {
    const isAuthenticated = !!localStorage.getItem("access_token");
    navigate(isAuthenticated ? "/dashboard/home" : "/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      goToSearchDestination();
    }
  };

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

        <button
          className={styles.hamburger}
          onClick={toggleDrawer}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ""}`}>
          <div className={styles.drawerContent}>
            <div className={styles.mobileSearch}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
                onFocus={goToSearchDestination}
              />
              <SearchIcon className={styles.searchIcon} />
            </div>
            <p
              onClick={() => {
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsDrawerOpen(false);
              }}
            >
              Home<span className={styles.line}></span>
            </p>
            <p
              onClick={() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsDrawerOpen(false);
              }}
            >
              About<span className={styles.line}></span>
            </p>
            <p
              onClick={() => {
                document
                  .getElementById("programs")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsDrawerOpen(false);
              }}
            >
              Programs<span className={styles.line}></span>
            </p>
            <p
              onClick={() => {
                document
                  .getElementById("reviews")
                  ?.scrollIntoView({ behavior: "smooth" });
                setIsDrawerOpen(false);
              }}
            >
              Reviews<span className={styles.line}></span>
            </p>
            <button
              type="button"
              onClick={() => {
                navigate("/register");
                setIsDrawerOpen(false);
              }}
            >
              Registration
            </button>
          </div>
        </div>

        <div className={styles.desktopNavigation}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              onFocus={goToSearchDestination}
            />
            <SearchIcon className={styles.searchIcon} />
          </div>
          <div className={styles.navLinks}>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Home <span className={styles.line}></span>
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              About <span className={styles.line}></span>
            </a>
            <a
              href="#reviews"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("reviews")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Programs <span className={styles.line}></span>
            </a>
            <a
              href="#programs"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("programs")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Reviews <span className={styles.line}></span>
            </a>
            <button type="button" onClick={() => navigate("/register")}>
              Registration
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
