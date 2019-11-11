import React from "react";

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
    }

    render() {
        return (
            <div className={"card"} onClick={this.flip.bind(this)}>
                <div
                    className={"front " + (this.state.flipped ? "hidden" : "")}
                >
                    {this.state.front}
                </div>
                <div
                    className={"back " + (this.state.flipped ? "" : "hidden")}
                >
                    {this.state.back}
                </div>
            </div>
        );
    }

    flip() {
        if (this.state.flipped) {
            /* TODO: next card */
        }
        this.setState({
            flipped: !this.state.flipped
        });
    }


}
