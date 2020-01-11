import React from "react";
import styles from "./DeckCard.module.css";
import { Deck } from "../../../Lib/Storage";

interface Props {
	deck: Deck;
	score?: number;/*0 to 100*/
}

export default function DeckCard(props: Props) {
	return (
		<div className={styles.deckCard}>
			<div className={styles.scoreIndicator} style={{
				width: `${props.score ?? 30}%`,
				borderRadius: props.score === 100 ? "5px 5px 0 0" : "5px 5px 5px 0",
				opacity: `${(props.score ?? 0) + 30}%`
			}}/>
			<div className={styles.deckCardColumn}>
				<span className={styles.title}>{props.deck.name}</span>
				<div className={styles.lastSession}>{props.deck.description}</div>
			</div>
		</div>
	);
}
