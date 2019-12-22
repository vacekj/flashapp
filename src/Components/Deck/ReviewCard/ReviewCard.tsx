import * as React from "react";
import styles from "./ReviewCard.module.css";

interface State {
    flipped: boolean;
}

interface Props {
    front: string;
    back: string;
}

class ReviewCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            flipped: false
        };
    }

    onClick(evt: React.MouseEvent) {
        evt.preventDefault();
        this.setState({
            flipped: true
        });
    }

    public render() {
        return (
            <div onClick={this.onClick.bind(this)}>
                <div className={styles.front}>{this.props.front}</div>
                <div
                    className={[
                        styles.back,
                        this.state.flipped ? styles.flippedBack : ""
                    ].join(" ")}
                >
                    {this.props.back}
                </div>
            </div>
        );
    }
}

export default ReviewCard;
