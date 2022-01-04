import * as React from "react";
import { ComponentProps } from "react";
import styles from "./Topbar.module.css";

function Topbar(props: ComponentProps<"div">) {
	return <div className={styles.topbar}>{props.children}</div>;
}

export default Topbar;
