import React, { useState } from "react";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Hidden from "@mui/material/Hidden";

import Topbar from "../Topbar";
import AddCard from "./AddCard";

import { Card, CardToAdd, createCard, deleteCard, useDecksOfCurrentUser } from "../../Lib/Storage";

import styles from "./Add.module.css";

import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { Button, Dialog, IconButton, Snackbar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { getDoc } from "@firebase/firestore";

const DeckComponent = require("../Deck").default;

const useStyles = makeStyles({
	root: { color: "black" },
	colorDisabled: { color: "grey", background: "red" },
	closeButton: {
		position: "absolute",
		right: 0,
		zIndex: 30000,
	},
});

interface State {
	selectedDeckUid: string | null;
	front: string;
	back: string;
	previewing: boolean;
}

export default function Add() {
	const { decks } = useDecksOfCurrentUser();

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

	const [snackbarShown, setSnackbarShown] = useState(false);

	const classes = useStyles();

	return (
		<>
			<Dialog
				open={state.previewing}
				onClose={() => setState({ ...state, previewing: false })}
				fullScreen
			>
				<IconButton
					classes={{
						root: classes.closeButton,
					}}
					onClick={() => setState({ ...state, previewing: false })}
					size="large"
				>
					<CloseRoundedIcon fontSize={"large"} />
				</IconButton>
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
			</Dialog>

			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={snackbarShown}
				autoHideDuration={1000}
				message="Card added"
				action={
					<Button
						size="small"
						aria-label="close"
						color="inherit"
						onClick={async () => {
							setSnackbarShown(false);
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
						endIcon={<UndoRoundedIcon />}
					>
						Undo
					</Button>
				}
			/>

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
								disabled={state.front.length + state.back.length < 1}
								onClick={() => setState({ ...state, previewing: true })}
								size="large"
							>
								<PlayArrowRoundedIcon fontSize={"large"} />
							</IconButton>
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
									setSnackbarShown(true);
									setTimeout(() => setSnackbarShown(false), 3_000);
								}}
								classes={{
									root: classes.root,
									disabled: classes.colorDisabled,
								}}
								size="large"
							>
								<NoteAddRoundedIcon fontSize={"large"} />
							</IconButton>
						</div>
					</div>
				</Topbar>

				<div className={styles.addView}>
					<div className={styles.deckSelectContainer}>
						<FormControl className={styles.deckSelect}>
							<InputLabel shrink id="demo-simple-select-label">
								Deck
							</InputLabel>
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

						<Hidden smUp={true}>
							<Divider
								variant={"middle"}
								style={{
									width: "30%",
								}}
							/>
						</Hidden>

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
