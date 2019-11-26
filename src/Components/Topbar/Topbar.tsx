import * as React from "react";
import styles from "./Topbar.module.css";

import logo from "../../assets/deck.svg";
import { log } from "util";

class Topbar extends React.Component<any, any> {
    public render() {
        return (
            <div className={styles.topbar}>
                <img src={logo} alt="FlashApp Logo"/>
                {this.props.children}
            </div>
        );
    }
}

export default Topbar;
