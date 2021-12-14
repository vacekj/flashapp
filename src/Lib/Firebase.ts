import { FirebaseApp, FirebaseOptions, initializeApp } from "@firebase/app";
import { createContext, useContext, useState } from "react";

const firebaseConfig = {
	apiKey: "AIzaSyCdhcK-DNwIam9Tq-iUJoekbSgPfECbUX8",
	authDomain: "flashapp-cz.firebaseapp.com",
	databaseURL: "https://flashapp-cz.firebaseio.com",
	projectId: "flashapp-cz",
	storageBucket: "flashapp-cz.appspot.com",
	messagingSenderId: "574846765511",
	appId: "1:574846765511:web:e13cc04773a7dfd609b1e2",
	measurementId: "G-1CCSX7MC9F",
};

export function useFirebaseApp() {
	const firebaseContext = useContext(FirebaseContext);
	const [firebaseApp, setFirebaseApp] = useState<FirebaseApp>(() => {
		return initializeApp(firebaseContext);
	});
	return firebaseApp;
}

export const FirebaseContext = createContext<FirebaseOptions>(firebaseConfig);
