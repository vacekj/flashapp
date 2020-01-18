import React, {useState} from "react";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";

import Topbar from "../Topbar";
import AddCard from "./AddCard";

import StorageHandler, {Card, CardToAdd, Deck} from "../../Lib/Storage";

import styles from "./Add.module.css";

import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import UndoRoundedIcon from "@material-ui/icons/UndoRounded";
import {Button, Dialog, IconButton, makeStyles, Snackbar} from "@material-ui/core";

const DeckComponent = require("../Deck").default;

const useStyles = makeStyles({
	root: {color: "black"},
	colorDisabled: {color: "grey", background: "red"},
	closeButton: {
		position: "absolute",
		right: 0,
		zIndex: 30000
	}
});

interface Props {
	decks: Deck[];
	storageHandler: StorageHandler;
}

interface State {
	selectedDeckUid: string | null;
	front: string;
	back: string;
	previewing: boolean;
}

export default function Add(props: Props) {
	const [previousCard, setPreviousCard] = useState<{ front: string, back: string, uid: string }>({
		front: "",
		back: "",
		uid: ""
	});
	const [state, setState] = useState<State>({
		selectedDeckUid: null,
		front: "",
		back: "",
		previewing: false
	});

	const [snackbarShown, setSnackbarShown] = useState(false);

	const classes = useStyles();

	return (
		<>
			<Dialog
				open={state.previewing}
				onClose={() => setState({...state, previewing: false})}
				fullScreen
			>
				<IconButton
					classes={{
						root: classes.closeButton
					}}
					onClick={() => setState({...state, previewing: false})}
				>
					<CloseRoundedIcon fontSize={"large"} />
				</IconButton>
				<DeckComponent
					cards={[
						{
							front: state.front,
							back: state.back,
							id: -1,
							deckId: -1
						}
					]}
					onSwipe={() => {
					}}
				/>
			</Dialog>

			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center"
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
								back: previousCard.back
							});
							await props.storageHandler.deleteCard(previousCard.uid);
						}}
						style={{
							color: "orange"
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
						padding: "0 0 0 12px"
					}}
				>
					<div className={styles.topbarFlex}>
						<span>Add cards</span>
						<div className={styles.iconsContainer}>
							<IconButton
								disabled={state.front.length + state.back.length < 1}
								onClick={() => setState({...state, previewing: true})}
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
										deckUid: state.selectedDeckUid
									};
									const addedCardRef = await props.storageHandler.createCard(card);
									const addedCard = await addedCardRef.get();
									setPreviousCard({
										...addedCard.data(),
										uid: addedCard.id
									} as Card);
									setState({
										...state,
										front: "",
										back: ""
									});
									setSnackbarShown(true);
									setTimeout(() => setSnackbarShown(false), 3_000);
								}}
								classes={{
									root: classes.root,
									disabled: classes.colorDisabled
								}}
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
								defaultValue={""}
								onChange={e => {
									setState({
										...state,
										selectedDeckUid: e.target.value as string
									});
								}}
							>
								<MenuItem value="" disabled>
									Select a deck
								</MenuItem>
								{props.decks.map(deck => {
									return (
										<MenuItem value={deck.uid} key={deck.uid}>
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
									front: text
								});
							}}
							value={state.front}
						/>

						<Hidden smUp={true}>
							<Divider
								variant={"middle"}
								style={{
									width: "30%"
								}}
							/>
						</Hidden>

						<AddCard
							placeholder={"Answer"}
							onChange={(text: string) => {
								setState({
									...state,
									back: text
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
