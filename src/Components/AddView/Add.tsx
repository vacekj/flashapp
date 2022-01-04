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
} from "@chakra-ui/react";

import Topbar from "../Topbar";
import AddCard from "./AddCard";

import { Card, CardToAdd, createCard, deleteCard, useDecksOfCurrentUser } from "../../Lib/Storage";

import styles from "./Add.module.css";
import { getDoc } from "@firebase/firestore";
import { HiOutlinePlay, HiOutlineX } from "react-icons/hi";

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
	})[0];

	const [state, setState] = useState<State>({
		selectedDeckUid: lastAddedToDeck.uid,
		front: "",
		back: "",
		previewing: false,
	});

	return (
		<>
			<Modal
				isOpen={state.previewing}
				onClose={() => setState({ ...state, previewing: false })}
			>
				<IconButton
					icon={<Icon as={HiOutlineX} />}
					aria-label={"close"}
					onClick={() => setState({ ...state, previewing: false })}
					size={"lg"}
				/>
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
			</Modal>

			<div className={styles.addContainer}>
				<Topbar
					style={{
						padding: "0 0 0 12px",
					}}
				>
					<div className={styles.topbarFlex}>
						<span>Add cards</span>
						<div className={styles.iconsContainer}>
							<IconButton
								icon={<Icon as={HiOutlinePlay} />}
								disabled={state.front.length + state.back.length < 1}
								onClick={() => setState({ ...state, previewing: true })}
								size="lg"
								aria-label="Preview"
							/>
							<IconButton
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
									const addedCardRef = await createCard(card);
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
														await deleteCard(previousCard.uid);
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
								size="large"
								aria-label={"Add note"}
							/>
						</div>
					</div>
				</Topbar>

				<div className={styles.addView}>
					<div className={styles.deckSelectContainer}>
						<FormControl className={styles.deckSelect}>
							Deck
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								className={styles.deckSelectText}
								displayEmpty={true}
								autoWidth={true}
								value={state.selectedDeckUid}
								variant={"filled"}
								onChange={(e) => {
									setState({
										...state,
										selectedDeckUid: e.target.value as string,
									});
								}}
							>
								<MenuItem value="" disabled>
									Select a deck
								</MenuItem>
								{decks
									.sort((a, b) => {
										return (
											(b.lastAdditionAt?.seconds || 0) -
											(a.lastAdditionAt?.seconds || 0)
										);
									})
									.map((deck, i) => {
										return (
											<MenuItem
												value={deck.uid}
												key={deck.uid}
												selected={i === 0}
											>
												{deck.name}
											</MenuItem>
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
				</div>
			</div>
		</>
	);
}
