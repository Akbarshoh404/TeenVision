// HomeSection1.jsx (unchanged)
import React from "react";
import styles from "./style.module.scss";
import img1 from "../../../Components/images/VR Array 1 (1).png";
import img2 from "../../../Components/images/Line Chart 1.png";
import img3 from "../../../Components/images/clock 1.png";

const HomeSection1 = () => {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.p1}>
            About <span>Lorem</span>
          </p>

          <p className={styles.p2}>
            At AFQ Tech, we believe in a systematic approach for any project be
            it complex or simple. We are a group of individuals with a various
            set of skill set varies from Digital Marketing to IoT/Robotics
            solutions. We have our dedicated team for your project which uses
            various methods such as agile Scrum & agile Kanban. We ensure
            top-notch quality, on-time delivery, and agility for your project.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <div className={styles.cardImg}>
                <img src={img1} alt="" />
              </div>
              <p className={styles.cardP1}>Cutting Edge Technology</p>
              <p className={styles.cardP2}>
                Take the advantage of our cutting-edge solutions to increase
                your Return of Investment on IT.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardImg}>
                <img src={img2} alt="" />
              </div>
              <p className={styles.cardP1}>Cutting Edge Technology</p>
              <p className={styles.cardP2}>
                Take the advantage of our cutting-edge solutions to increase
                your Return of Investment on IT.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardImg}>
                <img src={img3} alt="" />
              </div>
              <p className={styles.cardP1}>Cutting Edge Technology</p>
              <p className={styles.cardP2}>
                Take the advantage of our cutting-edge solutions to increase
                your Return of Investment on IT.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSection1;
