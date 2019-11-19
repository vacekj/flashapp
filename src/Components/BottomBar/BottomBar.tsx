import React from "react";

import styles from "./BottomBar.module.css";
import { Link } from "react-router-dom";

import home from "../../assets/home.svg";
import profile from "../../assets/profile.svg";
import cardsIcon from "../../assets/deck.svg";

export default function BottomBar() {
    return (
        <div className={styles.bottomBar}>
            <Link to={"/"}>
                <img src={home} alt="Home"/>
                <span>Home</span>
            </Link>
            <Link to={"/"}>
                <img src={cardsIcon} alt="Cards"/>
                <span>Cards</span>
            </Link>
            <Link to={"/"}>
                <img src={profile} alt="Profile"/>
                <span>Profile</span>
            </Link>
        </div>
    );
}
