import * as React from "react";
import { ComponentProps } from "react";
import styles from "./Topbar.module.css";
import { Box } from "@chakra-ui/react";

function Topbar(props: ComponentProps<"div">) {
	return (
		<Box className={styles.topbar} bg={"white"}>
			{props.children}
		</Box>
	);
}

export default Topbar;
