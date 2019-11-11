import React from "react";
import {Link} from "react-router-dom";

import "./Card.css";

type State = { front: string; back: string; flipped: boolean };

export default class Card extends React.Component<{ front: string; back: string },
    State> {
    constructor(props: { front: string; back: string }) {
        super(props);
        this.state = {
            front: props.front,
            back: props.back,
            flipped: false
        };

        this.flip = this.flip.bind(this);
    }

    render() {
        return (
            <div>
                <div
                    className={"front " + (this.state.flipped ? "hidden" : "")}
                    onClick={this.flip}
                >
                    {this.state.front}
                </div>
                <div
                    className={"back " + (this.state.flipped ? "" : "hidden")}
                    onClick={this.flip}
                >
                    {this.state.back}
                </div>
            </div>
        );
    }

    flip() {
        this.setState({
            flipped: !this.state.flipped
        });
    }
}
