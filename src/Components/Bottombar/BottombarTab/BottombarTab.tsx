import * as React from "react";
import NextLink from "next/link";

interface Props {
	link: string;
	name: string;
	icon: (props: React.ComponentProps<"svg">) => JSX.Element;
	active?: boolean;
}

function BottombarTab(props: Props) {
	return (
		<NextLink href={props.link}>
			<a className="px-2 pt-1 flex flex-col items-center">
				<props.icon
					className={`transition ease-out duration-150 w-6 h-6 stroke-current fill-current ${
						props.active ? "text-indigo-500" : "text-gray-500"
					}`}
				/>
				<span
					className={`${
						props.active ? "text-indigo-500" : "text-gray-500"
					} font-medium text-base transition ease-out duration-150`}
				>
					{props.name}
				</span>
			</a>
		</NextLink>
	);
}

export default BottombarTab;
