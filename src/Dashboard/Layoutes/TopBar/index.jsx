import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { FiSearch, FiUser, FiMenu, FiX, FiLogOut } from "react-icons/fi";

const DashboardTopBar = ({ isNavOpen, toggleNav }) => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user.full_name || "User";
  const userEmail = user.email || "user@example.com";
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Retrieve programs and tutorials from localStorage
  const programs = JSON.parse(localStorage.getItem("programs")) || [];
  const tutorials = JSON.parse(localStorage.getItem("tutorials")) || [];

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 2) {
      const filteredResults = [
        ...programs
          .filter(
            (item) =>
              item.title.toLowerCase().includes(query) ||
              (item.desc && item.desc.toLowerCase().includes(query)) ||
              (item.country && item.country.toLowerCase().includes(query))
          )
          .map((item) => ({ ...item, type: "program" })),
        ...tutorials
          .filter(
            (item) =>
              item.title.toLowerCase().includes(query) ||
              (item.desc && item.desc.toLowerCase().includes(query)) ||
              (item.country && item.country.toLowerCase().includes(query))
          )
          .map((item) => ({ ...item, type: "tutorial" })),
      ];
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("programs");
    localStorage.removeItem("tutorials");
    window.location.href = "/login";
  };

  return (
    <>
      <header className={styles.topBar}>
        <div className={styles.leftContainer}>
          <button
            className={styles.hamburger}
            onClick={toggleNav}
            aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isNavOpen}
          >
            {isNavOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <div className={styles.responsiveIcons}>
            <button
              className={styles.iconButton}
              onClick={openModal}
              aria-label="Open search modal"
            >
              <FiSearch className={styles.icon} />
            </button>
          </div>
        </div>
        <div className={styles.searchContainer} onClick={openModal}>
          <FiSearch className={styles.icon} />
          <input
            type="text"
            placeholder="Search programs..."
            className={styles.searchInput}
            aria-label="Search programs"
            readOnly
          />
        </div>
        <div className={styles.accountContainer}>
          <FiUser className={styles.profileIcon} aria-hidden="true" />
          <div className={styles.accountDetails}>
            <span className={styles.accountName}>{userName}</span>
            <span className={styles.accountEmail}>{userEmail}</span>
            <button
              className={styles.logoutButton}
              onClick={handleLogout}
              aria-label="Log out"
            >
              <FiLogOut className={styles.logoutIcon} />
              Log Out
            </button>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div className={styles.searchModal}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Close search modal"
            >
              <FiX size={24} />
            </button>
            <div className={styles.modalSearchContainer}>
              <FiSearch className={styles.modalSearchIcon} />
              <input
                type="text"
                placeholder="Search programs and tutorials..."
                className={styles.modalSearchInput}
                aria-label="Search programs and tutorials"
                value={searchQuery}
                onChange={handleSearch}
                autoFocus
              />
            </div>
            <div className={styles.resultsContainer}>
              {searchQuery.length > 2 ? (
                searchResults.length > 0 ? (
                  <>
                    <h2 className={styles.sectionTitle}>Search Results</h2>
                    {searchResults.map((item) => (
                      <div key={item.id} className={styles.resultItem}>
                        <h3>{item.title}</h3>
                        <p>
                          {item.desc || "No description available"} -{" "}
                          {item.country || "N/A"}
                        </p>
                        <Link
                          to={`/dashboard/${item.type}/${item.slug}`}
                          className={styles.cardLink}
                        >
                          Learn More
                        </Link>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className={styles.noResults}>No results found</p>
                )
              ) : (
                <>
                  <h2 className={styles.sectionTitle}>Programs</h2>
                  {programs.length > 0 ? (
                    programs.map((program) => (
                      <div key={program.id} className={styles.resultItem}>
                        <h3>{program.title}</h3>
                        <p>
                          {program.desc || "No description available"} -{" "}
                          {program.country || "N/A"}
                        </p>
                        <Link
                          to={`/dashboard/program/${program.slug}`}
                          className={styles.cardLink}
                        >
                          Learn More
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className={styles.noResults}>No programs available</p>
                  )}
                  <h2 className={styles.sectionTitle}>Tutorials</h2>
                  {tutorials.length > 0 ? (
                    tutorials.map((tutorial) => (
                      <div key={tutorial.id} className={styles.resultItem}>
                        <h3>{tutorial.title}</h3>
                        <p>
                          {tutorial.desc || "No description available"} -{" "}
                          {tutorial.country || "N/A"}
                        </p>
                        <Link
                          to={`/dashboard/tutorial/${tutorial.slug}`}
                          className={styles.cardLink}
                        >
                          Learn More
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className={styles.noResults}>No tutorials available</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

DashboardTopBar.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default DashboardTopBar;
