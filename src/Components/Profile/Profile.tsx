import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import firebase from "firebase";
import { Deck } from "../../Lib/Storage";
import Topbar from "../Topbar";
import { Button } from "@material-ui/core";
import styles from "./Profile.module.css";
import defaultUserPicture from "../../assets/defaultUserPicture.svg";

interface Props {
	firebase: firebase.app.App;
	user?: firebase.User | null;
	decks: Deck[] | null;
}

function Profile(props: Props & RouteComponentProps) {
	return (
		<main className="flex flex-1 flex-col bg-indigo-100">
			<Topbar>
				<div className={styles.topbarFlex}>
					<span>Profile</span>
					<Button
						onClick={async () => {
							await props.firebase.auth().signOut();
							props.history.push("/signin");
						}}
					>
						Sign out
					</Button>
				</div>
			</Topbar>

			<div className="flex flex-col rounded-lg shadow p-5 m-3 bg-white">
				<div className="flex mb-3">
					<img
						className="mr-4 rounded-full h-16 border border-solid border-gray-700"
						src={props.user?.photoURL ?? defaultUserPicture}
						alt={"Profile"}
					/>
					<div className="w-2/3 flex flex-col justify-center">
						<div className="font-semibold text-xl">
							{props.user?.displayName ?? props.user?.email}
						</div>
						{props.user?.displayName && (
							<div className="text-gray-700">{props.user?.email}</div>
						)}
					</div>
				</div>

				<div>
					<div className="text-sm text-gray-700 leading-snug">
						Member since: {props.user?.metadata.creationTime}
					</div>
					<div className="text-sm text-gray-700 leading-snug">
						Last sign-in: {props.user?.metadata.creationTime}
					</div>
				</div>
			</div>

			<div className="flex flex-col justify-start">
				<div className="m-3 mt-0 text-white rounded p-5 bg-indigo-500">
					{props.decks?.length} decks total
				</div>
			</div>
		</main>
	);
}

export default withRouter(Profile);
