import * as React from "react";
import NextLink from "next/link";
import { Box, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Props {
	link: string;
	name: string;
	icon: (props: React.ComponentProps<"svg">) => JSX.Element;
	active?: boolean;
}

const isCurrentPath = (path: string, currentPath: string) => {
	/*Home special case*/
	if (path === "/") {
		return currentPath.substring(currentPath.length - 1) === "/";
	}
	return currentPath.includes(path);
};

function BottombarTab(props: Props) {
	const router = useRouter();

	return (
		<NextLink href={props.link}>
			<Box as={"a"} display={"flex"} flexDir={"column"} alignItems={"center"}>
				<Icon
					cursor={"pointer"}
					transition={"all 0.1s linear"}
					_hover={{
						color: "gray.600",
					}}
					color={isCurrentPath(props.link, router.asPath) ? "blue.500" : "unset"}
					as={props.icon}
					fontSize={"3xl"}
				/>
			</Box>
		</NextLink>
	);
}

export default BottombarTab;
