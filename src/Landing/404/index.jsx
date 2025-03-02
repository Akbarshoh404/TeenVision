import React from "react";

import styles from "./style.module.scss";
import LandingNavbar from "../../Layoutes/Navbar";
import img from "../../Components/images/404.png";

import { useNavigate } from "react-router";

const Landing404 = () => {
  let navigate = useNavigate();
  return (
    <>
      <LandingNavbar />
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.left}>
            <p className={styles.p1}>404</p>

            <div>
              <p className={styles.p2}>
                OOOps! <br /> Page Not Found
              </p>
              <p className={styles.p3}>
                Sorry about that! Please visit our homepage to get where you
                need to go.
              </p>
              <button className={styles.button} onClick={() => {
                navigate("/")
              }}>
                Back to homepage
              </button>
            </div>
          </div>
          <img src={img} alt="" />
        </div>
      </section>
    </>
  );
};

export default Landing404;
