import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Deck } from "../../../Lib/Storage";

interface Props {
	deck: Deck;
	open: boolean;
	onClose: () => void;
	onDeckDelete: (deckUid: string) => Promise<void>;
}

const DeckDetail = (props: Props) => {
	return (
		<Dialog open={props.open} onClose={props.onClose}>
			<DialogTitle>{props.deck.name}</DialogTitle>
			<DialogContent className="p-5">
				<div>{props.deck.description}</div>

				<div className="flex justify-around">
					<span className="m-5 ml-0 text-gray-600">
						Created at: {props.deck.createdAt.toDate().toLocaleDateString()}
					</span>

					{props.deck.lastAdditionAt && (
						<span>
							Last added to:
							{props.deck.lastAdditionAt?.toDate().toLocaleDateString()}
						</span>
					)}
				</div>

				<Button
					variant={"outlined"}
					color={"secondary"}
					onClick={() => props.onDeckDelete(props.deck.uid)}
					style={{
						marginBottom: "1.25rem",
					}}
				>
					Delete deck
					<DeleteIcon />
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default DeckDetail;
