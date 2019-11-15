import { Link } from "react-router-dom";
import React from "react";

import styles from "./ReviewTopbar.module.css";

type ReviewTopbarProps = {
    deckName: string,
    progressIndicatorText: string
};

export default function ReviewTopbar(props: ReviewTopbarProps) {
    return <div className={styles.topbar}>
        <div className={styles.deckSelector}>
            <span className={styles.deckName}>{props.deckName}</span>
        </div>

        <div className={styles.modeSwitcher}>
            <Link to="">N</Link>/<Link to="">R</Link>
        </div>

        <div className={styles.progressIndicator}>{props.progressIndicatorText}</div>
    </div>;
}
