import React, { useState } from "react";
import Topbar from "@/src/Components/Topbar";
import { useAllCardsOfUser } from "@/src/Lib/Storage";
import Link from "next/link";
import { Box, Icon, IconButton, Input, InputGroup, Skeleton, VStack } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import TopbarContainer from "@/src/Components/Topbar/TopbarContainer";
import TopbarTitle from "@/src/Components/Topbar/TopbarTitle";

export default function CardsSearch() {
	const { cards } = useAllCardsOfUser();
	const [filter, setFilter] = useState("");
	return (
		<div>
			<Topbar>
				<TopbarContainer>
					<TopbarTitle>Cards</TopbarTitle>
					<Link href={"/add"}>
						<IconButton
							variant={"ghost"}
							aria-label={"Add card"}
							fontSize={"3xl"}
							icon={<Icon as={HiOutlinePlus} />}
						/>
					</Link>
				</TopbarContainer>
			</Topbar>
			<VStack h={"full"} spacing={3} p={3} alignItems={"stretch"} bg={"gray.100"}>
				<Search onSubmit={(value) => setFilter(value)} />
				{cards === null &&
					Array(3)
						.fill(1)
						.map((_, key) => (
							<div
								key={key}
								className="flex flex-col items-center justify-around rounded-lg shadow bg-white text-gray-700 p-4 m-3 mb-0 text-lg text-center"
							>
								<Skeleton variant="text" height={30} width={120} />
								<Skeleton variant="text" height={30} width={120} />
							</div>
						))}
				{cards &&
					cards
						.filter((card) => {
							if (filter === "") {
								return true;
							}

							return card.front.includes(filter) || card.back.includes(filter);
						})
						.map((card) => (
							<div
								className="flex flex-col items-center justify-around rounded-lg shadow bg-white text-gray-700 p-4 m-3 mb-0 text-lg text-center"
								key={card.uid}
							>
								<div className="py-3 border-b border-solid border-gray-200">
									{card.front}
								</div>
								<div className="py-3">{card.back}</div>
							</div>
						))}
			</VStack>
		</div>
	);
}

interface SearchProps {
	onSubmit: (value: string) => void;
}

function Search(props: SearchProps) {
	const [value, setValue] = useState("");
	return (
		<Box
			as={"form"}
			// @ts-ignore
			onSubmit={(e) => {
				e.preventDefault();
				props.onSubmit(value);
			}}
			bg={"white"}
		>
			<InputGroup>
				<Input
					placeholder={"Search cards"}
					type="text"
					onChange={(e) => {
						setValue(e.target.value);
						props.onSubmit(e.target.value);
					}}
					value={value}
				/>
			</InputGroup>
		</Box>
	);
}
