import React from "react";

import styles from "./Review.module.css";

import ReviewTopbar from "./ReviewTopbar";
import StorageHandler, { Deck, Card } from "../../Lib/Storage";

const DeckComponent = require("../Deck").default;

interface Props {
	deckUid: string;
	storageHandler: StorageHandler;
}

interface State {
	deck: Deck;
	cards: Card[];
}

export default class Review extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			deck: {
				uid: props.deckUid,
				name: "Loading",
				description: "Loading..."
			} as Deck,
			cards: [
				{
					front: "Loading...",
					back: "Please wait"
				} as Card
			]
		};
	}

	componentDidMount(): void {
		this.props.storageHandler.getDeckByUid(this.props.deckUid).then(deck => {
			this.props.storageHandler.getCardsOfDeck(this.props.deckUid).then(cards => {
				this.setState({
					cards,
					deck: deck.data() as Deck
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

				<div className={styles.reviewContainer} >
					<>
						<DeckComponent
							onSwipe={this.onSwipe.bind(this)}
							cards={this.state.cards}
						/>
					</>
				</div >
			</div >
		);
	}
}
