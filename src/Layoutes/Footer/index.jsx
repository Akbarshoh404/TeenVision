import styles from "./style.module.scss";

import { FaInstagram, FaTelegram, FaLinkedin, FaTwitter } from "react-icons/fa";

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

            <div className={styles.topFooterSection4}>
              <div className={styles.topFooterSection4}>
                <div className={styles.socialLinks}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://telegram.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTelegram />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomFooter}>
          <p>© Copyright ©2025 All rights reserved | Powered by Lorem</p>
        </div>
      </footer>
      Ё
    </>
  );
};

export default LandingFooter;