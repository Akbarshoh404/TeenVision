import React from "react";
import styles from "./style.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loader}></div>
      <p className={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default Loading;