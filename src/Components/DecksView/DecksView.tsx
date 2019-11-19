import React from "react";

import styles from "./DecksView.module.css";
import DeckCard from "./DeckCard";
import { Link } from "react-router-dom";

export default function DecksView() {
    const decks = [
        {
            name: "English",
            id: 1
        },
        {
            name: "Biology",
            id: 2
        }
    ];

    return (
        <div>
            <div className={styles.topbar}>Decks</div>
            <div className={styles.deckView}>
                {decks.map(deck => {
                    return (
                        <Link to={"/decks/" + deck.id}>
                            <DeckCard name={deck.name} />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
