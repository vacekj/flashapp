import React from 'react';
import {
    Link
} from "react-router-dom";

import "./Review.css";
import Card from "../Card";

export default class Review extends React.Component {
    render() {
        return (
            <Card front={"Ahoj"} back={"Čau"}/>
        );
    }
}
