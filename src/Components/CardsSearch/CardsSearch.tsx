import React, { useState } from "react";
import Topbar from "../Topbar";
import StorageHandler, { Card, Deck } from "../../Lib/Storage";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Link } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";

interface State {
	cards: Card[] | null;
	filter: string;
}

interface Props {
	storageHandler: StorageHandler;
	decks: Deck[] | null;
}

class CardsSearch extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			cards: null,
			filter: ""
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
					<Search
						onSubmit={value =>
							this.setState({
								filter: value
							})
						}
					/>
					{this.state.cards === null &&
						Array(3)
							.fill(1)
							.map((_, key) => (
								<div
									key={key}
									className="flex flex-col items-center justify-around rounded-lg shadow bg-white text-gray-700 p-4 m-3 mb-0 text-lg text-center"
								>
									<Skeleton variant="text" height={30} width={120} />
									<Skeleton variant="text" height={30} width={120} />
								</div>
							))}
					{this.state.cards &&
						this.state.cards
							.filter(card => {
								if (this.state.filter === "") {
									return true;
								}

								return (
									card.front.includes(this.state.filter) ||
									card.back.includes(this.state.filter)
								);
							})
							.map(card => (
								<div
									className="flex flex-col items-center justify-around rounded-lg shadow bg-white text-gray-700 p-4 m-3 mb-0 text-lg text-center"
									key={card.uid}
								>
									<div className="py-3 border-b border-solid border-gray-200">
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

interface SearchProps {
	onSubmit: (value: string) => void;
}

function Search(props: SearchProps) {
	const [value, setValue] = useState("");
	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				props.onSubmit(value);
			}}
			className="m-3 p-3 rounded bg-white flex justify-between items-center shadow hover:shadow-md"
		>
			<input
				type="text"
				onChange={e => {
					setValue(e.target.value);
					props.onSubmit(e.target.value);
				}}
				value={value}
				className="flex-grow outline-none"
			/>
			<SearchRoundedIcon onClick={() => props.onSubmit(value)} className="text-gray-600" />
		</form>
	);
}

export default CardsSearch;
