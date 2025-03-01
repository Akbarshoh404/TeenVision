import React from "react";

import styles from "./style.module.scss";

const Login = () => {
  return (
    <>
      <div className={styles.login}>
        <div className={styles.left}></div>

        <div className={styles.right}>
          <div className={styles.texts}>
            <p className={styles.p1}>Sign in </p>
            <p className={styles.p2}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry.
            </p>
          </div>

          <form className={styles.inputs}>
            <input type="text" placeholder="Email Address" />
            <input type="text" placeholder="Password" />
          </form>

          <p className={styles.p3}>Already have an account ? <span>Sign in</span></p>
        </div>
      </div>
    </>
  );
};

export default Login;
