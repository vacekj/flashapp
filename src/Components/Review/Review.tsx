import React from "react";

import styles from "./Review.module.css";
import "./Review.css";
import { Link } from "react-router-dom";

const Deck = require("../Deck").default;

export default class Review extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.topbar}>
                    <div className={styles.deckSelector}>
                        <span className={styles.deckName}>
                            English 1
                        </span>
                    </div>

                    <div className={styles.modeSwitcher}>
                        <Link to="">
                            N
                        </Link>
                        /
                        <Link to="">
                            R
                        </Link>
                    </div>

                    <div className={styles.progressIndicator}>
                        15
                    </div>
                </div>

                <div className={styles.reviewContainer}>
                    <React.Fragment>
                        <Deck/>
                    </React.Fragment>
                </div>
            </div>

        );
    }
}
