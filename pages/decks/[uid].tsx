import styles from "../../src/App.module.css";
import Review from "../../src/Components/Review";
import Bottombar from "../../src/Components/Bottombar";
import React from "react";
import { useRouter } from "next/router";

export default function DeckPage() {
	const router = useRouter();
	return (
		<div className={styles.main}>
			<Review deckUid={router.query.uid as string} />
			<Bottombar />
		</div>
	);
}
