import React from "react";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
  const navigate = useNavigate();
  const icons = [
    { type: "lightbulb", x: "80%", y: "15%" },
    { type: "bell", x: "5%", y: "75%" },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.center}>
          <div className={styles.centerTexts}>
            <p className={styles.centerText1}>
              We’re here to help you to be the <span>best one!</span>
            </p>
            <p className={styles.centerText2}>
              We harness the latest technologies to develop cutting-edge digital
              solutions for modern business requirements
            </p>
          </div>
          <button
            className={styles.seeMore}
            onClick={() => {
              const isAuthenticated = !!localStorage.getItem("access_token");
              navigate(isAuthenticated ? "/dashboard/home" : "/login");
            }}
          >
            See more
          </button>
          <div className={styles.numbers}>
            <div className={styles.centerCard}>
              <p className={styles.centerCardP1}>1234</p>
              <p className={styles.centerCardP2}>Lorem Ipsum is Simply</p>
            </div>
            <div className={styles.centerCard}>
              <p className={styles.centerCardP1}>1234</p>
              <p className={styles.centerCardP2}>Lorem Ipsum is Simply</p>
            </div>
          </div>
        </div>
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`${styles.floatingIcon} ${styles[icon.type]}`}
            style={{ left: icon.x, top: icon.y }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomeHeader;
