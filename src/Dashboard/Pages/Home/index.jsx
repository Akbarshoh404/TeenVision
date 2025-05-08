import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import DashboardNavbar from "../../Layoutes/Navbar";
import DashboardTopBar from "../../Layoutes/TopBar";
import styles from "./style.module.scss";

const DashboardHome = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  return (
    <div className={styles.dashboard}>
      <DashboardNavbar
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        closeNav={closeNav}
      />
      <DashboardTopBar isNavOpen={isNavOpen} toggleNav={toggleNav} />
      <main className={styles.mainContent}></main>
    </div>
  );
};

DashboardHome.propTypes = {};

export default DashboardHome;
