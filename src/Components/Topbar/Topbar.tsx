import * as React from "react";
import styles from "./Topbar.module.css";

class Topbar extends React.Component<any, any> {
    public render() {
        return (
            <div className={styles.topbar}>
                {this.props.children}
            </div>
        );
    }
}

export default Topbar;
