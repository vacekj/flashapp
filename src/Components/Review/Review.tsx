import React from "react";

import "./Review.css";
const Deck = require("../Deck").default;

export default class Review extends React.Component {
    render() {
        return (
            <div className={"review-container"}>
                <React.Fragment>
                    <Deck/>
                </React.Fragment>
            </div>
        );
    }
}
