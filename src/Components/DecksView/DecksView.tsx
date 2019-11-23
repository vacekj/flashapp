import React from "react";

import styles from "./DecksView.module.css";
import DeckCard from "./DeckCard";
import { Link } from "react-router-dom";
import { Deck } from "../../Lib/Storage";

interface Props {
    decks: Deck[]
}

export default function DecksView(props: Props) {
    return (
        <div>
            <div className={styles.topbar}>Decks</div>
            <div className={styles.deckView}>
                {props.decks.map((deck, i) => {
                    return (
                        <Link to={"/decks/" + deck.id} key={i}>
                            <DeckCard name={deck.name} key={deck.id}/>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
