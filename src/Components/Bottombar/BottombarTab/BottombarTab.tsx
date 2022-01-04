import * as React from "react";
import NextLink from "next/link";
import { Box, Icon } from "@chakra-ui/react";

interface Props {
	link: string;
	name: string;
	icon: (props: React.ComponentProps<"svg">) => JSX.Element;
	active?: boolean;
}

function BottombarTab(props: Props) {
	return (
		<NextLink href={props.link}>
			<Box as={"a"} display={"flex"} alignItems={"center"}>
				<Icon
					cursor={"pointer"}
					transition={"all 0.1s linear"}
					_hover={{
						color: "gray.600",
					}}
					as={props.icon}
					fontSize={"4xl"}
				/>
			</Box>
		</NextLink>
	);
}

export default BottombarTab;
