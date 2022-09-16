import { Button } from "antd";
import React from "react";
import styles from "../styles/FingerPrintScanner.module.css";

const FingerPrintScanner = () => {
  return (
    <div className={styles.fingerPrintScanner}>
      <div>Fingerprint</div>
      <div className={styles.fingerPrintBox}>
        <img src="/fingerprint.svg" alt="" />
      </div>
      <Button style={{ width: "120px", marginTop: "5px" }}>Scan</Button>
    </div>
  );
};

export default FingerPrintScanner;
