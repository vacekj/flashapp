import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import React from "react";
import { EmailAuthProvider, FacebookAuthProvider, GoogleAuthProvider } from "@firebase/auth";
import { useAuth } from "../src/Lib/Auth";

const uiConfig = {
	signInFlow: "popup",
	signInSuccessUrl: "/",
	signInOptions: [
		GoogleAuthProvider.PROVIDER_ID,
		FacebookAuthProvider.PROVIDER_ID,
		EmailAuthProvider.PROVIDER_ID,
	],
};
export default function () {
	const auth = useAuth();
	return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
}
