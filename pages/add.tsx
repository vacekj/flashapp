import styles from "../src/App.module.css";
import Add from "../src/Components/AddView";
import Bottombar from "../src/Components/Bottombar";
import React from "react";

export default function AddPage() {
	return (
		<div className={styles.main}>
			<Add />
			<Bottombar />
		</div>
	);
}
