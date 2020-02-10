import React from "react";
import styles from "./DeckDetail.module.css";
import StorageHandler, {Deck} from "../../../Lib/Storage";
import Button from "@material-ui/core/Button";

interface Props {
	deck: Deck;
	storageHandler: StorageHandler;
}

const DeckDetail = (props: Props) => {
	return (
		<>
			<div className={styles.container}>
				<h3 className={styles.deckName}>{props.deck.name}</h3>
			</div>
			<Button variant={"outlined"} onClick={async () => {
				await props.storageHandler.deleteDeck(props.deck.uid);
			}}>Delete</Button>
		</>
	);
};

export default DeckDetail;
