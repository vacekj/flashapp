import { Text } from "@chakra-ui/react";
import React from "react";

export default function (props: { children: React.ReactNode }) {
	return (
		<Text fontSize={"3xl"} fontWeight={"medium"}>
			{props.children}
		</Text>
	);
}
