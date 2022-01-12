import styles from "@/src/App.module.css";
import Profile from "@/src/Components/Profile";
import Bottombar from "@/src/Components/Bottombar";
import React from "react";

export default function () {
	return (
		<div className={styles.main}>
			<Profile />
			<Bottombar />
		</div>
	);
}
