import * as React from "react";
import { Link } from "react-router-dom";

import styles from "./BottombarTab.module.css";

interface Props {
    link: string;
    name: string;
    icon: string;
    active?: boolean;
}

function BottombarTab(props: Props) {
    return (
        <Link to={props.link} className={[(props.active ? styles.active : ""), styles.tab].join(" ")}>
            <img src={props.icon} alt={props.name}/>
            <span>{props.name}</span>
        </Link>
    );
}

export default BottombarTab;
