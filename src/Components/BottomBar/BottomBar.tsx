import React from "react";

import styles from "./BottomBar.module.css";
import { Link } from "react-router-dom";

export default function BottomBar() {
    return (
        <div className={styles.bottomBar}>
            <Link to={"/"}>Home</Link>
            <Link to={"/"}>Cards</Link>
            <Link to={"/"}>Profile</Link>
        </div>
    );
}
