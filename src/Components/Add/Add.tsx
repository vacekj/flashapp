import React from "react";

import Topbar from "../Topbar";
import styles from "./Add.module.css";
import { Deck } from "../../Lib/Storage";

interface Props {
    decks: Deck[];
}

export default function Add(props: Props) {
    return (
        <div className={styles.addContainer}>
            <Topbar>Add cards</Topbar>
            <div className={styles.addView}>
                <form>
                    <div className={styles.deckSelect}>
                        Deck:
                        <select placeholder={"Select a deck"}>
                            {props.decks.map(deck => {
                                return (
                                    <option value={deck.id.toString()} key={deck.id}>
                                        {deck.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={styles.cardFields}>
                        {/* TODO: tady udělat kartu stejně jako při review,
                        možná rozdělenou čarou na front/back,
                        nebo dvě karty*/}
                        
                        <textarea placeholder={"Front"} id={"front"}/>
                        <textarea placeholder={"Back"} id={"back"}/>
                    </div>
                </form>
            </div>
        </div>
    );
}
