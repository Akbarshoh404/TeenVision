import React from "react";
import { useState, useCallback } from "react";

import styles from "./style.module.scss";

import DashboardTopBar from "../../../Layoutes/TopBar";
import DashboardAdminNavbar from "../../../Layoutes/AdminNavbar";

const DashboardAdminDeletedPrograms = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);
  return (
    <>
      <div className={styles.dashboard}>
        <DashboardAdminNavbar
          isNavOpen={isNavOpen}
          toggleNav={toggleNav}
          closeNav={closeNav}
        />
        <DashboardTopBar />
      </div>
    </>
  );
};

export default DashboardAdminDeletedPrograms;
