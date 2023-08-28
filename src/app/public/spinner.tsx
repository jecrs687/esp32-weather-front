import React from "react";
import styles from "./spinner.module.css"

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}>
      </div>
    </div>
  );
}
