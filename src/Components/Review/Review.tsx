import React from "react";

import styles from "./Review.module.css";

import ReviewTopbar from "./ReviewTopbar";
import { Deck, Card, useDeckByUid, useCardsOfDeck } from "../../Lib/Storage";

const DeckComponent = require("../Deck").default;

interface Props {
	deckUid: string;
}

export default function Review(props: Props) {
	const { deck } = useDeckByUid(props.deckUid);
	const { cards } = useCardsOfDeck(props.deckUid);
	return (
		<div
			style={{
				height: "92vh",
			}}
		>
			<ReviewTopbar
				progressIndicatorText={deck ? cards?.length + " cards left" : ""}
				deckName={deck?.name ?? "Loading"}
			/>

			<div className={styles.reviewContainer}>
				<DeckComponent cards={cards ?? []} />
			</div>
		</div>
	);
}
