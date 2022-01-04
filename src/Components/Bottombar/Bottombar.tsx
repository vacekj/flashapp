import React from "react";
import styles from "./Bottombar.module.css";
import BottombarTab from "./BottombarTab";
import { useRouter } from "next/router";
import { HiOutlineHome, HiOutlineSearch, HiOutlineUser } from "react-icons/hi";
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
		<div className={styles.bottomBar}>
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
		</div>
	);
}

export default Bottombar;
