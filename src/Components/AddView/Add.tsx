import React, { useState } from "react";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";

import Topbar from "../Topbar";
import AddCard from "./AddCard";

import { createCard, Deck } from "../../Lib/Storage";

import styles from "./Add.module.css";

import NoteAddRoundedIcon from "@material-ui/icons/NoteAddRounded";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { Dialog, IconButton, makeStyles } from "@material-ui/core";

const DeckComponent = require("../Deck").default;

const useStyles = makeStyles({
	root: { color: "black" },
	colorDisabled: { color: "grey", background: "red" },
	closeButton: {
		position: "absolute",
		right: 0,
		zIndex: 30000
	}
});

interface Props {
	decks: Deck[];
}

interface State {
	selectedDeckId: number | null;
	front: string;
	back: string;
	previewing: boolean;
}

export default function Add(props: Props) {
	const [state, setState] = useState<State>({
		selectedDeckId: null,
		front: "",
		back: "",
		previewing: false
	});

	const classes = useStyles();

	return (
		<>
			<Dialog
				open={state.previewing}
				onClose={() => setState({ ...state, previewing: false })}
				fullScreen
			>
				<IconButton classes={{
					root: classes.closeButton
				}} onClick={() => setState({ ...state, previewing: false })}>
					<CloseRoundedIcon fontSize={"large"}/>
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
								onClick={() => setState({ ...state, previewing: true })}
							>
								<PlayArrowRoundedIcon fontSize={"large"}/>
							</IconButton>
							<IconButton
								disabled={
									state.selectedDeckId === null ||
									state.front.length < 1 ||
									state.back.length < 1
								}
								onClick={async () => {
									await createCard({
										front: state.front,
										back: state.back,
										deckId: state.selectedDeckId as number,
										id: Math.floor(Math.random() * 10000)
									});
								}}
								classes={{
									root: classes.root,
									disabled: classes.colorDisabled
								}}
							>
								<NoteAddRoundedIcon fontSize={"large"}/>
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
										selectedDeckId: parseInt(e.target.value as string)
									});
								}}
							>
								<MenuItem value="" disabled>
									Select a deck
								</MenuItem>
								{props.decks.map((deck) => {
									return (
										<MenuItem value={deck.id.toString()} key={deck.id}>
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
						/>
					</div>
				</div>
				;
			</div>
		</>
	);
}
