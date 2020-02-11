import * as React from "react";
import styles from "./Topbar.module.css";

import { ComponentProps } from "react";

function Topbar(props: ComponentProps<"div">) {
	return (
		<div {...props} className={styles.topbar.concat(" " + props.className)}>
			{props.children}
		</div>
	);
}

export default Topbar;
