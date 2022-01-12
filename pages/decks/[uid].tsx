import styles from "../../src/App.module.css";
import Bottombar from "../../src/Components/Bottombar";
import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const DynamicReview = dynamic(() => import("@/src/Components/ReviewPage"), { ssr: false });

export default function DeckPage() {
	const router = useRouter();
	return (
		<div className={styles.main}>
			<DynamicReview deckUid={router.query.uid as string} />
		</div>
	);
}
