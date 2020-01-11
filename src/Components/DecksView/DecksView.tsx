import React from "react";

import styles from "./DecksView.module.css";
import DeckCard from "./DeckCard";
import { Link } from "react-router-dom";
import { Deck } from "../../Lib/Storage";
import Topbar from "../Topbar";
import Card from "../Card";
import PlusIcon from "../../assets/plus.svg";
import AddDeckDialog from "../AddDeckDialog";
import { NewDeck } from "../AddDeckDialog/AddDeckDialog";
import { Skeleton } from "@material-ui/lab";

function AddDeckCard(props: { onClick: (e: React.SyntheticEvent<HTMLDivElement>) => void }) {
	return (
		<div
			style={{
				background: "#E2E8F0",
				borderRadius: "5px",
				margin: "15px",
				padding: "20px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}}
			onClick={props.onClick}
		>
			<img src={PlusIcon} alt={"Add deck icon"}/>
		</div>
	);
}

interface Props {
	decks: Deck[] | null;
	addDeckHandler: (newDeck: NewDeck) => void;
}

interface State {
	dialogOpen: boolean;
}

export default class DecksView extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			dialogOpen: false
		};
	}

	openDialog() {
		this.setState({
			dialogOpen: true
		});
	}

	closeDialog() {
		this.setState({
			dialogOpen: false
		});
	}

	renderDecks(decks: Deck[]) {
		return decks.length > 0 ?
			decks.map((deck, i) => {
				return (
					<Link className={styles.link} to={"/decks/" + deck.id} key={i}>
						<DeckCard deck={deck} key={deck.id}/>
					</Link>
				);
			})
			: (
				<div>No decks</div>
			);
	}

	render() {
		return (
			<>
				<AddDeckDialog
					open={this.state.dialogOpen}
					onSave={this.props.addDeckHandler}
					onClose={this.closeDialog.bind(this)}
				/>
				<div className={styles.decksView}>
					<Topbar>Decks</Topbar>
					<div className={styles.decks}>
						<Card accent={true} title={"Welcome to FlashApp"}>
							Click on a deck below to start your journey.
						</Card>
						{this.props.decks !== null ? (
							this.renderDecks(this.props.decks)
						) : (
							<div className={styles.skeletonCard}>
								<Skeleton variant="text" height={30} width={120}/>
								<Skeleton variant="text" width={300}/>
							</div>
						)}
						<AddDeckCard onClick={this.openDialog.bind(this)}/>
					</div>
				</div>
			</>
		);
	}
}
