import React from "react";

import styles from "./Bottombar.module.css";

import homeIcon from "../../assets/home.svg";
import profileIcon from "../../assets/profile.svg";
import cardsIcon from "../../assets/deck.svg";
import BottombarTab from "./BottombarTab";

interface Tab {
    link: string;
    name: string;
    icon: string;
    active?: boolean;
}

const tabs: Tab[] = [
    {
        link: "/",
        name: "Home",
        icon: homeIcon
    },
    {
        link: "/add",
        name: "Cards",
        icon: cardsIcon
    },
    {
        link: "/profile",
        name: "Profile",
        icon: profileIcon
    }
];

export default function Bottombar(props: { match: string }) {
    return (
        <div className={styles.bottomBar}>
            {tabs.map((tab, i) => {
                return <BottombarTab link={tab.link} name={tab.name} icon={tab.icon} active={props.match == tab.link} key={i}/>;
            })}
        </div>
    );
}
