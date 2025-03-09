import React from "react";

import styles from "./style.module.scss";

import img from "../../../Components/images/HomeSection3.png";

const HomeSection3 = () => {
  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <p className={styles.title}>
            <span>Internship</span> Opportunities
          </p>

          <div className={styles.cards}>
            <div className={styles.card_odd}>
              <div className={styles.cardLeft}>
                <p className={styles.p1}>
                  Frontend <br /> Developer
                </p>

                <p className={styles.p2}>Learn more</p>
              </div>

              <div className={styles.cardRight}>
                <img src={img} alt="" />
              </div>
            </div>

            <div className={styles.card_even}>
              <div className={styles.cardLeft}>
                <p className={styles.p1}>
                  Frontend <br /> Developer
                </p>

                <p className={styles.p2}>Learn more</p>
              </div>

              <div className={styles.cardRight}>
                <img src={img} alt="" />
              </div>
            </div>

            <div className={styles.card_odd}>
              <div className={styles.cardLeft}>
                <p className={styles.p1}>
                  Frontend <br /> Developer
                </p>

                <p className={styles.p2}>Learn more</p>
              </div>

              <div className={styles.cardRight}>
                <img src={img} alt="" />
              </div>
            </div>

            <div className={styles.card_even}>
              <div className={styles.cardLeft}>
                <p className={styles.p1}>
                  Frontend <br /> Developer
                </p>

                <p className={styles.p2}>Learn more</p>
              </div>

              <div className={styles.cardRight}>
                <img src={img} alt="" />
              </div>
            </div>

            <div className={styles.card_odd}>
              <div className={styles.cardLeft}>
                <p className={styles.p1}>
                  Frontend <br /> Developer
                </p>

                <p className={styles.p2}>Learn more</p>
              </div>

              <div className={styles.cardRight}>
                <img src={img} alt="" />
              </div>
            </div>

            <div className={styles.card_even}>
              <div className={styles.cardLeft}>
                <p className={styles.p1}>
                  Frontend <br /> Developer
                </p>

                <p className={styles.p2}>Learn more</p>
              </div>

              <div className={styles.cardRight}>
                <img src={img} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSection3;
