import React, { useState } from "react";
import styles from "./DeckCard.module.css";
import StorageHandler, { Deck } from "../../../Lib/Storage";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeckDetail from "../DeckDetail";

interface Props {
	deck: Deck;
	score?: number /*0 to 100*/;
	onDeckDelete: (deckUid: string) => Promise<void>;
}

export default function DeckCard(props: Props) {
	const [detailOpen, setDetailOpen] = useState(false);
	return (
		<>
			<DeckDetail
				deck={props.deck}
				onDeckDelete={props.onDeckDelete}
				open={detailOpen}
				onClose={() => {
					setDetailOpen(false);
				}}
			/>
			<div className={styles.deckCard}>
				<div
					className={styles.scoreIndicator}
					style={{
						width: `${props.score ?? 30}%`,
						borderRadius: props.score === 100 ? "5px 5px 0 0" : "5px 5px 5px 0",
						opacity: `${(props.score ?? 0) + 30}%`
					}}
				/>
				<div className="flex p-4 justify-between items-center">
					<Col onClick={() => setDetailOpen(true)} className="flex-grow">
						<span className="font-semibold text-2xl">{props.deck.name}</span>
						<div className={styles.lastSession}>{props.deck.description}</div>
					</Col>
					<Col className="items-end">
						<Link to={"/decks/" + props.deck.uid}>
							<Button variant={"outlined"}>Review</Button>
						</Link>
					</Col>
				</div>
			</div>
		</>
	);
}

const Col = (props: React.ComponentProps<"div">) => (
	<div
		{...props}
		className={"flex flex-col justify-around items-start ".concat(
			props.className ?? ""
		)}
	>
		{props.children}
	</div>
);
