import React from "react";

import styles from "./Review.module.css";

import ReviewTopbar from "./ReviewTopbar";
import { Deck, getDeck, getCardsOfDeck, Card } from "../../Lib/Storage";

const DeckComponent = require("../Deck").default;

interface Props {
    deckId: number;
}

interface State {
    deck: Deck;
    cards: Card[];
}

interface onSwipeArgs {
}

export default class Review extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            deck: {
                id: props.deckId,
                name: "Loading",
                description: "Loading..."
            },
            cards: [
                {
                    front: "Loading...",
                    back: "Please wait",
                    id: -1,
                    deckId: -1
                }
            ]
        };
    }

    componentDidMount(): void {
        getDeck(this.state.deck.id).then(deck => {
            getCardsOfDeck(deck.id).then(cards => {
                this.setState({
                    deck,
                    cards: cards.length ? cards : []
                });
            });
        });
    }

    onSwipe({ index, direction, cardId }: { index: number; direction: number, cardId: number }) {
        console.log(`Card swiped. Index: ${index} | Direction: ${direction} | cardId: ${cardId}`);
    }

    render() {
        return (
            <div
                style={{
                    height: "92vh"
                }}
            >
                <ReviewTopbar
                    progressIndicatorText={"15"}
                    deckName={this.state.deck.name}
                />

                <div className={styles.reviewContainer}>
                    <React.Fragment>
                        <DeckComponent
                            onSwipe={this.onSwipe.bind(this)}
                            cards={this.state.cards}
                        />
                    </React.Fragment>
                </div>
            </div>
        );
    }
}
