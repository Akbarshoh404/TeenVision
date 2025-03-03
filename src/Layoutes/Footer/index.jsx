import React from "react";

import styles from "./style.module.scss";

const LandingFooter = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.topFooter}>
          <div className={styles.container}>
            <div className={styles.topFooterSection1}>
              <p className={styles.topFooterSection1P1}>Key words</p>
            </div>

            <div></div>

            <div></div>

            <div></div>
          </div>
        </div>

        <div className={styles.bottomFooter}>
          <p>© Copyright ©2025 All rights reserved | Powered by Lorem</p>
        </div>
      </footer>
    </>
  );
};

export default LandingFooter;
