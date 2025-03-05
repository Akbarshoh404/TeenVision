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

              <div className={styles.topFooterSection1Cards}>
                <div className={styles.topFooterSection1Card}>Lorem</div>
                <div className={styles.topFooterSection1Card}>Lorem</div>
                <div className={styles.topFooterSection1Card}>Lorem</div>
                <div className={styles.topFooterSection1Card}>Lorem</div>
                <div className={styles.topFooterSection1Card}>Lorem</div>
                <div className={styles.topFooterSection1Card}>Lorem</div>
                <div className={styles.topFooterSection1Card}>Lorem</div>
                <div className={styles.topFooterSection1Card}>Lorem</div>
              </div>
            </div>

            <div className={styles.devider}></div>

            <div className={styles.topFooterSection2}>
              <div className={styles.topFooterSection2Div1}>
                <p className={styles.topFooterSection2Div1P1}>
                  Lorem Ipsum is simply
                </p>
                <input type="text" />
              </div>

              <div className={styles.topFooterSection2Div2}>
                <p className={styles.topFooterSection2Div2P1}>
                  Lorem Ipsum is simply
                </p>
                <p className={styles.topFooterSection2Div2P2}>
                  Go to our official Announcements
                </p>
              </div>
            </div>

            <div className={styles.devider}></div>

            <div className={styles.topFooterSection3}>
              <div className={styles.topFooterSection3Div}>
                <p className={styles.topFooterSection3DivP1}>
                  Lorem Ipsum is simply dummy
                </p>
                <p className={styles.topFooterSection3DivP2}>
                  Go to DID requirements
                </p>
              </div>

              <div className={styles.topFooterSection3Div}>
                <p className={styles.topFooterSection3DivP1}>
                  Lorem Ipsum is simply
                </p>
                <p className={styles.topFooterSection3DivP2}>
                  To the knowledgebase
                </p>
              </div>
            </div>

            <div className={styles.topFooterSection4}></div>
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
