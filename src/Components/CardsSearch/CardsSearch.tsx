import React from "react";
import Topbar from "../Topbar";
import StorageHandler, { Card, Deck } from "../../Lib/Storage";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Link } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";

interface State {
	cards: Card[] | null;
}

interface Props {
	storageHandler: StorageHandler;
	decks: Deck[] | null;
}

class CardsSearch extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			cards: null
		};
	}

	componentDidMount(): void {
		this.props.decks &&
		Promise.all(
			this.props.decks.map(deck => this.props.storageHandler.getCardsOfDeck(deck.uid))
		)
			.then(arrays => arrays.flat())
			.then(cards => this.setState({ cards }))
			.catch(e => console.error(e));
	}

	render() {
		return (
			<div className="bg-indigo-100">
				<Topbar className="flex justify-between items-center bg-white">
					Cards
					<Link to={"/add"} className="flex items-center">
						<AddRoundedIcon fontSize={"large"} />
					</Link>
				</Topbar>
				<div className="flex flex-col justify-around">
					{this.state.cards === null &&
					Array(3).fill(1).map((_, key) => (
						<div
							className="flex flex-col items-center justify-around rounded-lg shadow bg-white text-gray-700 p-4 m-3 mb-0 text-lg text-center">
							<Skeleton variant="text" height={30} width={120} />
							<Skeleton variant="text" height={30} width={120} />
						</div>
					))}
					{this.state.cards &&
					this.state.cards.map(card => (
						<div
							className="flex flex-col items-center justify-around rounded-lg shadow bg-white text-gray-700 p-4 m-3 mb-0 text-lg text-center">
							<div className="py-3" style={{ borderBottom: "solid 1px #cdcdcd" }}>
								{card.front}
							</div>
							<div className="py-3">{card.back}</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default CardsSearch;
