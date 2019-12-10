import React from "react";
// @ts-ignore
import styles from "./Card.module.css";

interface Props {
    accent?: boolean;
    children: any;
    title: string;
}

export default function Card(props: Props) {
    return (
        <div
            className={[
                styles.deckCard,
                props.accent ? styles.accent : ""
            ].join(" ")}
        >
            <div className={styles.title}>{props.title}</div>
            {props.children}
        </div>
    );
}
