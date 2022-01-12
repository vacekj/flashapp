import * as React from "react";
import { ComponentProps } from "react";
import styles from "./Topbar.module.css";
import { Box, ChakraProps } from "@chakra-ui/react";

function Topbar(props: ComponentProps<"div"> & ChakraProps) {
	return (
		<Box className={styles.topbar} bg={"white"} {...props}>
			{props.children}
		</Box>
	);
}

export default Topbar;
