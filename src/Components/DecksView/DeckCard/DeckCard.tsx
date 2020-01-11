import React from "react";
// @ts-ignore
import ReactStoreIndicator from "react-score-indicator";
import styles from "./DeckCard.module.css";
import { Deck } from "../../../Lib/Storage";

interface Props {
	deck: Deck;
	accent?: boolean;
}

export default function DeckCard(props: Props) {
	return (
		<div
			className={[
				styles.deckCard,
				props.accent ? styles.accent : ""
			].join(" ")}
		>
			<div className={styles.deckCardColumn}>
				<span className={styles.title}>{props.deck.name}</span>
				<div className={styles.lastSession}>
					{props.deck.description}
				</div>
			</div>
		</div>
	);
}
