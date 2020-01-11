import React from "react";

import styles from "./DecksView.module.css";
import DeckCard from "./DeckCard";
import { Link } from "react-router-dom";
import { Deck } from "../../Lib/Storage";
import Topbar from "../Topbar";
import Card from "../Card";
import PlusIcon from "../../assets/plus.svg";

function AddDeckCard() {
	return (
		<div
			style={{
				background: "#E2E8F0",
				borderRadius: "5px",
				margin: "15px",
				padding: "20px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<img src={PlusIcon} alt={"Add deck icon"}/>
		</div>
	);
}

interface Props {
	decks: Deck[];
}

export default function DecksView(props: Props) {
	return (
		<div className={styles.decksView}>
			<Topbar>Decks</Topbar>
			<div className={styles.decks}>
				<Card accent={true} title={"Welcome to FlashApp"}>
					Click on a deck below to start your journey.
				</Card>
				{props.decks.map((deck, i) => {
					return (
						<Link className={styles.link} to={"/decks/" + deck.id} key={i}>
							<DeckCard deck={deck} key={deck.id}/>
						</Link>
					);
				})}
				<AddDeckCard/>
			</div>
		</div>
	);
}
