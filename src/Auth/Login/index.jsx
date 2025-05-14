import React from "react";

import styles from "./style.module.scss";
import { useNavigate } from "react-router";

const Login = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className={styles.login}>
        <div className={styles.left}></div>

        <div className={styles.right}>
          <div className={styles.texts}>
            <p className={styles.p1}>Sign in </p>
            <p className={styles.p2Ё}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry.
            </p>
          </div>

          <form className={styles.inputs}>
            <input type="text" placeholder="Email Address" />
            <input type="text" placeholder="Password" />

            <div className={styles.confirm}>
              <input type="checkbox" />
              <label htmlFor="confirm">Confirm Password</label>
            </div>

            <button className={styles.button} onClick={()=> {
              navigate("/dashboard/home")
            }}>Continue</button>
          </form>

          <p className={styles.p3}>
            Don't have an account ?{" "}
            <span
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
