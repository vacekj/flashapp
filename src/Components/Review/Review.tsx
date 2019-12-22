import React from "react";

import styles from "./Review.module.css";

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

    onSwipe({ index, direction }: { index: number, direction: number }) {
        console.log(`Card swiped. Index: ${index} | Direction: ${direction}`);
    }

    render() {
        return (
            <div style={{
                height: "92vh"
            }}>
                <ReviewTopbar
                    progressIndicatorText={"15"}
                    deckName={this.state.deck.name}
                />

                <div className={styles.reviewContainer}>
                    <React.Fragment>
                        <DeckComponent onSwipe={this.onSwipe.bind(this)}/>
                    </React.Fragment>
                </div>
            </div>
        );
    }
}
