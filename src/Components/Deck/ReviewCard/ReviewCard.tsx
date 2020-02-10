import * as React from "react";
import styles from "./ReviewCard.module.css";
import {useState} from "react";


interface Props {
	front: string;
	back: string;
}

function ReviewCard(props: Props) {
	const [flipped, setFlipped] = useState(false);

	return (
		<div onClick={() => setFlipped(!flipped)} className={styles.reviewCard}>
			<div className={styles.front}>{props.front}</div>
			<div
				className={[
					styles.back,
					flipped ? styles.flippedBack : ""
				].join(" ")}
			>
				{props.back}
			</div>
		</div>
	);
}

export default ReviewCard;
