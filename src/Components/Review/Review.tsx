import React from "react";

import styles from "./Review.module.css";
import "./Review.css";
import { Link } from "react-router-dom";

import ReviewTopbar from "./ReviewTopbar";

const Deck = require("../Deck").default;

export default class Review extends React.Component {
    render() {
        return (
            <div>
                <ReviewTopbar progressIndicatorText={"15"} deckName={"English 1"}/>

                <div className={styles.reviewContainer}>
                    <div className={styles.deckContainer}>
                        <React.Fragment>
                            <Deck/>
                        </React.Fragment>
                    </div>
                </div>
            </div>
        );
    }
}
