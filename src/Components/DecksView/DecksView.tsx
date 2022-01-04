import React, { useState } from "react";

import styles from "./DecksView.module.css";
import DeckCard from "./DeckCard";
import { Deck, DECKS_COLLECTION, useDecksOfCurrentUser, useFirestore } from "../../Lib/Storage";
import Topbar from "../Topbar";
import { HiOutlinePlus, HiPlus } from "react-icons/hi";
import AddDeckDialog from "../AddDeckDialog";
import { addDoc, collection, deleteDoc, doc, setDoc, Timestamp } from "@firebase/firestore";
import { Box, Button, ChakraProps, Icon, VStack } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/react";
import { useAuth } from "@/src/Lib/Auth";

function AddDeckCard(props: React.ComponentProps<"button">) {
	return (
		<Button
			rightIcon={<Icon as={HiPlus} />}
			textAlign={"center"}
			variant={"ghost"}
			fontSize={"xl"}
			onClick={props.onClick}
		>
			Add Deck
		</Button>
	);
}

function renderDecks(decks: Deck[]) {
	const db = useFirestore();

	return decks.length > 0 ? (
		decks.map((deck, i) => {
			return (
				<Box w="full" key={i}>
					<DeckCard
						deck={deck}
						onDeckDelete={async (deckUid: string) => {
							await deleteDoc(doc(db, DECKS_COLLECTION, deckUid));
						}}
					/>
				</Box>
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
	const auth = useAuth();
	return (
		<>
			<AddDeckDialog
				open={dialogOpen}
				onSave={async (deck) => {
					await addDoc(collection(db, DECKS_COLLECTION), {
						...deck,
						ownerUid: auth.currentUser.uid,
						createdAt: Timestamp.now(),
						updatedAt: Timestamp.now(),
					});
					setDialogOpen(false);
				}}
				onClose={() => setDialogOpen(false)}
			/>
			<div className="flex flex-col">
				<Topbar>Decks</Topbar>
				<div className="overflow-x-hidden h-full bg-indigo-100">
					{decks !== null ? (
						<VStack mt={3} spacing={3}>
							{renderDecks(decks)}
							<AddDeckCard onClick={() => setDialogOpen(true)} />
						</VStack>
					) : (
						<div className={styles.skeletonCard}>
							<Skeleton variant="text" height={30} width={120} />
							<Skeleton variant="text" width={300} />
						</div>
					)}
				</div>
			</div>
		</>
	);
}
