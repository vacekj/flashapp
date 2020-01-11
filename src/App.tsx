import React, { Component } from "react";
import Bottombar from "./Components/Bottombar";
import Add from "./Components/AddView";
import { BrowserRouter as Router, Route, RouteComponentProps, Switch } from "react-router-dom";
import styles from "./App.module.css";
import Review from "./Components/Review";
import { createDeck, Deck, getDecks, seedDatabase } from "./Lib/Storage";
import DecksView from "./Components/DecksView";
import { NewDeck } from "./Components/AddDeckDialog/AddDeckDialog";

interface State {
	decks: Deck[] | null;
}

export default class App extends Component<{}, State> {
	constructor(props: any) {
		super(props);
		this.state = { decks: null };

		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;

		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty("--vh", `${vh}px`);

		// We listen to the resize event
		window.addEventListener("resize", () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		});
	}

	async onAddDeck({ name, description }: NewDeck) {
		await createDeck({
			name: name,
			description: description ?? "",
			id: Math.floor(Math.random() * 1000)
		});
		const decks = await getDecks();
		this.setState({
			decks: decks
		});
	}

	componentDidMount() {
		seedDatabase().then(async () => {
			const decks = await getDecks();
			this.setState({
				decks: decks
			});
		});
		// this.setState({ decks: [] });
	}

	render() {
		return (
			<Router basename={process.env.PUBLIC_URL}>
				{/* basename is here so that gh-pages routing works correctly */}
				<Switch>
					<Route
						exact
						path="/"
						children={(props: RouteComponentProps) => {
							return (
								<div className={styles.main}>
									<DecksView decks={this.state.decks} addDeckHandler={this.onAddDeck.bind(this)}/>
									<Bottombar match={props.match.path}/>
								</div>
							);
						}}
					/>
					<Route
						path="/decks/:id"
						children={(
							props: RouteComponentProps & {
								match: { params: { id: string } };
							}
						) => {
							return (
								<div className={styles.main}>
									<Review deckId={parseInt(props.match.params.id)}/>
									<Bottombar match={props.match.path}/>
								</div>
							);
						}}
					/>
					<Route
						path="/add"
						children={(props: RouteComponentProps) => {
							return (
								<div className={styles.main}>
									<Add decks={this.state.decks ?? []}/>
									<Bottombar match={props.match.path}/>
								</div>
							);
						}}
					/>
					<Route
						path="/profile"
						children={(props: RouteComponentProps) => {
							return (
								<div className={styles.main}>
									<Add decks={this.state.decks ?? []}/>
									<Bottombar match={props.match.path}/>
								</div>
							);
						}}
					/>
				</Switch>
			</Router>
		);
	}
}
