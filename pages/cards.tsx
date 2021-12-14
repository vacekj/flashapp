import styles from "../src/App.module.css";
import CardsSearch from "../src/Components/CardsSearch";
import Bottombar from "../src/Components/Bottombar";
import React from "react";

export default function CardsPage() {
	return (
		<div className={styles.main}>
			<CardsSearch />
			<Bottombar />
		</div>
	);
}
