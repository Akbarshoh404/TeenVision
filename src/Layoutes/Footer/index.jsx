import React from "react";
import styles from "./style.module.scss";
import {
  FaInstagram,
  FaTelegram,
  FaLinkedin,
  FaTwitter,
  FaSearch,
} from "react-icons/fa";

const LandingFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topFooter}>
        <div className={styles.container}>
          <div className={styles.topFooterSection1}>
            <p className={styles.topFooterSection1P1}>Key Words</p>
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

          <div className={styles.divider}></div>

          <div className={styles.topFooterSection2}>
            <div className={styles.topFooterSection2Div1}>
              <p className={styles.topFooterSection2Div1P1}>Stay Updated</p>
              <form className={styles.newsletterForm}>
                <input
                  type="text"
                  placeholder="Search..."
                  aria-label="Search"
                  required
                />
                <button type="submit" aria-label="Search">
                  <FaSearch />
                </button>
              </form>
            </div>

            <div className={styles.topFooterSection2Div2}>
              <p className={styles.topFooterSection2Div2P1}>Announcements</p>
              <a
                href="https://example.com/announcements"
                className={styles.topFooterSection2Div2P2}
              >
                Go to our official Announcements
              </a>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.topFooterSection3}>
            <div className={styles.topFooterSection3Div}>
              <p className={styles.topFooterSection3DivP1}>DID Requirements</p>
              <a
                href="https://example.com/did-requirements"
                className={styles.topFooterSection3DivP2}
              >
                Go to DID requirements
              </a>
            </div>

            <div className={styles.topFooterSection3Div}>
              <p className={styles.topFooterSection3DivP1}>Knowledgebase</p>
              <a
                href="https://example.com/knowledgebase"
                className={styles.topFooterSection3DivP2}
              >
                To the knowledgebase
              </a>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.topFooterSection4}>
            <div className={styles.socialLinks}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <FaTelegram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomFooter}>
        <p>© Copyright 2025 All rights reserved | Powered by Lorem</p>
      </div>
    </footer>
  );
};

export default LandingFooter;