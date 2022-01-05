import React, { useState } from "react";

import {
	Select,
	MenuItem,
	FormControl,
	Modal,
	IconButton,
	Icon,
	Button,
	useToast,
	HStack,
	VStack,
	FormLabel,
	Box,
	ModalCloseButton,
	ModalContent,
} from "@chakra-ui/react";

import Topbar from "../Topbar";
import AddCard from "./AddCard";

import {
	Card,
	CardToAdd,
	createCard,
	useDecksOfCurrentUser,
	useFirestore,
} from "../../Lib/Storage";

import styles from "./Add.module.css";
import { getDoc } from "@firebase/firestore";
import { HiOutlinePlay, HiOutlineX } from "react-icons/hi";
import TopbarContainer from "@/src/Components/Topbar/TopbarContainer";
import TopbarTitle from "@/src/Components/Topbar/TopbarTitle";

const DeckComponent = require("../Deck").default;

interface State {
	selectedDeckUid: string | null;
	front: string;
	back: string;
	previewing: boolean;
}

export default function Add() {
	const { decks } = useDecksOfCurrentUser();
	const toast = useToast();
	const [previousCard, setPreviousCard] = useState<{ front: string; back: string; uid: string }>({
		front: "",
		back: "",
		uid: "",
	});

	const lastAddedToDeck = decks.sort((a, b) => {
		return (b.lastAdditionAt?.seconds || 0) - (a.lastAdditionAt?.seconds || 0);
	});

	const [state, setState] = useState<State>({
		selectedDeckUid: lastAddedToDeck[0]?.uid,
		front: "",
		back: "",
		previewing: false,
	});

	const db = useFirestore();

	return (
		<>
			<Modal
				isOpen={state.previewing}
				size={"full"}
				isCentered
				onClose={() => setState({ ...state, previewing: false })}
			>
				<ModalContent>
					<ModalCloseButton zIndex={10000} />
					<DeckComponent
						cards={[
							{
								front: state.front,
								back: state.back,
								id: -1,
								deckId: -1,
							},
						]}
						onSwipe={() => {}}
					/>
				</ModalContent>
			</Modal>

			<VStack alignItems={"stretch"}>
				<Topbar>
					<TopbarContainer>
						<TopbarTitle>Add cards</TopbarTitle>
						<HStack spacing={3}>
							<IconButton
								icon={<Icon as={HiOutlinePlay} />}
								disabled={state.front.length + state.back.length < 1}
								onClick={() => setState({ ...state, previewing: true })}
								size="lg"
								aria-label="Preview"
							/>
							<Button
								disabled={
									state.selectedDeckUid === null ||
									state.front.length < 1 ||
									state.back.length < 1
								}
								onClick={async () => {
									if (!state.selectedDeckUid) {
										return false;
									}
									const card: CardToAdd = {
										front: state.front,
										back: state.back,
										deckUid: state.selectedDeckUid,
									};
									const addedCardRef = await createCard(db, card);
									const addedCard = await getDoc(addedCardRef);
									setPreviousCard({
										...addedCard.data(),
										uid: addedCard.id,
									} as Card);
									setState({
										...state,
										front: "",
										back: "",
									});
									toast({
										render: () => {
											return (
												<Button
													size="small"
													aria-label="close"
													color="inherit"
													onClick={async () => {
														setState({
															...state,
															front: previousCard.front,
															back: previousCard.back,
														});
														// await deleteCard(previousCard.uid);
													}}
													style={{
														color: "orange",
													}}
												>
													Undo
												</Button>
											);
										},
									});
								}}
								size="lg"
							>
								Add
							</Button>
						</HStack>
					</TopbarContainer>
				</Topbar>

				<Box bg={"gray.50"} className={styles.addView}>
					<div className={styles.deckSelectContainer}>
						<FormControl className={styles.deckSelect}>
							<FormLabel htmlFor={"deck"}>Deck</FormLabel>
							<Select
								id="deck"
								displayEmpty={true}
								value={state.selectedDeckUid ?? ""}
								variant={"filled"}
								onChange={(e) => {
									setState({
										...state,
										selectedDeckUid: e.target.value as string,
									});
								}}
							>
								<option value="" disabled>
									Select a deck
								</option>
								{decks
									.sort((a, b) => {
										return (
											(b.lastAdditionAt?.seconds || 0) -
											(a.lastAdditionAt?.seconds || 0)
										);
									})
									.map((deck, i) => {
										return (
											<option
												value={deck.uid}
												key={deck.uid}
												selected={i === 0}
											>
												{deck.name}
											</option>
										);
									})}
							</Select>
						</FormControl>
					</div>

					<div className={styles.addCardContainer}>
						<AddCard
							placeholder={"Prompt"}
							onChange={(text: string) => {
								setState({
									...state,
									front: text,
								});
							}}
							value={state.front}
						/>

						<AddCard
							placeholder={"Answer"}
							onChange={(text: string) => {
								setState({
									...state,
									back: text,
								});
							}}
							value={state.back}
						/>
					</div>
				</Box>
			</VStack>
		</>
	);
}
