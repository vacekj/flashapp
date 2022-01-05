import { HStack } from "@chakra-ui/react";

export default function TopbarContainer(props: { children: React.ReactNode }) {
	return (
		<HStack p={2} px={4} justifyContent={"space-between"} alignItems={"center"}>
			{props.children}
		</HStack>
	);
}
