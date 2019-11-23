import React from "react";

import styles from "./Review.module.css";
import "./Review.css";

import ReviewTopbar from "./ReviewTopbar";
import { Deck, getDeck } from "../../Lib/Storage";

const DeckComponent = require("../Deck").default;

interface Props {
    deckId: number;
}

interface State {
    deck: Deck
}

export default class Review extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            deck: {
                id: props.deckId,
                name: "Loading",
                description: "Loading..."
            }
        };
    }

    componentDidMount(): void {
        getDeck(this.state.deck.id).then((deck) => {
            this.setState({
                deck: deck
            });
        });
    }

    render() {
        return (
            <div>
                <ReviewTopbar
                    progressIndicatorText={"15"}
                    deckName={this.state.deck.name}
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
