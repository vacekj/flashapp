import * as React from "react";
import styles from "./Topbar.module.css";

import { ComponentProps } from "react";

function Topbar(props: ComponentProps<"div">) {
	return (
		<div className={styles.topbar} {...props}>
			{/*<img src={logo} alt="FlashApp Logo"/>*/}
			{props.children}
		</div>
	);
}

export default Topbar;
