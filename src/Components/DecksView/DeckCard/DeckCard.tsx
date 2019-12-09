import React from "react";

import styles from "./DeckCard.module.css";
import { Deck } from "../../../Lib/Storage";
import Score from "./Score";

interface Props {
    deck: Deck,
    accent?: boolean
}

export default function DeckCard(props: Props) {
    return (
        <div className={[styles.deckCard, props.accent ? styles.accent : ""].join(" ")}>
            <span className={styles.title}>{props.deck.name}</span>
            <div className={styles.lastSession}>{props.deck.description}</div>
            <Score/>
        </div>
    );
}
