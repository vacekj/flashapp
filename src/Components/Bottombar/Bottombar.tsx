import React from "react";

import styles from "./Bottombar.module.css";

import homeIcon from "../../assets/home.svg";
import profileIcon from "../../assets/profile.svg";
import cardsIcon from "../../assets/deck.svg";
import BottombarTab from "./BottombarTab";

export default function Bottombar() {
    return (
        <div className={styles.bottomBar}>
            <BottombarTab link={"/"} name={"Home"} icon={homeIcon}/>
            <BottombarTab link={"/add"} name={"Cards"} icon={cardsIcon}/>
            <BottombarTab link={"/profile"} name={"Profile"} icon={profileIcon}/>
        </div>
    );
}
