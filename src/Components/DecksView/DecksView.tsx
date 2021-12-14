import React, { useState } from "react";

import styles from "./DecksView.module.css";
import DeckCard from "./DeckCard";
import { Deck, DECKS_COLLECTION, useDecksOfCurrentUser, useFirestore } from "../../Lib/Storage";
import Topbar from "../Topbar";
import PlusIcon from "../../assets/plus.svg";
import AddDeckDialog from "../AddDeckDialog";
import { NewDeck } from "../AddDeckDialog/AddDeckDialog";
import { Skeleton } from "@mui/material";
import { useFirebaseApp } from "../../Lib/Firebase";
import { addDoc, collection, deleteDoc, doc, setDoc } from "@firebase/firestore";

function AddDeckCard(props: { onClick: (e: React.SyntheticEvent<HTMLDivElement>) => void }) {
	return (
		<div
			style={{
				background: "#e0ecff",
				borderRadius: "5px",
				margin: "15px",
				padding: "20px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
			onClick={props.onClick}
		>
			<img src={PlusIcon} alt={"Add deck icon"} />
		</div>
	);
}
function renderDecks(decks: Deck[]) {
	const db = useFirestore();

	return decks.length > 0 ? (
		decks.map((deck, i) => {
			return (
				<div className="w-full" key={i}>
					<DeckCard
						deck={deck}
						onDeckDelete={async (deckUid: string) => {
							await deleteDoc(doc(db, DECKS_COLLECTION, deckUid));
						}}
					/>
				</div>
			);
		})
	) : (
		<div className={styles.noDecks}>
			I see no decks. Why not add one using the button below?
		</div>
	);
}

export function DecksView() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const db = useFirestore();
	const { decks } = useDecksOfCurrentUser();
	return (
		<>
			<AddDeckDialog
				open={dialogOpen}
				onSave={async (deck) => {
					await addDoc(collection(db, DECKS_COLLECTION), deck);
				}}
				onClose={() => setDialogOpen(false)}
			/>
			<div className="flex flex-col">
				<Topbar>Decks</Topbar>
				<div className="overflow-x-hidden h-full bg-indigo-100">
					{decks !== null ? (
						renderDecks(decks)
					) : (
						<div className={styles.skeletonCard}>
							<Skeleton variant="text" height={30} width={120} />
							<Skeleton variant="text" width={300} />
						</div>
					)}
					<AddDeckCard onClick={() => setDialogOpen(true)} />
				</div>
			</div>
		</>
	);
}
