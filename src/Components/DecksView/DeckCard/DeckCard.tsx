import React from "react";

import styles from "./DeckCard.module.css";
import { Deck } from "../../../Lib/Storage";

interface Props {
    deck: Deck
}

export default function DeckCard(props: Props) {
    return (
        <div className={styles.deckCard}>
            <span className={styles.title}>{props.deck.name}</span>
            <div className={styles.lastSession}>{props.deck.description}</div>
        </div>
    );
}
