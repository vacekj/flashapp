import * as React from "react";
import {withRouter, RouteComponentProps} from "react-router-dom";
import firebase from "firebase";
import {Deck} from "../../Lib/Storage";
import Topbar from "../Topbar";
import {Button} from "@material-ui/core";
import styles from "./Profile.module.css";
import defaultUserPicture from "../../assets/defaultUserPicture.svg"

interface Props {
	firebase: firebase.app.App;
	user?: firebase.User | null;
	decks: Deck[] | null;
}

function Profile(props: Props & RouteComponentProps) {
	return (
		<main className={styles.profileView}>
			<Topbar>
				<div className={styles.topbarFlex}>
					<span>Profile</span>
					<Button onClick={async () => {
						await props.firebase.auth().signOut();
						props.history.push("/signin");
					}}>Sign out</Button>
				</div>
			</Topbar>
			<div className={styles.userInfo}>
				<img src={props.user?.photoURL ?? defaultUserPicture} alt="Profile picture" />
				<div className={styles.userName}>{props.user?.displayName ?? props.user?.email}</div>
			</div>
			<div className={styles.userStats}>
				<div className={styles.card}>
					{props.decks?.length} decks total
				</div>
			</div>
		</main>
	);
}

export default withRouter(Profile);
