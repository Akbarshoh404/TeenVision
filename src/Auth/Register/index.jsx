import React from "react";

import styles from "./style.module.scss";
import { useNavigate } from "react-router";

const Register = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className={styles.login}>
        <div className={styles.left}></div>

        <div className={styles.right}>
          <div className={styles.texts}>
            <p className={styles.p1}>Sign Up</p>
            <p className={styles.p2}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry.
            </p>
          </div>

          <form className={styles.inputs}>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />

            <div className={styles.confirm}>
              <input type="checkbox" />
              <label htmlFor="confirm">Confirm Password</label>
            </div>

            <button className={styles.button}>Continue</button>
          </form>

          <p className={styles.p3}>
            Already have an account ? 
            <span
              onClick={() => {
                navigate("/login");
              }}
            >
               Sign In
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
