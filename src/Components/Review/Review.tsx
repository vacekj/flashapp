import React from "react";

import styles from "./Review.module.css";
import "./Review.css";
const Deck = require("../Deck").default;

export default class Review extends React.Component {
    render() {
        return (

            <div className={styles.reviewContainer}>
                <React.Fragment>
                    <Deck/>
                </React.Fragment>
            </div>
        );
    }
}
