import React from 'react';
import {
    Link
} from "react-router-dom";

import "./Review.css";
import Card from "../Card";

export default class Review extends React.Component {
    render() {
        return (
            <div className={"review-container"}>
                <Card front={"Ahoj"} back={"Čau"}/>
            </div>
        );
    }
}
