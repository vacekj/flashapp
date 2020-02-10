import React from "react";
import StorageHandler, {Deck} from "../../../Lib/Storage";
import Button from "@material-ui/core/Button";
import {Dialog} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

interface Props {
	deck: Deck;
	open: boolean;
	onClose: () => void;
	onDeckDelete: (deckUid: string) => Promise<void>;
}

const DeckDetail = (props: Props) => {
	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}
		>
			<DialogTitle>
				<h3>{props.deck.name}</h3>
			</DialogTitle>
			<DialogContent>
				<Button variant={"outlined"} onClick={() => props.onDeckDelete(props.deck.uid)}>
					Delete
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default DeckDetail;
