import React, {Component} from "react";
import Bottombar from "./Components/Bottombar";
import Add from "./Components/AddView";
import {
	BrowserRouter as Router,
	Route,
	RouteComponentProps,
	Switch,
	Redirect
} from "react-router-dom";
import styles from "./App.module.css";
import Review from "./Components/Review";
import StorageHandler, {Deck} from "./Lib/Storage";
import DecksView from "./Components/DecksView";
import {NewDeck} from "./Components/AddDeckDialog/AddDeckDialog";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import * as firebase from "firebase";
import Profile from "./Components/Profile";

interface State {
	decks: Deck[] | null;
	firebase: firebase.app.App;
	user?: firebase.User | null;
	storageHandler: StorageHandler;
}

export default class App extends Component<{}, State> {
	constructor(props: any) {
		super(props);
		/* Initialize Firebase*/
		const firebaseConfig = {
			apiKey: "AIzaSyCdhcK-DNwIam9Tq-iUJoekbSgPfECbUX8",
			authDomain: "flashapp-cz.firebaseapp.com",
			databaseURL: "https://flashapp-cz.firebaseio.com",
			projectId: "flashapp-cz",
			storageBucket: "flashapp-cz.appspot.com",
			messagingSenderId: "574846765511",
			appId: "1:574846765511:web:e13cc04773a7dfd609b1e2",
			measurementId: "G-1CCSX7MC9F"
		};

		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig);
		}
		firebase.app().analytics();

		this.state = {
			decks: null,
			firebase: firebase.app(),
			storageHandler: new StorageHandler(firebase.app())
		};

		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
		window.addEventListener("resize", () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		});
	}

	async onAddDeck({name, description}: NewDeck) {
		try {
			await this.state.storageHandler?.createDeck({
				name: name,
				description: description ?? ""
			});
			const decks = await this.state.storageHandler?.getDecksOfCurrentUser();
			this.setState({
				decks: decks ?? []
			});
		} catch (e) {
			console.error(e);
		}
	}

	componentDidMount() {
		this.state.firebase.auth().onAuthStateChanged(async user => {
			if (!user) {
				this.setState({
					user
				});
				return;
			}
			const decks = await this.state.storageHandler?.getDecksOfCurrentUser();
			this.setState({
				decks: decks ?? [],
				user
			});
		});
	}

	render() {
		const uiConfig = {
			// Popup signin flow rather than redirect flow.
			signInFlow: "popup",
			// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
			signInSuccessUrl: "/profile",
			// We will display Google and Facebook as auth providers.
			signInOptions: [
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				firebase.auth.FacebookAuthProvider.PROVIDER_ID,
				firebase.auth.EmailAuthProvider.PROVIDER_ID
			]
		};

		return (
			<Router basename={process.env.PUBLIC_URL}>
				{this.state.user === null && <Redirect to={"/signin"} />}
				<Switch>
					<Route
						exact
						path="/"
						children={
							<div className={styles.main}>
								<DecksView
									decks={this.state.decks}
									addDeckHandler={this.onAddDeck.bind(this)}
								/>
								<Bottombar />
							</div>
						}
					/>
					<Route
						path="/decks/:uid"
						children={(
							props: RouteComponentProps & {
								match: { params: { uid: string } };
							}
						) => {
							return (
								<div className={styles.main}>
									<Review storageHandler={this.state.storageHandler}
									        deckUid={props.match.params.uid} />
									<Bottombar />
								</div>
							);
						}}
					/>
					<Route
						path="/add"
						children={
							<div className={styles.main}>
								<Add storageHandler={this.state.storageHandler} decks={this.state.decks ?? []} />
								<Bottombar />
							</div>
						}
					/>
					<Route
						path="/profile"
						children={
							<div className={styles.main}>
								<Profile
									firebase={this.state.firebase}
									user={this.state.user}
									decks={this.state.decks}
								/>
								<Bottombar />
							</div>
						}
					/>
					<Route
						path="/signin"
						component={() => (
							<div>
								<StyledFirebaseAuth
									uiConfig={uiConfig}
									firebaseAuth={this.state.firebase.auth()}
								/>
							</div>
						)}
					/>
					<Route
						path={"/signout"}
						component={() => {
							this.state.firebase.auth().signOut();
							return <Redirect to={"/signin"} />;
						}}
					/>
				</Switch>
			</Router>
		);
	}
}
