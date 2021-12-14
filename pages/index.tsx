import React, { useEffect } from "react";
import Bottombar from "../src/Components/Bottombar";
import styles from "../src/App.module.css";
import { DecksView } from "../src/Components/DecksView/DecksView";
import { useDecksOfCurrentUser } from "../src/Lib/Storage";
import { useUser } from "../src/Lib/Auth";
import { useRouter } from "next/router";

export default function Index() {
	useEffect(() => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
		window.addEventListener("resize", () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		});
	}, []);

	const { user, loading, signOut } = useUser();
	const { decks } = useDecksOfCurrentUser();

	const router = useRouter();
	if (!loading && !user) {
		router.push("/signin");
	}

	return (
		<div className={styles.main}>
			<DecksView />
			<Bottombar />
		</div>
	);
}
