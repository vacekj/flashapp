import * as React from "react";
import ProgressLabel from "react-progress-label";

import styles from "./Score.module.css";

class Score extends React.Component<any, any> {
    public render() {
        return (
            <div className={styles.score}>
                Score:
                <ProgressLabel
                    progress={34}
                    fillColor={"blue"}
                    trackColor="#eeeeee"
                    progressColor="#3498db"
                    progressWidth={10}
                    trackWidth={10}
                    cornersWidth={5}
                    size={30}
                />
            </div>
        );
    }
}

export default Score;
