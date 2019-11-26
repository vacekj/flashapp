import React from "react";

import styles from "./DecksView.module.css";
import sharedStyles from "../shared/shared.module.css";
import DeckCard from "./DeckCard";
import { Link } from "react-router-dom";
import { Deck } from "../../Lib/Storage";
import Topbar from "../Topbar";

interface Props {
    decks: Deck[]
}

export default function DecksView(props: Props) {
    return (
        <div className={styles.decksView}>
            <Topbar>Decks</Topbar>
            <div className={styles.decks}>
                {props.decks.map((deck, i) => {
                    return (
                        <Link to={"/decks/" + deck.id} key={i}>
                            <DeckCard deck={deck} key={deck.id}/>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
