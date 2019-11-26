import * as React from "react";
import { Link } from "react-router-dom";

import "./BottombarTab.module.css";

interface Props {
    link: string;
    name: string;
    icon: string;
    active?: boolean;
}

function BottombarTab(props: Props) {
    return (
        <Link to={props.link}>
            <img src={props.icon} alt={props.name}/>
            <span style={{
                display: props.active ? "inline" : "none"
            }}>{props.name}</span>
        </Link>
    );
}

export default BottombarTab;
