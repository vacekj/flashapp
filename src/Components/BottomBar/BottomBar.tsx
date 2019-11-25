import React from "react";

import styles from "./BottomBar.module.css";
import { Link } from "react-router-dom";

import homeIcon from "../../assets/home.svg";
import profileIcon from "../../assets/profile.svg";
import cardsIcon from "../../assets/deck.svg";

export default function BottomBar() {
    return (
        <div className={styles.bottomBar}>
            <Link to={"/"}>
                <img src={homeIcon} alt="Home"/>
                <span>Home</span>
            </Link>
            <Link to={"/add"}>
                <img src={cardsIcon} alt="Cards"/>
                <span>Cards</span>
            </Link>
            <Link to={"/profile"}>
                <img src={profileIcon} alt="Profile"/>
                <span>Profile</span>
            </Link>
        </div>
    );
}
