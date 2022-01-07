import React from "react";
import styles from "./Bottombar.module.css";
import BottombarTab from "./BottombarTab";
import { useRouter } from "next/router";
import { HiOutlineHome, HiOutlineSearch, HiOutlineUser } from "react-icons/hi";
import { HStack } from "@chakra-ui/react";
interface Tab {
	link: string;
	name: string;
	icon: (props: React.ComponentProps<"svg">) => JSX.Element;
	active?: boolean;
}

const tabs: Tab[] = [
	{
		link: "/",
		name: "Home",
		icon: HiOutlineHome,
	},
	{
		link: "/cards",
		name: "Cards",
		icon: HiOutlineSearch,
	},
	{
		link: "/profile",
		name: "Profile",
		icon: HiOutlineUser,
	},
];

function Bottombar() {
	const router = useRouter();
	return (
		<HStack
			zIndex={100}
			bg={"white"}
			shadow={"lg"}
			py={5}
			position={"absolute"}
			m={6}
			rounded={"full"}
			bottom={0}
			left={0}
			right={0}
			justifyContent={"space-around"}
			alignItems={"center"}
		>
			{tabs.map((tab, i) => {
				return (
					<BottombarTab
						link={tab.link}
						name={tab.name}
						icon={tab.icon}
						active={router.asPath.includes(tab.link)}
						key={i}
					/>
				);
			})}
		</HStack>
	);
}

export default Bottombar;
