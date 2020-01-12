import * as React from "react";
import {Redirect, withRouter, RouteComponentProps} from "react-router-dom";
import firebase from "firebase";
import {Deck} from "../../Lib/Storage";
import Topbar from "../Topbar";
import {Button} from "@material-ui/core";

interface Props {
	firebase: firebase.app.App;
	user?: firebase.User | null;
	decks: Deck[] | null;
}

function Profile(props: Props & RouteComponentProps) {
	/* User not registered or not logged in */
	if (props.user === null) {
		return <Redirect to={"/signin"} />;
	}
	return (
		<div>
			<Topbar>Profile</Topbar>
			{props.user ? <> Hello {props.user?.displayName || props.user?.email}!</> : "Loading"}
			<Button onClick={async () => {
				await props.firebase.auth().signOut();
				alert("signed out");
				props.history.push("/signin");
			}}>Sign out</Button>
		</div>
	);
}

export default withRouter(Profile);
