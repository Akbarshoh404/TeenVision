import React from "react";
import styles from "./style.module.scss";

const Home_Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.decoration}></div>
        </div>

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

        <div className={styles.right}>
          <div className={styles.decoration}></div>
        </div>
      </div>
    </div>
  );
};

export default Home_Header;
