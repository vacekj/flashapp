import React from "react";

import styles from "./DeckCard.module.css";

type Props = {
    name: string
};
export default function DeckCard(props: Props) {
    return (
        <div className={styles.deckCard}>
            <span className={styles.title}>{props.name}</span>
            <div className={styles.lastSession}>Last session: 5 minutes, 3 days ago</div>
        </div>
    );
}
