import React from "react";
import styles from "../styles/Home.module.css";

const Lougout = ({ handleSignOut, setShowConf }) => {
  return (
    <div className={styles.logoutConfiWrapper}>
      <div>
        <span className="h3 text-dark">Are you sure you want to logout</span>
        <div className="d-flex align-items-center gap-5">
          <button onClick={() => setShowConf()} className="btn btn-success">
            canel
          </button>
          <button onClick={handleSignOut} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lougout;
