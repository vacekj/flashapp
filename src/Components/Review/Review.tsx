import React from "react";

import styles from "./Review.module.css";
import "./Review.css";

import ReviewTopbar from "./ReviewTopbar";

const DeckComponent = require("../Deck").default;

type Deck = {
    name: string;
    id: number;
};

interface Props {
    deckId: number;
}

export default class Review extends React.Component<Props, Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            deckId: props.deckId
        };
    }

    getDeck(id?: number): Deck {
        if (id == undefined) {
            return {
                name: "No deck selected",
                id: 0
            };
        }
        const decks: Deck[] = [
            {
                name: "English",
                id: 1
            },
            {
                name: "Biology",
                id: 2
            }
        ];

        // @ts-ignore
        return decks.find(d => d.id == id);
    }

    render() {
        const deck = this.getDeck(this.state.deckId);

        return (
            <div>
                <ReviewTopbar
                    progressIndicatorText={"15"}
                    deckName={deck.name}
                />

                <div className={styles.reviewContainer}>
                    <div className={styles.deckContainer}>
                        <React.Fragment>
                            <DeckComponent/>
                        </React.Fragment>
                    </div>
                </div>
            </div>
        );
    }
}
