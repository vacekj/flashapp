import React, { useEffect, useState } from "react";
import Topbar from "../Topbar";
import { Card, Deck, getCardsOfDeck, useDecksOfCurrentUser } from "../../Lib/Storage";
import Link from "next/link";
import {
	Icon,
	IconButton,
	Skeleton,
	VStack,
	Text,
	HStack,
	Input,
	InputGroup,
	InputRightAddon,
	Box,
} from "@chakra-ui/react";
import { HiOutlinePlus, HiOutlineSearch } from "react-icons/hi";

export default function CardsSearch() {
	const { decks } = useDecksOfCurrentUser();
	const [cards, setCards] = useState<Card[]>([]);
	const [filter, setFilter] = useState("");

	return (
		<div>
			<Topbar>
				<HStack p={2} px={4} justifyContent={"space-between"} alignItems={"center"}>
					<Text fontSize={"3xl"} fontWeight={"medium"}>
						Cards
					</Text>
					<Link href={"/add"}>
						<IconButton
							variant={"ghost"}
							aria-label={"Add card"}
							fontSize={"3xl"}
							icon={<Icon as={HiOutlinePlus} />}
						/>
					</Link>
				</HStack>
			</Topbar>
			<VStack spacing={3} mt={3} alignItems={"stretch"}>
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
			mx={2}
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
				<InputRightAddon p={0}>
					<IconButton
						mx={2}
						aria-label={"Search"}
						onClick={() => props.onSubmit(value)}
						icon={<Icon fontSize={"xl"} as={HiOutlineSearch} />}
					/>
				</InputRightAddon>
			</InputGroup>
		</Box>
	);
}
