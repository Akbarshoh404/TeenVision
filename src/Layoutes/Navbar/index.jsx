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

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log("Searching for:", searchQuery);
      // Implement your search logic here
      // navigate(`/search?q=${searchQuery}`);
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
              />
              <SearchIcon className={styles.searchIcon} />
            </div>
            <p
              onClick={() => {
                navigate("/");
                setIsDrawerOpen(false);
              }}
            >
              Home
              <span className={styles.line}></span>
            </p>
            {/* <p
              onClick={() => {
                navigate("/about");
                setIsDrawerOpen(false);
              }}
            >
              About us
              <span className={styles.line}></span>
            </p>
            <p
              onClick={() => {
                navigate("/majors");
                setIsDrawerOpen(false);
              }}
            >
              Majors
              <span className={styles.line}></span>
            </p>
            <p
              onClick={() => {
                navigate("/exchangeprograms");
                setIsDrawerOpen(false);
              }}
            >
              Exchange Programs
              <span className={styles.line}></span>
            </p> */}
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
            />
            <SearchIcon className={styles.searchIcon} />
          </div>
          <div className={styles.navLinks}>
            <p onClick={() => navigate("/")}>
              Home <span className={styles.line}></span>
            </p>
            {/* <p onClick={() => navigate("/about")}>
              About us <span className={styles.line}></span>
            </p>
            <p onClick={() => navigate("/majors")}>
              Majors <span className={styles.line}></span>
            </p>
            <p onClick={() => navigate("/exchangeprograms")}>
              Exchange Programs <span className={styles.line}></span>
            </p> */}
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
